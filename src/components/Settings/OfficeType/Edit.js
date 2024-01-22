import React, { useState } from "react";
import { connect } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getAllGroupOfCompany } from "../../../actions/groupofcompanyAction";
import { updateOfficeType } from "../../../actions/officetypeAction";
import {
  Form,
  Input,
  InputNumber,
  Drawer,
  Button,
  Col,
  Row,
  Select,
  TreeSelect,
} from "antd";
const { Option } = Select;

const Edit = ({
  GroupOfCompany,
  details,
  setUpdatelist,
  updateOfficeType,
  getAllGroupOfCompany,
}) => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    getAllGroupOfCompany();
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onFinish = (values) => {
    updateOfficeType(details.id, values);
    setUpdatelist(false);
    setVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        Edit
      </Button>

      <Drawer
        title="Edit Company"
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
                label="Name"
                rules={[{ required: true, message: "Please enter user name" }]}
              >
                <Input placeholder="Please enter group name" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="rank"
                label="Rank"
                rules={[{ required: true, message: "Please enter a rank" }]}
              >
                <InputNumber placeholder="Rank" />
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
    GroupOfCompany: state.groupofcompany.GroupOfCompanylist,
  };
};

export default connect(mapStateToProps, {
  updateOfficeType,
  getAllGroupOfCompany,
})(Edit);
