import React, { useState, useEffect, useReducer, useRef } from "react";
import { connect } from "react-redux";

import {
  createVariableProduct,
  createVariation,
} from "../../actions/variableProductAction";
import { getProductSearchResultbywarehouse } from "../../actions/productDetails";
import { createVariableProductonly } from "../../actions/variableProductAction";
import { getAllCategory } from "../../actions/categoryAction";
import { getAllContactMerchandiser } from "../../actions/contactAction";
import { getAllWarehouse } from "../../actions/warehouseAction";
import { getAllAttribute } from "../../actions/attributeAction";
import { createPurchaseItem } from "../../actions/purchase";
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
  AutoComplete,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const CreateNewContact = ({
  getProductSearchResultbywarehouse,
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
}) => {
  const [cover, setcover] = useState([]);
  const [visible, setVisible] = useState(false);
  const [searchresult, setsearchresult] = useState([]);
  const [form] = Form.useForm();
  const selectedproduct = useRef(null);
  const showseatch = useRef(true);

  const onKeyUp = (event) => {
    if (event.target.value == "") {
      setsearchresult([]);
    } else if (event.keyCode == 13) {
      getProductSearchResultbywarehouse(
        event.target.value,
        location.current
      ).then((result) => {
        setsearchresult(result.results);
        if (result.count == 1) {
          result.results.map((item) => {
            console.log(item);
          });
        }
      });
    }
  };

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
          })
        );
      }
      Promise.all(promises).then((r) => {
        message.success("Product has been added");
        setrefresh(true);
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

  const variations = () => {
    return (
      <>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ discount_type: "%" }}
        >
          <h3>Variations</h3>
          <div style={{ backgroundColor: "#f0f2f5", padding: "10px" }}>
            <Form.List name="Variations">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, fieldKey, ...restField }) => (
                    <Row gutter={16}>
                      <Col span={8}>
                        <Form.Item
                          label="Color"
                          {...restField}
                          name={[name, "color"]}
                          fieldKey={[fieldKey, "key"]}
                        >
                          {/* <TreeSelect treeData={Attribute[1].terms} /> */}
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
                          {/* <TreeSelect treeData={Attribute[0].terms} /> */}
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
                      </Col>

                      <Col span={8} offset={1}>
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

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </>
    );
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
          <PlusOutlined /> New variation
        </Button>
        <Drawer
          title="Create a new variation"
          width="50%"
          onClose={onClose}
          visible={visible}
          bodyStyle={{ paddingBottom: 80 }}
        >
          <h3>Please select a product first</h3>
          <AutoComplete
            // ref={BarcodeInput}
            placeholder="input search text"
            // onChange={onChange}
            onKeyUp={onKeyUp}
            style={{ width: "100%" }}
          />
          <div
            style={{
              position: "absolute",
              width: "100%",
              zIndex: "5",
            }}
          >
            {searchresult.map((item, index) => {
              if (index < 10) {
                return (
                  <>
                    <Row
                      style={{
                        border: "1px solid lightgray",
                        padding: "5px",
                        borderRadius: "5px",
                        height: "50px",
                        backgroundColor: "whitesmoke",
                      }}
                      onClick={(e) => {
                        let flag = 0;
                        setsearchresult([]);
                      }}
                    >
                      <Col span={9}>{item.Deatils[0].title}</Col>
                      <Col span={6}>
                        {" "}
                        {item.color} / {item.size}
                      </Col>
                      <Col span={6}>{item.Warehouse_name}</Col>
                    </Row>
                  </>
                );
              }
            })}
          </div>
          <Divider />
          {variations()}
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
  getProductSearchResultbywarehouse,
})(CreateNewContact);
