import React, { useState } from "react";
import { connect } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { createLeaveType } from "../../../actions/leaveTypeActions";
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

const CreateNewLeaveType = ({ createLeaveType, setUpdatelist }) => {
  const initial = { remarks: "" };
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
    createLeaveType(values);
    form.resetFields();
    setUpdatelist(false);
    setVisible(false);
  };

  return (
    <>
      <>
        <Button
          type="primary"
          onClick={showDrawer}
          style={{ marginBottom: "10px", float: "right" }}
        >
          <PlusOutlined /> New Leave Type
        </Button>
        <Drawer
          title="Create a new Leave Type"
          width={400}
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
                  name="Typename"
                  label="Leave Type Name"
                  rules={[
                    { required: true, message: "Please enter Leave Type name" },
                  ]}
                >
                  <Input placeholder="Please enter Leave Type name" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="initialDays"
                  label="Days"
                  rules={[
                    { required: true, message: "Please enter Leave Type Days" },
                  ]}
                >
                  <Input placeholder="Please enter Leave Type Days" />
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

export default connect(null, { createLeaveType })(CreateNewLeaveType);
