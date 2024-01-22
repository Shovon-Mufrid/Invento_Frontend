import React, { useState } from "react";
import { connect } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getcontacttype } from "../../../actions/settings";

import { createContact } from "../../../actions/contactAction";
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
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const CreateNewContact = ({
  createContact,
  setreload,
  reload,
  ContactList,
}) => {
  const initial = { remarks: "" };
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const showDrawer = () => {
    getcontacttype();
    setVisible(true);
  };

  const onClose = () => {
    form.resetFields();
    setVisible(false);
  };

  const onFinish = (values) => {
    values.Type = "Customer";
    createContact(values).then((result) => {
      form.resetFields();
      setreload(!reload);
      // message.success(values.name + " Has been added to your contact list");
      setVisible(false);
    });
  };

  return (
    <>
      <>
        <Button
          type="primary"
          onClick={showDrawer}
          style={{ marginBottom: "10px", float: "right" }}
        >
          <PlusOutlined /> New Customer
        </Button>
        <Drawer
          title="Create a new Contact"
          width={720}
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
              <Col span={12}>
                <Form.Item name="name" label="Name">
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
                  <Input placeholder="Please enter a phone number" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item name="role" label="Type">
                  <Select placeholder="Please choose the type">
                    {ContactList.map((contact) => {
                      if (contact.Type == "Customer") {
                        return (
                          <Option key={contact.id} value={contact.id}>{contact.name}</Option>
                        );
                      }
                    })}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="Special_Date_Type" label="Special Date Type">
                  <Select placeholder="Please choose the type">
                    <Option value="Birthday">Birthday</Option>
                    <Option value="Wedding">Wedding</Option>
                    <Option value="Anniversary">Anniversary</Option>
                    <Option value="Others">Others</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item name="special_dates" label="Special Date">
                  <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item name="address" label="Address">
                  <Input placeholder="please enter Address" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="remarks" label="Remarks">
                  <ReactQuill theme="snow" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item name="is_active" valuePropName="checked" checked>
                  <Checkbox>Active contact !</Checkbox>
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
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    ContactList: state.contacts.contacttype,
  };
};
export default connect(mapStateToProps, { createContact, getcontacttype })(
  CreateNewContact
);
