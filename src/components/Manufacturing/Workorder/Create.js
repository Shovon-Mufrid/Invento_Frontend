import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { createWorkorder } from "../../../actions/Manufacturing/workorderAction";
import { getAllAttribute } from "../../../actions/attributeAction";
import SearchProduct from "./SearchProduct";

import {
  Form,
  Input,
  InputNumber,
  Checkbox,
  Drawer,
  Button,
  Col,
  Row,
  Select,
  message,
  DatePicker,
  Divider,
  TreeSelect,
} from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";

const { Option } = Select;

var currentdate = new Date();
var orderno =
  currentdate.getDate().toString() +
  (currentdate.getMonth() + 1).toString() +
  currentdate.getFullYear().toString() +
  currentdate.getHours().toString() +
  currentdate.getMinutes().toString() +
  currentdate.getSeconds().toString();

const Create = ({
  createWorkorder,
  getAllAttribute,
  setUpdatelist,
  ContactList,
  updatelist,
  Attribute,
}) => {
  const initial = { remarks: "" };
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedproduct, setselectedproduct] = useState("");

  const showDrawer = () => {
    setselectedproduct("");
    getAllAttribute().then((res) => {
      setVisible(true);
      form.setFieldsValue({ order_number: orderno });
    });
  };

  const onClose = () => {
    setselectedproduct("");
    form.resetFields();
    setVisible(false);
  };

  const onFinish = (values) => {
    if (selectedproduct != "") {
      if (values.Variations.length > 0) {
        values.Variations.forEach((element) => {
          const keys = Object.keys(element);
          const attributes = [];
          keys.forEach((key, index) => {
            console.log(`${key}: ${element[key]}`);
            if (
              key !== "quantity_needed" &&
              typeof element[key] != "undefined"
            ) {
              attributes.push(element[key]);
              console.log("working");
            }
          });
          element["Attributes"] = attributes;
        });
      }
      values.Product = selectedproduct.id;
      // console.log(values);
      createWorkorder(values).then((res) => {
        form.resetFields();
        setUpdatelist(!updatelist);
        // message.success(values.name + " Has been added to your contact list");
        setVisible(false);
      });
    } else {
      alert("Please add a product");
    }
  };

  const loadattributes = (name, fieldKey, restField) => {
    return Attribute.map((attribute) => (
      <>
        <Col flex="auto">
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
        <Button
          type="primary"
          onClick={showDrawer}
          style={{ marginBottom: "10px", float: "right" }}
        >
          <PlusOutlined /> New Workorder
        </Button>
        <Drawer
          title="Create a new Workorder"
          width="60%"
          onClose={onClose}
          visible={visible}
          bodyStyle={{ paddingBottom: 80 }}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={initial}
          >
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item name="order_number" label="Order no.">
                  <Input value={orderno} disabled />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="order_name" label="Order Name">
                  <Input placeholder="Please enter order name" />
                </Form.Item>
              </Col>
            </Row>
            {selectedproduct == "" ? (
              <SearchProduct setselectedproduct={setselectedproduct} />
            ) : (
              <>
                <p>Product</p>
                <h3>{selectedproduct.title}</h3>
              </>
            )}
            <Divider></Divider>
            <h3>Variations</h3>
            <div style={{ backgroundColor: "#f0f2f5", padding: "10px" }}>
              <Form.List name="Variations">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, fieldKey, ...restField }) => (
                      <Row wrap={false}>
                        {loadattributes(name, fieldKey, restField)}

                        <Col flex="auto">
                          <Form.Item
                            label="Quantity"
                            {...restField}
                            name={[name, "quantity_needed"]}
                            fieldKey={[fieldKey, "quantity_needed"]}
                            rules={[
                              {
                                required: true,
                                message: "Please enter a quantity",
                              },
                            ]}
                          >
                            <InputNumber placeholder="Quantity" />
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
              <Col span={12}>
                <Form.Item name="start_date" label="Start Date">
                  <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="end_date" label="End Date">
                  <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
                </Form.Item>
              </Col>
              {/* <Col span={24}>
                <Form.Item name="quantity_needed" label="Quantity">
                  <InputNumber placeholder="Quantity" />
                </Form.Item>
              </Col> */}
            </Row>

            <Form.Item>
              <Button onClick={onClose} style={{ marginRight: 8 }}>
                Cancel
              </Button>
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
    ContactList: state.contacts.contacttype,
    Attribute: state.attribute.attributelist,
  };
};

export default connect(mapStateToProps, { createWorkorder, getAllAttribute })(
  Create
);
