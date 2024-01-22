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

const CreateNewContact = ({ bill }) => {
  const initial = { remarks: "" };
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onFinish = (values) => {
    bill.current.shipping_address = values.Shipping;
    bill.current.remarks = values.remarks;
    setVisible(false);
  };

  return (
    <>
      <>
        <Button type="link" onClick={showDrawer} style={{ paddingLeft: "0px" }}>
          Add Shipping Address and Notes
          <PlusOutlined />
        </Button>
        <Drawer
          title="Shipping Address and Notes"
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
                <Form.Item name="Shipping" label="Shipping Address">
                  <Input placeholder="Please enter a shipping address" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="remarks"
                  label="Remarks"
                  style={{ minHeight: "60vh" }}
                >
                  <ReactQuill theme="snow" style={{ height: "50vh" }} />
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
