import React, { useState } from "react";
import { connect } from "react-redux";

import { updateAttributeTerm } from "../../../actions/attributeAction";
import { Form, Input, Drawer, Button, Col, Row, message } from "antd";
import { EditOutlined } from "@ant-design/icons";

const EditAttribute = ({
  details,
  setUpdatelist,
  updateAttributeTerm,
  attribute,
}) => {
  const [visible, setVisible] = useState(false);
  const [color, setColor] = useState(null);
  const [form] = Form.useForm();

  const ColorPicker = () => {
    if (attribute.name == "Color") {
      return (
        <>
          <div className="ant-row ant-form-item">
            <div className="ant-col ant-form-item-label">
              <label
                for="context"
                className="ant-form-item-required"
                title="context"
              >
                Pick a color : {color}
              </label>
            </div>
            <div className="ant-col ant-form-item-control">
              <div className="ant-form-item-control-input">
                <div className="ant-form-item-control-input-content">
                  <input
                    type="color"
                    className="ant-input"
                    placeholder="Select to pick a color"
                    id="context"
                    name="context"
                    value={color}
                    style={{ padding: "0px" }}
                    onChange={(e) => setColor(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return <></>;
    }
  };

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onFinish = (values) => {
    values["context"] = color;
    updateAttributeTerm(details.id, values);
    setUpdatelist(false);
    message.success(values.name + " Has been Updated");
    setVisible(false);
  };

  return (
    <>
      <Button
        onClick={showDrawer}
        style={{
          marginTop: "-3px",
          marginRight: "10px",
        }}
        size="middle"
        type="link"
        icon={<EditOutlined />}
      ></Button>

      <Drawer
        title="Edit Attribute Term"
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
          <Row gutter={16}>
            <Col span={24}>{ColorPicker()}</Col>
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

export default connect(null, { updateAttributeTerm })(EditAttribute);
