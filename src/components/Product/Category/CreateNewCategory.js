import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import {
  createCategory,
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
import { PlusOutlined } from "@ant-design/icons";

const CreateNewAttribute = ({
  createCategory,
  setUpdatelist,
  getAllCategory,
  List,
}) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    getAllCategory();
  }, []);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    form.resetFields();
    setVisible(false);
  };

  const onFinish = async (values) => {
    let response = await createCategory(values);
    if (response.status == 201) {
      setUpdatelist(false);
      message.success(values.name + " Has been added to your attribute list");
      form.resetFields();
      setVisible(false);
    } else if (response.response.data.slug) {
      message.warning(response.response.data.slug);
    } else {
      message.error("Please contact with your service provider");
    }
  };

  return (
    <>
      <>
        <Button
          type="primary"
          onClick={showDrawer}
          style={{ marginBottom: "10px", float: "right" }}
        >
          <PlusOutlined /> New Category
        </Button>
        <Drawer
          title="Create a new Category"
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
          >
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="name"
                  label="Name"
                  rules={[
                    { required: true, message: "Please enter user name" },
                  ]}
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
              <Button
                onClick={() => {
                  form.resetFields();
                }}
                style={{ marginRight: 8 }}
              >
                Clear
              </Button>
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
    List: state.category.categorylist,
  };
};

export default connect(mapStateToProps, { createCategory, getAllCategory })(
  CreateNewAttribute
);
