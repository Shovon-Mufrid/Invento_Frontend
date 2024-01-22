import React, { useState } from "react";
import { connect } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { updateLeaveType } from "../../../actions/leaveTypeActions";
import { Form, Input, Drawer, Button, Col, Row, Select } from "antd";

const { Option } = Select;

const Edit = ({ details, setUpdatelist, updateLeaveType }) => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onFinish = (values) => {
    updateLeaveType(details.id, values);
    setUpdatelist(false);
    setVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        Edit
      </Button>

      <Drawer
        title="Edit Leave Type"
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form layout="vertical" onFinish={onFinish} initialValues={details}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="Typename"
                label="Leave Type Name"
                rules={[{ required: true, message: "Please enter Leave Type Name" }]}
              >
                <Input placeholder="Please enter Leave Type Name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="initialDays"
                label="Name"
                rules={[{ required: true, message: "Please enter Initial Days" }]}
              >
                <Input placeholder="Please enter Initial Days" />
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

export default connect(null, { updateLeaveType })(Edit);
