import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import {
  createVariableProduct,
  createVariation,
} from "../../actions/variableProductAction";
import { createVariableProductonly } from "../../actions/variableProductAction";
import { getAllCategory } from "../../actions/categoryAction";
import { getAllContactMerchandiser } from "../../actions/contactAction";
import { getAllWarehouse } from "../../actions/warehouseAction";
import { getAllAttribute } from "../../actions/attributeAction";
import { createPurchaseItem } from "../../actions/purchase";
import PictureWall from "./PictureWall";
// import PicturesWall from "../ProductDetails/PictureWall";
// import ImageUpload from "../ProductDetails/ImageUpload";
import {
  Form,
  Input,
  InputNumber,
  Checkbox,
  Button,
  Col,
  Row,
  Select,
  message,
  TreeSelect,
  Divider,
  Space,
  Drawer,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const CreateNewContact = ({
  createPurchaseItem,
  getAllAttribute,
  setUpdatelist,
  List,
  getAllCategory,
  getAllContactMerchandiser,
  Merchandiser,
  getAllWarehouse,
  Warehouse,
  createVariableProduct,
  Attribute,
  updatelist,
  cartItems,
  bill,
  createVariation,
  createVariableProductonly,
  setCart,
  load,
  location,
  details,
  setrefresh,
  refresh,
}) => {
  const [cover, setcover] = useState([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log(values);
    let promises = [];
    createVariableProductonly(values).then((result) => {
      values["ProductDetails"] = result.id;
      values["contact"] = details.contact;
      for (let i = 0; i < values.Variations.length; i++) {
        promises.push(
          createVariation(
            values,
            values.Variations[i].color,
            values.Variations[i].size,
            values.Variations[i].purchase_price,
            values.Variations[i].purchase_price,
            0,
            details.location
          ).then((result) => {
            let formData = new FormData();
            formData.append("product", result.id);
            formData.append("quantity", 1);
            formData.append("price", result.purchase_price);
            formData.append("purchase", details.id);
            formData.append("data", "");
            promises.push(createPurchaseItem(formData));
            //   console.log(result);
            //   const arr = {
            //     id: result.id,
            //     title: result.title,
            //     color: result.color,
            //     Color: result.Color,
            //     size: result.size,
            //     Size: result.Size,
            //     price: result.purchase_price,
            //     total_price: result.purchase_price,
            //     discount: 0,
            //     quantity: 1,
            //     limit: result.quantity,
            //   };
            //   cartItems.current.push(arr);
            // setCart(true);
          })
        );
      }
      Promise.all(promises).then((r) => {
        message.success("Product has been added");
        setrefresh(!refresh);
        form.resetFields();
        setVisible(false);
      });
    });
  };
  const uploadcover = (fileList) => {
    setcover(fileList);
  };
  const showDrawer = () => {
    if (details.contact == null || details.location == "") {
      message.warning("Select a warehouse and a vendor first");
    } else {
      setVisible(true);
    }
  };

  const onClose = () => {
    form.resetFields();
    setVisible(false);
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

  useEffect(() => {
    getAllCategory();
    getAllContactMerchandiser();
    getAllAttribute();
    getAllWarehouse();
  }, [
    getAllCategory,
    getAllContactMerchandiser,
    getAllWarehouse,
    setUpdatelist,
  ]);

  return (
    <>
      <>
        <Button
          type="primary"
          onClick={showDrawer}
          style={{ marginBottom: "10px" }}
        >
          <PlusOutlined /> New product
        </Button>
        <Drawer
          title="Create a new Product"
          width="80%"
          onClose={onClose}
          visible={visible}
          bodyStyle={{ paddingBottom: 80 }}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{ discount_type: "%" }}
          >
            <Row gutter={16}>
              {/* <PicturesWall setImages={uploadcover} limit={4} /> */}
              {/* <ImageUpload /> */}
              <Col span={12}>
                <Form.Item
                  name="title"
                  label="Product Name"
                  rules={[
                    { required: true, message: "Please enter product name" },
                  ]}
                >
                  <Input placeholder="New Product/12" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="Category"
                  label="Category"
                  rules={[
                    {
                      required: true,
                      message: "please slect a category",
                    },
                  ]}
                >
                  <TreeSelect treeData={List} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="stock_alart_amount" label="Stock Alert Amount">
                  <InputNumber placeholder="Stock Alert Amount" />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item name="stock_unit" label="Measurement Unit">
                  <Input placeholder="Measurement Unit" />
                </Form.Item>
              </Col>
              <Col span={8}>
                {/* <Form.Item name="discount_type" label="Discount Type">
                <InputNumber placeholder="Discount Type" />
              </Form.Item> */}
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
            </Row>

            <Divider></Divider>
            <h3>Variations</h3>
            <div style={{ backgroundColor: "#f0f2f5", padding: "10px" }}>
              <Form.List name="Variations">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, fieldKey, ...restField }) => (
                      <Row wrap={false}>
                        {loadattributes(name, fieldKey, restField)}

                        {/* <Col span={6}>
                          <Form.Item
                            label="Warehouse"
                            {...restField}
                            name={[name, "Warehouse"]}
                            fieldKey={[fieldKey, "key"]}
                          >
                            <TreeSelect
                              treeData={Warehouse}
                              defaultValue={location.current}
                              disabled
                            />
                          </Form.Item>
                        </Col> */}
                        <Col flex="auto">
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
                              // defaultValue={0}
                              addonBefore="BDT"
                              type="number"
                              placeholder="purchase price"
                              // disabled
                            />
                          </Form.Item>
                        </Col>
                        {/* <Col span={4}>
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
                        <Col span={4} offset={1}>
                          <Form.Item
                            label="Initial stock"
                            {...restField}
                            name={[name, "quantity"]}
                            fieldKey={[fieldKey, "quantity"]}
                            // rules={[
                            //   {
                            //     required: true,
                            //     message: "Please enter a quantity",
                            //   },
                            // ]}
                          >
                            <Input
                              defaultValue={0}
                              placeholder="Stock Amount"
                              disabled
                            />
                          </Form.Item>
                        </Col> */}
                        <MinusCircleOutlined
                          onClick={() => remove(name)}
                          style={{ margin: "auto" }}
                        />
                      </Row>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={(e) => add()}
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
              {/* <Col span={24}>
                <Form.Item name="is_active" valuePropName="checked" checked>
                  <Checkbox>Active Product !</Checkbox>
                </Form.Item>
              </Col> */}
            </Row>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Drawer>
      </>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    List: state.category.categorylist,
    Merchandiser: state.contacts.contactlistsearchresult,
    Warehouse: state.warehouse.warehouselist,
    Attribute: state.attribute.attributelist,
  };
};

export default connect(mapStateToProps, {
  getAllCategory,
  getAllContactMerchandiser,
  getAllWarehouse,
  createVariableProduct,
  getAllAttribute,
  createVariation,
  createVariableProductonly,
  createPurchaseItem,
})(CreateNewContact);
