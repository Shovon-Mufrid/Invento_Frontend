import React, { useState } from "react";
import { connect } from "react-redux";

import { createAttribute } from "../../../actions/attributeAction";
import { Form, Input, Drawer, Button, Col, Row, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const CreateNewAttribute = ({ createAttribute, setUpdatelist }) => {
  const [visible, setVisible] = useState(false);
  const [color, setColor] = useState(null);
  const [form] = Form.useForm();

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
    form.resetFields();
  };

  const onFinish = (values) => {
    createAttribute(values);
    setUpdatelist(false);
    message.success(values.name + " Has been added to your attribute list");
    setVisible(false);
    form.resetFields();
  };

  return (
    <>
      <>
        <Button
          type="primary"
          onClick={showDrawer}
          style={{ marginBottom: "10px", float: "right" }}
        >
          <PlusOutlined /> New Attribute
        </Button>
        <Drawer
          title="Create a new Attribute"
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
            {/* <Row gutter={16}>
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
            </Row> */}

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

export default connect(null, { createAttribute })(CreateNewAttribute);
