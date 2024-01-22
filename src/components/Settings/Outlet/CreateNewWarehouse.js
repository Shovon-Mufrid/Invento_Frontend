import React, { useState } from "react";
import { connect } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageUpload from "./ImageUpload";

import { createWarehouse } from "../../../actions/warehouseAction";
import {
  Form,
  Input,
  InputNumber,
  Checkbox,
  Drawer,
  Button,
  Col,
  Row,
  Select,
  message,
} from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const CreateNewWarehouse = ({ createWarehouse, setUpdatelist }) => {
  const initial = { address: "" };
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [Logo, setLogo] = useState(null);
  const [imgFileBase64, setimgFileBase64] = useState(null);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    form.resetFields();
    setVisible(false);
  };

  const onFinish = (values) => {
    values["data"] = "";
    values["petty_cash"] = 0;
    values["is_outlet"] = true;
    const formData = new FormData();
    buildFormData(formData, values);
    if (Logo != null && Logo != undefined) {
      formData.append("logo", Logo);
    }
    createWarehouse(formData);
    form.resetFields();
    setUpdatelist(false);
    setVisible(false);
  };

  return (
    <>
      <>
        <Button
          type="primary"
          onClick={showDrawer}
          style={{ marginBottom: "10px", float: "right" }}
        >
          <PlusOutlined /> New outlet
        </Button>
        <Drawer
          title="Create a new outlet"
          width="40%"
          onClose={onClose}
          visible={visible}
          bodyStyle={{ paddingBottom: 80 }}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={initial}
          >
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="logoo"
                  label="Outlet logo"
                  extra="Upload new logo"
                >
                  <ImageUpload
                    setFile={(file) => setLogo(file)}
                    setFileBase64={(file) => setimgFileBase64(file)}
                  >
                    <Button icon={<UploadOutlined />}> Click to Upload</Button>
                  </ImageUpload>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
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
              <Col span={11} offset={1}>
                <Form.Item name="contact" label="Phone">
                  <Input placeholder="+880123456XXXX" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={24}>
                <Form.Item name="address" label="Full address">
                  <ReactQuill theme="snow" />
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
    </>
  );
};

function buildFormData(formData, data, parentKey) {
  if (
    data &&
    typeof data === "object" &&
    !(data instanceof Date) &&
    !(data instanceof File)
  ) {
    Object.keys(data).forEach((key) => {
      buildFormData(
        formData,
        data[key],
        parentKey ? `${parentKey}[${key}]` : key
      );
    });
  } else {
    const value = data == null ? "" : data;
    formData.append(parentKey, value);
  }
}

export default connect(null, { createWarehouse })(CreateNewWarehouse);
