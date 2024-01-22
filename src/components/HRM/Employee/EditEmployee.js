import React, { useState } from "react";
import { connect } from "react-redux";
import ReactQuill from "react-quill";
import moment from "moment";
import "react-quill/dist/quill.snow.css";
import ImageUpload from "./ImageUpload";
import FileUpload from "./FileUpload";
import { Link } from "react-router-dom";

import { updateEmployee } from "../../../actions/employeeAction";
import {
  createUserDocument,
  deleteUserDocument,
} from "../../../actions/EmployeeDocumentAction";
import { getAllUserRole } from "../../../actions/userRoleAction";
import { getAllLocation } from "../../../actions/warehouseAction";

import {
  Form,
  Input,
  InputNumber,
  Checkbox,
  Drawer,
  Button,
  TreeSelect,
  TimePicker,
  Col,
  Row,
  Select,
  Upload,
  message,
  DatePicker,
  Space,
} from "antd";
import {
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";

const { Option } = Select;

const EditEmployee = ({
  details,
  RoleList,
  updatelist,
  setUpdatelist,
  updateEmployee,
  warehouseList,
  createUserDocument,
  deleteUserDocument,
  Auth,
  loading,
  getAllUserRole,
  getAllLocation,
}) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const format = "h:mm a";
  const format2 = "h:mm";
  const format24 = "HH:mm";
  let detailsData = { ...details };
  detailsData.special_dates = moment(detailsData.special_dates);
  if (
    detailsData.defaultEntryTime != undefined &&
    detailsData.defaultEntryTime != null
  )
    detailsData.defaultEntryTime = moment(detailsData.defaultEntryTime, format);
  else detailsData.defaultEntryTime = moment("10:00", format);
  if (
    detailsData.defaultExitTime != undefined &&
    detailsData.defaultExitTime != null
  )
    detailsData.defaultExitTime = moment(detailsData.defaultExitTime, format);
  else detailsData.defaultExitTime = moment("20:00", format);
  const showDrawer = () => {
    // detailsData = { ...details };
    getAllUserRole();
    getAllLocation();
    form.setFieldsValue(detailsData);
    setVisible(true);
  };

  const onClose = () => {
    form.resetFields();
    setVisible(false);
  };
  const [imgFileBase64, setimgFileBase64] = useState(null);
  const [imgFile, setimgFile] = useState(null);
  const [docFileList, setidocFileList] = useState(null);
  const [imgUrl, setimgUrl] = useState(detailsData.photo);
  const [branch, setBranch] = useState(detailsData.branch);
  const [userRole, setuserRole] = useState(detailsData.user_role);

  const [entryTime, setEntryTime] = useState(detailsData.defaultEntryTime);
  const [exitTime, setExitTime] = useState(detailsData.defaultExitTime);
  const onFinish = (values) => {
    let promises = [];
    console.log(values);
    console.log(RoleList);
    console.log(warehouseList);
    if (typeof userRole === "object") {
      values["user_role"] = userRole.id;
    } else {
      values["user_role"] = userRole;
    }
    if (typeof branch === "object") {
      values["branch"] = branch.id;
    } else {
      values["branch"] = branch;
    }

    if (
      values["password"] === null ||
      values["password"] === undefined ||
      values["password"] === ""
    ) {
      console.log("password empty");
      values["password"] = null;
    }
    const value = {
      ...values,
      defaultEntryTime: entryTime.format(format24),
      defaultExitTime: exitTime.format(format24),
    };
    const formData = new FormData();
    buildFormData(formData, value);
    if (imgFile != null && imgFile != undefined) {
      formData.append("photo", imgFile);
    } else {
      formData.delete("photo");
    }
    // console.log(value);
    // console.log(formData);
    promises.push(updateEmployee(detailsData.id, formData));

    if (docFileList != null && docFileList != undefined) {
      let Filesform = new FormData();
      Filesform.append("id", detailsData.id);
      Filesform.append("key", detailsData.key);
      Filesform.append("value", detailsData.value);
      Filesform.append("employee", detailsData.value);
      Filesform.append("employee_id", detailsData.value);
      docFileList.forEach((element) => {
        console.log(element);
        if (element instanceof File) {
          Filesform.append("file", element);
          promises.push(createUserDocument(Filesform));
        }
      });
    }
    Promise.all(promises).then((result) => {
      form.resetFields();
      loading.current = true;
      setUpdatelist(!updatelist);
      setVisible(false);
    });
  };
  const normalFile = (e) => {
    console.log("Upload Event");
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  const entryTimeChange = (time) => {
    setEntryTime(time);
  };
  const exitTimeChange = (time) => {
    setExitTime(time);
  };
  const deleteDocument = (documentId) => {
    deleteUserDocument(documentId);
  };
  const onRoleChange = (value) => {
    setuserRole(value);
  };
  const onLocationChange = (value) => {
    setBranch(value);
  };
  return (
    <>
      <Link to="#" onClick={showDrawer} style={{ marginRight: "10px" }}>
        Edit
      </Link>

      <Drawer
        title="Edit Employee"
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={detailsData}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="email" label="Email">
                <Input
                  style={{ width: "100%" }}
                  addonBefore="@"
                  placeholder="Please enter Email"
                  disabled
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="photo_default_not_sending"
                label="Photo"
                extra="Upload photo"
              >
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
              <Form.Item name="name" label="Name">
                <Input placeholder="Please enter user name" />
              </Form.Item>
            </Col>
            {Auth.superuser ? (
              <Col span={12}>
                <Form.Item name="password" label="Password">
                  <Input placeholder="Please enter a password" />
                </Form.Item>
              </Col>
            ) : (
              ""
            )}
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

            {/* <Col span={12}>
              <Form.Item
                name="branch"
                label="Branch"
                rules={[
                  {
                    required: true,
                    message: "Please select user Branch",
                  },
                ]}
              >
                <TreeSelect
                  onChange={onLocationChange}
                  treeData={warehouseList}
                />
              </Form.Item>
            </Col> */}

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
                <TreeSelect onChange={onRoleChange} treeData={RoleList} />
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
                <TreeSelect
                  onChange={onLocationChange}
                  treeData={warehouseList}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
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
            <Col span={24}>
              <Form.Item
                name="files"
                label="Upload New Documents"
                // extra="Employee Documents"
              >
                <FileUpload
                  setFile={(file) => setidocFileList(file)}
                  // oldFiles={detailsData.files}
                  oldFiles={[]}
                  // delFile={(id) => deleteDocument(id)}
                >
                  <Button icon={<UploadOutlined />}> Click to Upload</Button>
                </FileUpload>
              </Form.Item>
            </Col>
            <Col span={24}>
              <h3>All Doccuments</h3>
              {detailsData.files.map((data) => {
                console.log(data);
                return (
                  <p>
                    <Space>
                      <a href={data.url} target="_blank">
                        {data.name}
                      </a>
                      <a
                        onClick={() => {
                          deleteDocument(data.id);
                        }}
                        style={{ color: "red" }}
                      >
                        Remove
                      </a>
                    </Space>
                  </p>
                );
                // return data.url;
              })}
            </Col>
            <Col span={24}>
              <Form.Item name="is_active" valuePropName="checked" checked>
                <Checkbox>Active Employee !</Checkbox>
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
    RoleList: state.userRole.userRolelist,
    warehouseList: state.warehouse.locationlist,
    Auth: state.auth,
  };
};
export default connect(mapStateToProps, {
  updateEmployee,
  createUserDocument,
  deleteUserDocument,
  getAllUserRole,
  getAllLocation,
})(EditEmployee);

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
