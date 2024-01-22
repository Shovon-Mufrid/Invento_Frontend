import React, { useState } from "react";
import { connect } from "react-redux";

import {
  updateCategory,
  getAllCategory,
} from "../../../actions/categoryAction";
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
  updateCategory,
  getAllCategory,
  List,
}) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const showDrawer = () => {
    getAllCategory();
    setVisible(true);
  };
  const onClose = () => {
    form.resetFields();
    setVisible(false);
  };

  const onFinish = (values) => {
    console.log(details);
    updateCategory(details.id, values);
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
        title="Edit Category"
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
                <Input placeholder="Please enter user name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="slug"
                label="Slug"
                rules={[
                  {
                    required: true,
                    message: "Please enter slug",
                  },
                ]}
              >
                <Input
                  style={{ width: "100%" }}
                  placeholder="Please enter slug"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="Category_parent" label="Parent Category">
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
    List: state.category.categorylist,
  };
};

export default connect(mapStateToProps, { updateCategory, getAllCategory })(
  EditCategory
);
