import React, { useState } from "react";
import { connect } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { createDepartment } from "../../../actions/departmentActions";
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
import { getAllLocation } from "../../../actions/warehouseAction";

const { Option } = Select;

const CreateNewDepartment = ({
  createDepartment,
  setUpdatelist,
  Locations,
  getAllLocation,
}) => {
  const initial = { remarks: "" };
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const showDrawer = () => {
    getAllLocation();
    setVisible(true);
  };

  const onClose = () => {
    form.resetFields();
    setVisible(false);
  };

  const onFinish = (values) => {
    createDepartment(values);
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
    Locations: state.warehouse.locationlist,
  };
};

export default connect(mapStateToProps, { createDepartment, getAllLocation })(
  CreateNewDepartment
);
