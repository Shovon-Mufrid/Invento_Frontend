import React, { useState } from "react";
import { connect } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { createworkstations } from "../../../actions/Manufacturing/workstationsAction";

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

var currentdate = new Date();
var orderno =
  currentdate.getDate().toString() +
  (currentdate.getMonth() + 1).toString() +
  currentdate.getFullYear().toString() +
  currentdate.getHours().toString() +
  currentdate.getMinutes().toString() +
  currentdate.getSeconds().toString();

const Create = ({
  createworkstations,
  setUpdatelist,
  ContactList,
  updatelist,
}) => {
  const initial = { description: "" };
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const showDrawer = () => {
    setVisible(true);
    form.setFieldsValue({ order_number: orderno });
  };

  const onClose = () => {
    form.resetFields();
    setVisible(false);
  };

  const onFinish = (values) => {
    createworkstations(values).then((res) => {
      form.resetFields();
      setUpdatelist(!updatelist);
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
          <PlusOutlined /> New Workstation
        </Button>
        <Drawer
          title="Create a new workstation"
          width="40%"
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
                <Form.Item name="workstation_name" label="Workstation Name">
                  <Input placeholder="Please enter workstation name" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item name="description" label="Description">
                  <ReactQuill theme="snow" />
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

export default connect(null, { createworkstations })(Create);
