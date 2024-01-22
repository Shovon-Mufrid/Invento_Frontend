import React, { useState } from "react";
import { connect } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
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
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const CreateNewContact = ({ service, setservicetrigger, product }) => {
  const initial = { Description: "" };
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    form.resetFields();
    setVisible(false);
  };

  const onFinish = (values) => {
    if (product > 0) {
      const arr = {
        Total_Price: values.Price,
        Price: values.Price,
        Quantity: 1,
        Description: values.Description,
        product: product,
      };
      service.current.push(arr);
    } else {
      const arr = {
        Total_Price: values.Price,
        Price: values.Price,
        Quantity: 1,
        Description: values.Description,
        product: 0,
      };
      service.current.push(arr);
    }

    setVisible(false);
    setservicetrigger(true);
    form.resetFields();
  };

  return (
    <>
      <>
        <Button type="link" onClick={showDrawer} style={{ paddingLeft: "0px" }}>
          {product > 0 ? "New Service" : "Add individual service"}
          <PlusOutlined />
        </Button>
        <Drawer
          title="Add new service"
          width="100%"
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
                <Form.Item
                  name="Description"
                  label="Description"
                  style={{ minHeight: "60vh" }}
                  rules={[
                    {
                      required: true,
                      message: "Please insert a Description",
                    },
                  ]}
                >
                  <ReactQuill theme="snow" style={{ height: "50vh" }} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="Price"
                  label="Price"
                  rules={[
                    {
                      required: true,
                      message: "Please insert a price",
                    },
                  ]}
                >
                  <InputNumber placeholder="Please enter the initail price" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item>
              <Button onClick={onClose} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Add
              </Button>
            </Form.Item>
          </Form>
        </Drawer>
      </>
    </>
  );
};

export default connect(null)(CreateNewContact);
