import React, { useState } from "react";
import { connect } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { updateContact } from "../../actions/contactAction";
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
} from "antd";

const { Option } = Select;

const EditContact = ({ details, setUpdatelist, updateContact }) => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onFinish = (values) => {
    updateContact(details.id, values);
    setUpdatelist(false);
    setVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        Edit
      </Button>

      <Drawer
        title="Edit Contact"
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form layout="vertical" onFinish={onFinish} initialValues={details}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: "Please enter user name" }]}
              >
                <Input placeholder="Please enter user name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="email" label="Email">
                <Input
                  style={{ width: "100%" }}
                  addonBefore="@"
                  placeholder="Please enter Email"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="phone"
                label="Phone"
                rules={[
                  {
                    required: true,
                    message: "Please enter a phone number",
                  },
                ]}
              >
                <InputNumber placeholder="Please enter a phone number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="Type"
                label="Type"
                rules={[{ required: true, message: "Please choose the type" }]}
              >
                <Select placeholder="Please choose the type">
                  <Option value="Customer">Customer</Option>
                  <Option value="A">Type A</Option>
                  <Option value="B">Type B</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="address" label="Address">
                <Input.TextArea rows={4} placeholder="please enter Address" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="remarks" label="Remaks">
                <ReactQuill theme="snow" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="is_active" valuePropName="checked">
                <Checkbox>Active member !</Checkbox>
              </Form.Item>
            </Col>
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
  );
};

export default connect(null, { updateContact })(EditContact);
