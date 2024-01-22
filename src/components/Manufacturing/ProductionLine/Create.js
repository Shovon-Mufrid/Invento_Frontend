import React, { useState } from "react";
import { connect } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { createproductionlines } from "../../../actions/Manufacturing/productionlinesAction";

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
  createproductionlines,
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
    createproductionlines(values).then((res) => {
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
          <PlusOutlined /> New Production Line
        </Button>
        <Drawer
          title="Create a new Production Line"
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
                <Form.Item name="line_name" label="Production Line Name">
                  <Input placeholder="Please enter production line name" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="location" label="Location">
                  <Input placeholder="Please enter location" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="capacity" label="Capacity">
                  <InputNumber placeholder="Capacity" />
                </Form.Item>
              </Col>
            </Row>
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

export default connect(null, { createproductionlines })(Create);
