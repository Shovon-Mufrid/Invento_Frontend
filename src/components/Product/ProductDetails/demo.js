import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { updateSingleProduct } from "../../../actions/singleProductAction";
import { getAllCategory } from "../../../actions/categoryAction";
import { getAllContactMerchandiser } from "../../../actions/contactAction";
import { getAllWarehouse } from "../../../actions/warehouseAction";
import { getspecificproductvariation } from "../../../actions/variableProductAction";
import { getAllAttribute } from "../../../actions/attributeAction";
import {
  createVariationfromEdit,
  updateVariation,
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
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const SingleProductDetailsTable = ({
  List,
  getAllCategory,
  getAllContactMerchandiser,
  Merchandiser,
  getAllWarehouse,
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
  deleteVariation,
}) => {
  const [formdata, setformdata] = useState(false);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    updateSingleProduct(details.id, values);
    for (let Variation in values.Variations) {
      // console.log(details);
      if (typeof values.Variations[Variation].id == "undefined") {
        createVariationfromEdit(
          details.id,
          values.Variations[Variation],
          details.barcode_code
        );
      } else {
        // console.log("edit");
        updateVariation(
          values.Variations[Variation].id,
          values.Variations[Variation],
          values.Variations[Variation].color,
          values.Variations[Variation].size,
          values.Variations[Variation].Warehouse,
          details.barcode_code
        );
      }
    }
    setUpdatelist(false);
    setVisible(false);
    form.resetFields();
  };

  const showDrawer = () => {
    asyncCall();
  };

  const onFinishVariation = (values) => {
    console.log(values);
    // updateSingleProduct(details.id, values);
    // setUpdatelist(false);
    // settrigger(true);
  };
  let Variations = [];

  async function asyncCall() {
    details.Variations = await getspecificproductvariation(details.id);
    details.Discount = {
      discount: details.discount,
    };
    details.Discount_type = {
      discount_type: details.discount_type,
    };
    setformdata(true);
    setVisible(true);
  }
  const onClose = () => {
    setVisible(false);
    form.resetFields();
  };

  useEffect(() => {
    getAllCategory();
    getAllContactMerchandiser();
    getAllWarehouse();
    getAllAttribute();
  }, []);

  if (formdata) {
    return (
      <>
        <h3>Basic details</h3>
        <Form
          form={form}
          layout="vertical"
          hideRequiredMark
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
              <Form.Item name="stock_unit" label="Stock Unit">
                <Input placeholder="Stock Unit" />
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
            <Col span={6}>
              <Form.Item name="tax" label="Tax">
                <Input type="number" addonBefore="%" placeholder="Tax" />
              </Form.Item>
            </Col>
          </Row>
          <h3>Variations</h3>
          <Divider></Divider>
          <div style={{ backgroundColor: "#f0f2f5", padding: "10px" }}>
            <Form.List name="Variations">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, fieldKey, ...restField }) => (
                    <Row gutter={16}>
                      <Col span={2}>
                        <Form.Item
                          label="ID"
                          {...restField}
                          name={[name, "id"]}
                          fieldKey={[fieldKey, "id"]}
                        >
                          <InputNumber disabled />
                        </Form.Item>
                      </Col>
                      <Col span={3}>
                        <Form.Item
                          label="Color"
                          {...restField}
                          name={[name, "color"]}
                          fieldKey={[fieldKey, "key"]}
                        >
                          <TreeSelect treeData={Attribute[1].terms} />
                        </Form.Item>
                      </Col>
                      <Col span={2}>
                        <Form.Item
                          label="Size"
                          {...restField}
                          name={[name, "size"]}
                          fieldKey={[fieldKey, "key"]}
                        >
                          <TreeSelect treeData={Attribute[0].terms} />
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Form.Item
                          label="Warehouse"
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
          <h3>Additional Information</h3>
          <Divider></Divider>
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
              <Form.Item
                name="Short_description"
                label="Drescription"
                rules={[
                  {
                    required: true,
                    message: "please enter Address",
                  },
                ]}
              >
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
    return <p> Please wait</p>;
  }
};

const mapStateToProps = (state) => {
  return {
    List: state.category.categorylist,
    Merchandiser: state.contacts.contactlistsearchresult,
    Warehouse: state.warehouse.warehouselist,
    Attribute: state.attribute.attributelist,
    PreVariations: state.ProductDetails.productdetails,
  };
};

export default connect(mapStateToProps, {
  getAllCategory,
  getAllContactMerchandiser,
  getAllWarehouse,
  getAllAttribute,
  updateSingleProduct,
  getspecificproductvariation,
  createVariationfromEdit,
  updateVariation,
  deleteVariation,
})(SingleProductDetailsTable);
