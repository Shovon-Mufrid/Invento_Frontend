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
import { createService } from "../../../../actions/invoiceItem";

const { Option } = Select;

const CreateNewContact = ({
  service,
  setservicetrigger,
  createService,
  id,
  setloading,
  product,
}) => {
  const initial = { details: "" };
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
    values["invoice"] = id;
    values["quantity"] = 1;
    values["status"] = "Pending";
    values["data"] = "reload";
    if (product > 0) {
      values["product"] = product;
    }
    console.log(values);
    createService(values).then((e) => {
      setVisible(false);
      setservicetrigger(true);
      setloading(true);
      form.resetFields();
    });
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
          width={500}
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
                  name="details"
                  label="Description"
                  style={{ minHeight: "60vh" }}
                  rules={[
                    {
                      required: true,
                      message: "Please insert a description",
                    },
                  ]}
                >
                  <ReactQuill theme="snow" style={{ height: "50vh" }} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="price"
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

export default connect(null, { createService })(CreateNewContact);
