import React, { useState } from "react";
import { connect } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { createUserRole } from "../../../actions/userRoleAction";
import {
  Form,
  Input,
  InputNumber,
  Checkbox,
  Drawer,
  TreeSelect,
  Button,
  Col,
  Row,
  Select,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const CreateNewUserRole = ({
  createUserRole,
  departmentList,
  setUpdatelist,
  auth,
}) => {
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
    createUserRole(values);
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
          <PlusOutlined /> New User Role
        </Button>
        <Drawer
          title="Create a new User Role"
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
                  name="name"
                  label="Designation"
                  rules={[
                    { required: true, message: "Please enter role name" },
                  ]}
                >
                  <Input placeholder="Please enter role name" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="rank"
                  label="Rank"
                  rules={[{ required: true, message: "Please enter Rank" }]}
                >
                  <InputNumber
                    placeholder="Please enter role name"
                    min={auth.profile.Rank}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={24}>
                <Form.Item name="Department" label="Department">
                  <TreeSelect treeData={departmentList} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="responsibility" label="Responsibility">
                  <Input />
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
    departmentList: state.department.departmentlist,
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { createUserRole })(CreateNewUserRole);
