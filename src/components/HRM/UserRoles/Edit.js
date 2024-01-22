import React, { useState } from "react";
import { connect } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { updateUserRole } from "../../../actions/userRoleAction";
import {
  Form,
  Input,
  Drawer,
  TreeSelect,
  Button,
  Col,
  Row,
  Select,
  InputNumber,
} from "antd";

const { Option } = Select;

const Edit = ({
  details,
  departmentList,
  setUpdatelist,
  updateUserRole,
  auth,
}) => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onFinish = (values) => {
    updateUserRole(details.id, values);
    setUpdatelist(false);
    setVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        Edit
      </Button>

      <Drawer
        title="Edit User Role"
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form layout="vertical" onFinish={onFinish} initialValues={details}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="name"
                label="Designation"
                rules={[{ required: true, message: "Please enter role name" }]}
              >
                <Input placeholder="Please enter role name" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
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
  );
};

const mapStateToProps = (state) => {
  return {
    departmentList: state.department.departmentlist,
    auth: state.auth,
  };
};
export default connect(mapStateToProps, { updateUserRole })(Edit);
