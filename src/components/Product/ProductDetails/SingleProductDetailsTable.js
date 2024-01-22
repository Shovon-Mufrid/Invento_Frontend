import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";

import { updateSingleProduct } from "../../../actions/singleProductAction";
import { getAllCategory } from "../../../actions/categoryAction";
import { getAllContactMerchandiser } from "../../../actions/contactAction";
import { getAllLocation } from "../../../actions/warehouseAction";
import { getspecificproductvariation } from "../../../actions/variableProductAction";
import { getAllAttribute } from "../../../actions/attributeAction";
import {
  createVariationfromEdit,
  updateVariation,
  updateVariationCustom,
  deleteVariation,
} from "../../../actions/variableProductAction";
import {
  Form,
  Input,
  InputNumber,
  Checkbox,
  Button,
  Col,
  Row,
  Select,
  TreeSelect,
  Divider,
  Drawer,
  Skeleton,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const SingleProductDetailsTable = ({
  List,
  getAllCategory,
  getAllContactMerchandiser,
  Merchandiser,
  getAllLocation,
  getAllAttribute,
  updateSingleProduct,
  details,
  setUpdatelist,
  settrigger,
  getspecificproductvariation,
  Attribute,
  Warehouse,
  PreVariations,
  createVariationfromEdit,
  updateVariation,
  updateVariationCustom,
  deleteVariation,
  setreload,
  auth,
}) => {
  const [formdata, setformdata] = useState(false);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const updateddata = useRef([]);
  const load = useRef(true);

  useEffect(() => {
    // console.log("useEffect");
  }, [visible]);

  const onFinish = (values) => {
    let promises = [];
    if (typeof values.Category != "number") {
      values.Category = values.Category.id;
    }

    if (values.Variations.length > 0) {
      values.Variations.forEach((element) => {
        const keys = Object.keys(element);
        // console.log(keys);
        const attributes = [];
        keys.forEach((key, index) => {
          // console.log(`${key}: ${element[key]}`);
          Attribute.map((e) => {
            if (
              key == e.name &&
              typeof element[key] != "undefined" &&
              element[key] != null
            ) {
              if (typeof element[key] == "object") {
                attributes.push(element[key].id);
              } else {
                attributes.push(element[key]);
              }
            }
          });
        });
        element["Attribute"] = attributes;
      });
    }

    updateSingleProduct(details.id, values).then((result) => {
      for (let Variation in values.Variations) {
        if (typeof values.Variations[Variation].id == "undefined") {
          promises.push(
            createVariationfromEdit(details.id, values.Variations[Variation])
          );
        } else {
          promises.push(
            updateVariation(
              values.Variations[Variation].id,
              values.Variations[Variation]
            )
          );
        }
      }
      Promise.all(promises).then((result) => {
        form.resetFields();
        setUpdatelist(false);
        setformdata(false);
        setVisible(false);
        setreload(true);
      });
    });
  };

  const loadattributes = (name, fieldKey, restField) => {
    return Attribute.map((attribute) => (
      <>
        <Col span={2}>
          <Form.Item
            label={attribute.name}
            {...restField}
            name={[name, attribute.name]}
            fieldKey={[fieldKey, "key"]}
          >
            <Select
              showSearch
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {attribute.terms.map((item) => {
                return <Option value={item.id}>{item.name}</Option>;
              })}
            </Select>
          </Form.Item>
        </Col>
      </>
    ));
  };

  const showDrawer = () => {
    load.current = true;
    updateddata.current = [];
    setVisible(true);
    getAllCategory();
    getAllContactMerchandiser();
    getAllLocation();
    getAllAttribute();
    // asyncCall();
    getspecificproductvariation(details.id).then((result) => {
      details.Variations = result;
      for (let i = 0; i < details.Variations.length; i++) {
        details.Variations[i].Color = details.Variations[i].Color;
        details.Variations[i].Size = details.Variations[i].Size;
        details.Variations[i].Warehouse = details.Variations[i].Warehouse;
        details.Variations[i].ProductDetails =
          details.Variations[i].ProductDetails.id;
      }
      details.Discount = {
        discount: details.discount,
      };

      details.Discount_type = {
        discount_type: details.discount_type,
      };
      load.current = false;
      form.resetFields();
      updateddata.current = details;

      setformdata(true);
      form.setFieldsValue(details);
    });
  };

  const onClose = () => {
    form.resetFields();
    setVisible(false);
    setformdata(false);
  };

  const renderdata = () => {
    if (updateddata.current === details) {
      return (
        <>
          <h3>Basic details</h3>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={details}
          >
            <Divider></Divider>
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item
                  name="title"
                  label="Product Name"
                  rules={[
                    { required: true, message: "Please enter product name" },
                  ]}
                >
                  <Input placeholder="Please enter product name" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name="Category" label="Category">
                  <TreeSelect treeData={List} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name="Merchandiser" label="Merchandiser">
                  <TreeSelect treeData={Merchandiser} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={6}>
                <Form.Item name="stock_alart_amount" label="Stock Alert Amount">
                  <InputNumber placeholder="Stock Alert Amount" />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item name="stock_unit" label="Measurement Unit">
                  <Input placeholder="Measurement Unit" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Discount">
                  <Input.Group compact>
                    <Form.Item name={"discount_type"} noStyle>
                      <Select>
                        <Option value="%">%</Option>
                        <Option value="$">$</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item name={"discount"} noStyle>
                      <Input style={{ width: "70%" }} placeholder="Discount" />
                    </Form.Item>
                  </Input.Group>
                </Form.Item>
              </Col>
              {/* <Col span={6}>
                <Form.Item name="tax" label="VAT">
                  <Input type="number" addonBefore="%" placeholder="VAT" />
                </Form.Item>
              </Col> */}
            </Row>
            <h3>Variations</h3>
            <Divider></Divider>
            <div style={{ backgroundColor: "#f0f2f5", padding: "10px" }}>
              <Form.List name="Variations">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, fieldKey, ...restField }) => (
                      <Row gutter={16}>
                        <Col span={2} hidden>
                          <Form.Item
                            label="ID"
                            {...restField}
                            name={[name, "id"]}
                            fieldKey={[fieldKey, "id"]}
                          >
                            <InputNumber disabled />
                          </Form.Item>
                        </Col>
                        {loadattributes(name, fieldKey, restField)}
                        {/* <Col span={3}>
                          <Form.Item
                            label="Color"
                            {...restField}
                            name={[name, "Color"]}
                            fieldKey={[fieldKey, "Color"]}
                          >
                            <TreeSelect treeData={Attribute[1].terms} />
                          </Form.Item>
                        </Col>
                        <Col span={2}>
                          <Form.Item
                            label="Size"
                            {...restField}
                            name={[name, "Size"]}
                            fieldKey={[fieldKey, "Size"]}
                          >
                            <TreeSelect treeData={Attribute[0].terms} />
                          </Form.Item>
                        </Col> */}
                        <Col span={4}>
                          <Form.Item
                            label="Location"
                            {...restField}
                            name={[name, "Warehouse"]}
                            fieldKey={[fieldKey, "key"]}
                            rules={[
                              {
                                required: true,
                                message: "Please enter a warehouse",
                              },
                            ]}
                          >
                            <TreeSelect treeData={Warehouse} />
                          </Form.Item>
                        </Col>
                        <Col span={4} offset={1}>
                          <Form.Item
                            label="Purchase Price"
                            {...restField}
                            name={[name, "purchase_price"]}
                            fieldKey={[fieldKey, "purchase_price"]}
                            rules={[
                              {
                                required: true,
                                message: "Please enter a purchase price",
                              },
                            ]}
                          >
                            <Input
                              addonBefore="$"
                              type="number"
                              placeholder="purchase price"
                            />
                          </Form.Item>
                        </Col>
                        <Col span={4}>
                          <Form.Item
                            label="Selling Price"
                            {...restField}
                            name={[name, "selling_price"]}
                            fieldKey={[fieldKey, "selling_price"]}
                            rules={[
                              {
                                required: true,
                                message: "Please enter a selling price",
                              },
                            ]}
                          >
                            <Input
                              addonBefore="$"
                              type="number"
                              placeholder="Selling price"
                            />
                          </Form.Item>
                        </Col>
                        <Col span={2}>
                          <Form.Item
                            label="Stock"
                            {...restField}
                            name={[name, "quantity"]}
                            fieldKey={[fieldKey, "quantity"]}
                            rules={[
                              {
                                required: true,
                                message: "Please enter a quantity",
                              },
                            ]}
                          >
                            <InputNumber placeholder="Stock Amount" />
                          </Form.Item>
                        </Col>
                        <MinusCircleOutlined
                          onClick={() => {
                            if (details.Variations[name]) {
                              alert(details.Variations[name].id);
                              deleteVariation(details.Variations[name].id);
                            }
                            remove(name);
                          }}
                          style={{ margin: "auto" }}
                        />
                      </Row>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add field
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </div>

            <Divider></Divider>
            <h3>Additional Information</h3>
            <Row gutter={16}>
              <Col span={5}>
                <Form.Item name="height" label="Height">
                  <Input type="number" placeholder="Height" addonAfter={"cm"} />
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item name="width" label="Width">
                  <Input type="number" placeholder="Width" addonAfter={"cm"} />
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item name="weight" label="Weight">
                  <Input
                    type="number"
                    placeholder="Weight"
                    addonAfter={"grams"}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="Short_description" label="Drescription">
                  <Input.TextArea rows={4} placeholder="please enter Address" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="is_active" valuePropName="checked" checked>
                  <Checkbox>Active Product !</Checkbox>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </>
      );
    } else {
      return <Skeleton active />;
    }
  };

  return (
    <>
      {auth.permissions.includes("Products.All products_is_update") ? (
        <a href="#" onClick={showDrawer} style={{ margin: 4 }}>
          Edit
        </a>
      ) : (
        ""
      )}
      <Drawer
        title={details.title}
        width="80%"
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        {renderdata()}
      </Drawer>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    List: state.category.categorylist,
    Merchandiser: state.contacts.contactlistsearchresult,
    Warehouse: state.warehouse.locationlist,
    Attribute: state.attribute.attributelist,
    PreVariations: state.ProductDetails.productdetails,
    auth: state.auth,
  };
};

export default connect(mapStateToProps, {
  getAllCategory,
  getAllContactMerchandiser,
  getAllLocation,
  getAllAttribute,
  updateSingleProduct,
  getspecificproductvariation,
  createVariationfromEdit,
  updateVariation,
  updateVariationCustom,
  deleteVariation,
})(SingleProductDetailsTable);
