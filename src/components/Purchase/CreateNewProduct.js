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
}) => {
  const [cover, setcover] = useState([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  let result = {};
  const onFinish = (values) => {
    let promises = [];
    values["Warehouse"] = location.current;
    createVariableProductonly(values).then((result) => {
      values["ProductDetails"] = result.id;
      for (let i = 0; i < values.Variations.length; i++) {
        // console.log(values.Variations[i]);

        const keys = Object.keys(values.Variations[i]);
        // console.log(keys);
        const attributes = [];
        const description = "";
        let count = 0;
        keys.forEach((key, index) => {
          Attribute.map((e) => {
            if (
              key == e.name &&
              typeof values.Variations[i][key] != "undefined" &&
              values.Variations[i][key] != null
            ) {
              attributes.push(values.Variations[i][key]);
              let attr = e.terms.find(
                (item) => item.id === values.Variations[i][key]
              );
              if (count == 0) {
                description += attr.name;
              } else {
                description += " / " + attr.name;
              }
              count++;
            }
          });
        });
        values.Variations[i]["Attribute_details"] = description;
        values.Variations[i]["Attributes"] = attributes;
        promises.push(
          createVariation(
            values,
            values.Variations[i].color,
            values.Variations[i].size,
            parseFloat(values.Variations[i].purchase_price).toFixed(2),
            parseFloat(values.Variations[i].purchase_price).toFixed(2),
            0,
            location.current,
            attributes
          ).then((result2) => {
            console.log(result2);
            let color = null;
            color = Attribute[1].terms.find(
              (item) => item.id === values.Variations[i].color
            );
            let size = null;
            size = Attribute[0].terms.find(
              (item) => item.id === values.Variations[i].size
            );

            const arr = {
              id: result2.id,
              title: result.title,
              color: color ? color.name : null,
              Color: result2.Color,
              size: size ? size.name : null,
              Size: result2.Size,
              price: result2.purchase_price,
              total_price: result2.purchase_price,
              discount: 0,
              quantity: 1,
              limit: result2.quantity,
              Attribute_details: description,
              details: result2,
            };
            cartItems.current.push(arr);
            setCart(true);
          })
        );
      }
      Promise.all(promises).then((res) => {
        load.current = true;
        form.resetFields();
        setVisible(false);
      });
    });
  };
  const uploadcover = (fileList) => {
    setcover(fileList);
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
    if (bill.current.Contact == null || location.current == "") {
      message.warning("Select a warehouse and a vendor first");
    } else {
      setVisible(true);
    }
  };

  const onClose = () => {
    form.resetFields();
    setVisible(false);
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
          <PlusOutlined /> Add new product
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
                        {/* <Col span={8}>
                          <Form.Item
                            label="Color"
                            {...restField}
                            name={[name, "color"]}
                            fieldKey={[fieldKey, "key"]}
                          >
                            
                            <Select
                              showSearch
                              filterOption={(input, option) =>
                                option.children
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              }
                            >
                              {Attribute[1].terms.map((item) => {
                                return (
                                  <Option value={item.id}>{item.name}</Option>
                                );
                              })}
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span={6}>
                          <Form.Item
                            label="Size"
                            {...restField}
                            name={[name, "size"]}
                            fieldKey={[fieldKey, "key"]}
                          >
                            
                            <Select
                              showSearch
                              filterOption={(input, option) =>
                                option.children
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              }
                            >
                              {Attribute[0].terms.map((item) => {
                                return (
                                  <Option value={item.id}>{item.name}</Option>
                                );
                              })}
                            </Select>
                          </Form.Item>
                        </Col> */}
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
                        {/* <Col flex="auto">
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
                        </Col> */}
                        {/* <Col flex="auto">
                          <Form.Item
                            label="Purchase stock"
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
                            <Input
                              defaultValue={0}
                              placeholder="Stock Amount"
                              // disabled
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
})(CreateNewContact);
