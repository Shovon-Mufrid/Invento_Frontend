import React, { useState } from "react";
import { connect } from "react-redux";

import {
  updateOfficeLocation,
  getAllOfficeLocation,
} from "../../../actions/officelocationAction";
import {
  Form,
  Input,
  Drawer,
  Button,
  Col,
  Row,
  message,
  TreeSelect,
} from "antd";

const EditCategory = ({
  details,
  setUpdatelist,
  updateOfficeLocation,
  getAllOfficeLocation,
  List,
}) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const showDrawer = () => {
    getAllOfficeLocation();
    setVisible(true);
  };
  const onClose = () => {
    form.resetFields();
    setVisible(false);
  };

  const onFinish = (values) => {
    console.log(details);
    updateOfficeLocation(details.id, values);
    setUpdatelist(false);
    message.success(values.name + " Has been Updated");
    setVisible(false);
    form.resetFields();
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        Edit
      </Button>

      <Drawer
        title="Edit Location"
        width={400}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form
          form={form}
          layout="vertical"
          hideRequiredMark
          onFinish={onFinish}
          initialValues={details}
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: "Please enter user name" }]}
              >
                <Input placeholder="Please enter name" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="OfficeLocation_parent" label="Parent Location">
                <TreeSelect treeData={List} />
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
    List: state.officelocation.OfficeLocationlist,
  };
};

export default connect(mapStateToProps, {
  updateOfficeLocation,
  getAllOfficeLocation,
})(EditCategory);
