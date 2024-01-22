import React, { useState } from "react";
import { connect } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { createCompany } from "../../../actions/companyAction";
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
  TreeSelect,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { getAllGroupOfCompany } from "../../../actions/groupofcompanyAction";

const { Option } = Select;

const CreateNewDepartment = ({
  createCompany,
  setUpdatelist,
  GroupOfCompany,
  getAllGroupOfCompany,
}) => {
  const initial = { remarks: "" };
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const showDrawer = () => {
    getAllGroupOfCompany();
    setVisible(true);
  };

  const onClose = () => {
    form.resetFields();
    setVisible(false);
  };

  const onFinish = (values) => {
    createCompany(values);
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
          <PlusOutlined /> New Department
        </Button>
        <Drawer
          title="Create a new Department"
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
                  label="Name"
                  rules={[
                    { required: true, message: "Please enter department name" },
                  ]}
                >
                  <Input placeholder="Please enter department name" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="GroupOfCompany"
                  label="Group"
                  rules={[{ required: true, message: "Please select a group" }]}
                >
                  <TreeSelect treeData={GroupOfCompany} />
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
    GroupOfCompany: state.groupofcompany.GroupOfCompanylist,
  };
};

export default connect(mapStateToProps, {
  createCompany,
  getAllGroupOfCompany,
})(CreateNewDepartment);
