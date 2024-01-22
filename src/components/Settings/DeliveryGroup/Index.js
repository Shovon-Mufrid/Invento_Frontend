import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import {
  UploadOutlined,
  PlusOutlined,
  MinusCircleFilled,
} from "@ant-design/icons";
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
  Space,
  Popconfirm,
} from "antd";
import {
  getdeliverytype,
  deletedeliverytype,
  createdeliverytype,
} from "../../../actions/settings";
import Listitem from "./listitem";
const { Content } = Layout;
const { Option } = Select;

const BusinessProfile = ({
  getdeliverytype,
  deletedeliverytype,
  createdeliverytype,
  auth,
}) => {
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [data, setdata] = useState();
  const [loading, setloading] = useState(true);
  const [reload, setreload] = useState(false);

  useEffect(() => {
    getdeliverytype().then((e) => {
      setdata(e);
      setreload(false);
      setloading(false);
    });
  }, [reload]);

  const onFinish = (values) => {
    values.Type = "Customer";
    createdeliverytype(values);
    form.resetFields();
    setreload(true);
  };

  const renderdata = () => {
    if (loading) {
      return <Skeleton active />;
    } else {
      return (
        <Row>
          <Col span={9}>
            <Form form={form} layout="vertical" onFinish={onFinish}>
              {auth.permissions.includes(
                "Settings.Delivery Methods_is_create"
              ) ? (
                <Row gutter={16}>
                  <Col span={20}>
                    <Form.Item name="name">
                      <Input placeholder="Please enter new group name" />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        Add
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              ) : (
                ""
              )}
            </Form>
            {data.map((customer, index) => {
              return (
                <Row
                  style={{
                    borderBottom: "1px solid lightgray",
                    marginTop: "10px",
                  }}
                >
                  <Col span={12}>- {customer.name}</Col>
                  <Col span={12} style={{ textAlign: "right" }}>
                    <Space>
                      <Listitem details={customer} setreload={setreload} />

                      <Popconfirm
                        title="Are you sure to delete this contact?"
                        onConfirm={(confirm) => {
                          console.log(confirm);
                          deletedeliverytype(customer.id).then((result) => {
                            setreload(true);
                          });
                        }}
                        okText="Yes"
                        cancelText="No"
                      >
                        {auth.permissions.includes(
                          "Settings.Delivery Methods_is_delete"
                        ) ? (
                          <Button type="link" danger>
                            <MinusCircleFilled />
                          </Button>
                        ) : (
                          ""
                        )}
                      </Popconfirm>
                    </Space>
                  </Col>
                </Row>
              );
            })}
          </Col>
        </Row>
      );
    }
  };

  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Delivery methods</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background main-frame">{renderdata()}</div>
    </>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     businessprofile: state.settings.businessprofile,
//   };
// };

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, {
  getdeliverytype,
  deletedeliverytype,
  createdeliverytype,
})(BusinessProfile);
