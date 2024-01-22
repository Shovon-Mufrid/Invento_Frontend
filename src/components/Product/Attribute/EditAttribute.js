import React, { useState } from "react";
import { connect } from "react-redux";

import { updateAttribute } from "../../../actions/attributeAction";
import { Form, Input, Drawer, Button, Col, Row, message } from "antd";

const EditAttribute = ({ details, setUpdatelist, updateAttribute }) => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onFinish = (values) => {
    updateAttribute(details.id, values);
    setUpdatelist(false);
    message.success(values.name + " Has been Updated");
    setVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        Edit
      </Button>

      <Drawer
        title="Edit Attribute"
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form
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
  );
};

export default connect(null, { updateAttribute })(EditAttribute);
