import React, { useState } from "react";
import { connect } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageUpload from "./ImageUpload";

import {
  createWarehouse,
  getAllLocation,
} from "../../../actions/warehouseAction";
import { getAllCompany } from "../../../actions/companyAction";
import { getAllDepartment } from "../../../actions/departmentActions";
import { getAllOfficeType } from "../../../actions/officetypeAction";
import { getAllOfficeLocation } from "../../../actions/officelocationAction";

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
  TreeSelect,
  message,
} from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const CreateNewWarehouse = ({
  createWarehouse,
  setUpdatelist,
  getAllLocation,
  getAllCompany,
  getAllDepartment,
  getAllOfficeType,
  getAllOfficeLocation,
  Locationlist,
  Companylist,
  Depatmentlist,
  OfficeTypelist,
  OfficeLocationlist,
}) => {
  const initial = { address: "" };
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [Logo, setLogo] = useState(null);
  const [imgFileBase64, setimgFileBase64] = useState(null);

  const showDrawer = () => {
    getAllLocation();
    getAllCompany();
    getAllDepartment();
    getAllOfficeType();
    getAllOfficeLocation();
    setVisible(true);
  };

  const onClose = () => {
    form.resetFields();
    setVisible(false);
  };

  const onFinish = (values) => {
    values["data"] = "";
    values["petty_cash"] = 0;
    // values["is_outlet"] = false;
    // values["is_office"] = true;
    const formData = new FormData();
    buildFormData(formData, values);
    if (Logo != null && Logo != undefined) {
      formData.append("logo", Logo);
    }
    // formData.append("Department", JSON.stringify(values.Department));
    createWarehouse(values);
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
          <PlusOutlined /> New office
        </Button>
        <Drawer
          title="Create a new office"
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
            {/* <Row gutter={16}>
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
            </Row> */}
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item name="Office_parent" label="Parent office">
                  <TreeSelect treeData={Locationlist} />
                </Form.Item>
              </Col>
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
              <Col span={12}>
                <Form.Item
                  name="Company"
                  label="Company"
                  rules={[
                    { required: true, message: "Please select a company" },
                  ]}
                >
                  <TreeSelect treeData={Companylist} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="OfficeType"
                  label="Type"
                  rules={[
                    { required: true, message: "Please select a office type" },
                  ]}
                >
                  <TreeSelect treeData={OfficeTypelist} />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  name="OfficeLocation"
                  label="Office location"
                  rules={[
                    { required: true, message: "Please select location" },
                  ]}
                >
                  <TreeSelect treeData={OfficeLocationlist} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item name="address" label="Full address">
                  <ReactQuill theme="snow" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="Department"
                  label="Departments"
                  rules={[
                    {
                      required: true,
                      message: "Please select atleast one department",
                    },
                  ]}
                >
                  <Select
                    mode="multiple"
                    allowClear
                    style={{
                      width: "100%",
                    }}
                    placeholder="Please select"
                    // onChange={handleChange}
                  >
                    {Depatmentlist.map((department) => {
                      return (
                        <Option value={department.id}>{department.name}</Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={7}>
                <Form.Item name="is_outlet" valuePropName="checked" checked>
                  <Checkbox>is outlet !</Checkbox>
                </Form.Item>
              </Col>
              <Col span={7}>
                <Form.Item name="is_office" valuePropName="checked" checked>
                  <Checkbox>is office !</Checkbox>
                </Form.Item>
              </Col>
              <Col span={7}>
                <Form.Item name="is_warehouse" valuePropName="checked" checked>
                  <Checkbox>is warehouse !</Checkbox>
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
      if (key != "Department") {
        buildFormData(
          formData,
          data[key],
          parentKey ? `${parentKey}[${key}]` : key
        );
      }
    });
  } else {
    const value = data == null ? "" : data;
    formData.append(parentKey, value);
  }
}

const mapStateToProps = (state) => {
  return {
    Locationlist: state.warehouse.locationlist,
    Companylist: state.company.Companylist,
    Depatmentlist: state.department.departmentlist,
    OfficeTypelist: state.officetype.OfficeTypelist,
    OfficeLocationlist: state.officelocation.OfficeLocationlist,
  };
};

export default connect(mapStateToProps, {
  createWarehouse,
  getAllLocation,
  getAllCompany,
  getAllDepartment,
  getAllOfficeType,
  getAllOfficeLocation,
})(CreateNewWarehouse);
