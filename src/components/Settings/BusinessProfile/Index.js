import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import {
  Form,
  Input,
  InputNumber,
  Checkbox,
  Drawer,
  TreeSelect,
  Button,
  Col,
  Row,
  Select,
  TimePicker,
  message,
  DatePicker,
  Upload,
  Layout,
  Breadcrumb,
  Skeleton,
  Divider,
} from "antd";
import ImageUpload from "./ImageUpload";
import {
  getBusinessProfile,
  updateBusinessProfile,
} from "../../../actions/settings";
const { Content } = Layout;

const BusinessProfile = ({
  getBusinessProfile,
  updateBusinessProfile,
  businessprofile,
}) => {
  const [visible, setVisible] = useState(false);
  const [data, setdata] = useState();
  const [Logo, setLogo] = useState(null);
  const [Signature, setSignature] = useState(null);
  const [imgFileBase64, setimgFileBase64] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    getBusinessProfile().then((e) => {
      setVisible(true);
    });
  }, [visible]);
  const onFinish = (values) => {
    values["data"] = "";
    const formData = new FormData();
    buildFormData(formData, values);
    if (Logo != null && Logo != undefined) {
      formData.append("logo", Logo);
    }
    if (Signature != null && Signature != undefined) {
      formData.append("signature", Signature);
    }
    setVisible(false);
    updateBusinessProfile(1, formData).then((e) => {
      setVisible(true);
    });
  };
  const details = () => {
    if (!visible) {
      return <Skeleton active />;
    } else {
      return (
        <>
          <Form
            form={form}
            layout="horizontal"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
            initialValues={businessprofile}
          >
            <Row gutter={16}>
              <Col span={24}>
                <img
                  src={businessprofile.logo}
                  style={{
                    maxHeight: "80px",
                    position: "absolute",
                    right: "0",
                  }}
                />
                <Form.Item name="logoo" label="Logo" extra="Upload new logo">
                  <ImageUpload
                    setFile={(file) => setLogo(file)}
                    setFileBase64={(file) => setimgFileBase64(file)}
                  >
                    <Button icon={<UploadOutlined />}> Click to Upload</Button>
                  </ImageUpload>
                </Form.Item>
              </Col>

              <Col span={24}>
                <img
                  src={businessprofile.signature}
                  style={{
                    maxHeight: "80px",
                    position: "absolute",
                    right: "0",
                  }}
                />
                <Form.Item
                  name="signaturee"
                  label="Signature"
                  extra="Upload new signature"
                >
                  <ImageUpload
                    setFile={(file) => setSignature(file)}
                    setFileBase64={(file) => setimgFileBase64(file)}
                  >
                    <Button icon={<UploadOutlined />}> Click to Upload</Button>
                  </ImageUpload>
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  name="invoice_terms"
                  label="Invoice Terms and Condtions"
                >
                  <ReactQuill theme="snow" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="wordrobe_terms"
                  label="Sponsorship Form Terms and Conditions"
                >
                  <ReactQuill theme="snow" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="challan_terms"
                  label="Challan Terms and Conditions"
                >
                  <ReactQuill theme="snow" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="address" label="Full address">
                  <ReactQuill theme="snow" />
                </Form.Item>
              </Col>
              {/* <Col span={24}>
                <Form.Item
                  name="signature"
                  label="Signature"
                  extra="Upload Signature"
                >
                  <ImageUpload
                    setFile={(file) => setSignature(file)}
                    // setFileBase64={(file) => setimgFileBase64(file)}
                  >
                    <Button icon={<UploadOutlined />}> Click to Upload</Button>
                  </ImageUpload>
                </Form.Item>
              </Col> */}
            </Row>

            <Form.Item>
              {/* <Button onClick={onClose} style={{ marginRight: 8 }}>
                    Cancel
                  </Button> */}
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </>
      );
    }
  };
  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Business Profile</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background main-frame">{details()}</div>
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

const mapStateToProps = (state) => {
  return {
    businessprofile: state.settings.businessprofile,
  };
};

export default connect(mapStateToProps, {
  getBusinessProfile,
  updateBusinessProfile,
})(BusinessProfile);
