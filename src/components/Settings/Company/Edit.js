import React, { useState } from "react";
import { connect } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getAllGroupOfCompany } from "../../../actions/groupofcompanyAction";
import { updateCompany } from "../../../actions/companyAction";
import {
  Form,
  Input,
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
  updateCompany,
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
    updateCompany(details.id, values);
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
  );
};

const mapStateToProps = (state) => {
  return {
    GroupOfCompany: state.groupofcompany.GroupOfCompanylist,
  };
};

export default connect(mapStateToProps, {
  updateCompany,
  getAllGroupOfCompany,
})(Edit);
