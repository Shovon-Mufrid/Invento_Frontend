import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

import { createVariableProduct } from "../../../actions/variableProductAction";
import { getAllCategory } from "../../../actions/categoryAction";
import { getAllContactMerchandiser } from "../../../actions/contactAction";
import { getAllWarehouse } from "../../../actions/warehouseAction";
import { getAllAttribute } from "../../../actions/attributeAction";
import PicturesWall from "../ProductDetails/PictureWall";
import ImageUpload from "../ProductDetails/ImageUpload";
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
}) => {
  const [cover, setcover] = useState([]);
  const onFinish = (values) => {
    if (typeof values["is_active"] == "undefined") {
      values["is_active"] = false;
    }

    if (values.Variations.length > 0) {
      values.Variations.forEach((element) => {
        const keys = Object.keys(element);
        const attributes = [];
        keys.forEach((key, index) => {
          console.log(`${key}: ${element[key]}`);
          if (
            key !== "Warehouse" &&
            key !== "purchase_price" &&
            key !== "selling_price" &&
            key !== "quantity" &&
            typeof element[key] != "undefined"
          ) {
            attributes.push(element[key]);
            console.log("working");
          }
        });
        element["Attributes"] = attributes;
      });
    }

    createVariableProduct(values).then((e) => {
      console.log(e);
      setUpdatelist(false);
      // window.location.href = e;
    });
  };
  const uploadcover = (fileList) => {
    setcover(fileList);
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

  return (
    <>
      <>
        <Form
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ discount_type: "%" }}
        >
          <Row gutter={16}>
            {/* <PicturesWall setImages={uploadcover} limit={4} /> */}
            {/* <ImageUpload /> */}
            <Col span={6}>
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
            <Col span={6}>
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
            <Col span={6}>
              <Form.Item name="Merchandiser" label="Supplier">
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
            {/* <Col span={6}>
              <Form.Item name="tax" label="VAT">
                <Input type="number" addonBefore="%" placeholder="VAT" />
              </Form.Item>
            </Col> */}
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

                      {/* <Col span={2}>
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
                      <Col flex="auto">
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
                            addonBefore="BDT"
                            type="number"
                            placeholder="purchase price"
                          />
                        </Form.Item>
                      </Col>
                      <Col flex="auto">
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
                            addonBefore="BDT"
                            type="number"
                            placeholder="Selling price"
                          />
                        </Form.Item>
                      </Col>
                      <Col flex="auto">
                        <Form.Item
                          label="Initial stock"
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
})(CreateNewContact);
