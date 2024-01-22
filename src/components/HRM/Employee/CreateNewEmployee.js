import React, { useState } from "react";
import { connect } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { createEmployee } from "../../../actions/employeeAction";
import { getAllUserRole } from "../../../actions/userRoleAction";
import { getAllLocation } from "../../../actions/warehouseAction";
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
} from "antd";
import ImageUpload from "./ImageUpload";
import moment from "moment";

import { UploadOutlined, PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const CreateNewEmployee = ({
  createEmployee,
  warehouseList,
  RoleList,
  setUpdatelist,
  getAllUserRole,
  getAllLocation,
  updatelist,
}) => {
  const initial = { remarks: "" };
  const [visible, setVisible] = useState(false);
  const [imgFileBase64, setimgFileBase64] = useState(null);
  const [imgFile, setimgFile] = useState(null);
  const format = "h:mm a";
  const format24 = "HH:mm";
  const [entryTime, setEntryTime] = useState(moment("10:00", format));
  const [exitTime, setExitTime] = useState(moment("20:00", format));
  const [form] = Form.useForm();

  const showDrawer = () => {
    getAllUserRole();
    getAllLocation();
    setVisible(true);
  };

  const onClose = () => {
    form.resetFields();
    setVisible(false);
  };

  const onFinish = (values) => {
    console.log(values);
    const value = {
      ...values,
      defaultEntryTime: entryTime.format(format24),
      defaultExitTime: exitTime.format(format24),
    };
    const formData = new FormData();
    buildFormData(formData, value);
    if (imgFile != null && imgFile != undefined) {
      formData.append("photo", imgFile);
    }

    createEmployee(formData);
    form.resetFields();
    setUpdatelist(!updatelist);
    message.success(values.name + " Has been added to your employee list");
    setVisible(false);
  };
  const entryTimeChange = (time) => {
    setEntryTime(time);
  };
  const exitTimeChange = (time) => {
    setExitTime(time);
  };
  const upload = (e) => {
    // Convert the FileList into an array and iterate
    console.log(e.target.files);
    Array.from(e.target.files).forEach((file) => {
      // // Define a new file reader
      // let reader = new FileReader();
      // // Function to execute after loading the file
      // reader.onload = () => console.log(reader.result);
      // // Read the file as a text
      // reader.readAsText(file);
    });
  };
  return (
    <>
      <>
        <Button
          type="primary"
          onClick={showDrawer}
          style={{ marginBottom: "10px", float: "right" }}
        >
          <PlusOutlined /> New Employee
        </Button>
        <Drawer
          title="Create a new Employee"
          width={720}
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
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="Name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter User Full Name",
                    },
                  ]}
                >
                  <Input placeholder="Please enter user name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="photo" label="Photo" extra="Upload photo">
                  <ImageUpload
                    setFile={(file) => setimgFile(file)}
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
                  name="email"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      message: "Please enter Email Address",
                    },
                  ]}
                >
                  <Input
                    style={{ width: "100%" }}
                    addonBefore="@"
                    placeholder="Please enter Email"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: "Please enter a password",
                    },
                  ]}
                >
                  <Input placeholder="Please enter a password" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="phone"
                  label="Phone"
                  rules={[
                    {
                      required: true,
                      message: "Please enter a phone number",
                    },
                  ]}
                >
                  <Input placeholder="Please enter a phone number" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="emergency_phone" label="Emergency Phone">
                  <Input placeholder="Please enter a phone number" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="Designation"
                  label="Designation"
                  rules={[
                    {
                      required: true,
                      message: "Please select user Designation",
                    },
                  ]}
                >
                  <TreeSelect treeData={RoleList} />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="Office"
                  label="Office"
                  rules={[
                    {
                      required: true,
                      message: "Please Select Branch",
                    },
                  ]}
                >
                  <TreeSelect treeData={warehouseList} />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item name="address" label="Address">
                  <Input placeholder="please enter Address" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="defaultShift" label="Shift">
                  <Select defaultValue="day" placeholder="Please choose Shift">
                    <Option value="day">Day</Option>
                    <Option value="night">Night</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name="defaultEntryTime" label="Entry Time">
                  <TimePicker
                    use12Hours
                    onChange={entryTimeChange}
                    defaultValue={entryTime}
                    format={format}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name="defaultExitTime" label="Exit Time">
                  <TimePicker
                    use12Hours
                    onChange={exitTimeChange}
                    defaultValue={exitTime}
                    format={format}
                  />
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

const mapStateToProps = (state) => {
  return {
    RoleList: state.userRole.userRolelist,
    warehouseList: state.warehouse.locationlist,
  };
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

export default connect(mapStateToProps, {
  createEmployee,
  getAllUserRole,
  getAllLocation,
})(CreateNewEmployee);
