import React, { useState } from "react";
import { connect } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageUpload from "./ImageUpload";

import { updateWarehouse } from "../../../actions/warehouseAction";
import { Form, Input, Drawer, Button, Col, Row, Select } from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const Edit = ({ details, setUpdatelist, updateWarehouse }) => {
  const initial = { address: "" };
  const [visible, setVisible] = useState(false);
  const [Logo, setLogo] = useState(null);
  const [imgFileBase64, setimgFileBase64] = useState(null);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onFinish = (values) => {
    const formData = new FormData();
    buildFormData(formData, values);
    if (Logo != null && Logo != undefined) {
      formData.append("logo", Logo);
    }
    updateWarehouse(details.id, formData);
    setUpdatelist(false);
    setVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        Edit
      </Button>

      <Drawer
        title="Edit Warehouse"
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form layout="vertical" onFinish={onFinish} initialValues={details}>
          <Row gutter={16}>
            <Col span={12}>
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
            <Col span={12}>
              <img src={details.logo} width="200px" />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: "Please enter user name" }]}
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

export default connect(null, { updateWarehouse })(Edit);
