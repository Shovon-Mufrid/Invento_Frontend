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
  getaccountsparent,
  deleteaccountsparent,
  createaccountsparent,
} from "../../../actions/settings";
import Listitem from "./listitem";
const { Content } = Layout;
const { Option } = Select;

const BusinessProfile = ({
  getaccountsparent,
  deleteaccountsparent,
  createaccountsparent,
  auth,
}) => {
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [data, setdata] = useState();
  const [loading, setloading] = useState(true);
  const [reload, setreload] = useState(false);

  useEffect(() => {
    getaccountsparent().then((e) => {
      setdata(e);
      setreload(false);
      setloading(false);
    });
  }, [reload]);

  const onFinish = (values) => {
    values.Type = "Bank";
    createaccountsparent(values);
    form.resetFields();
    setreload(true);
  };
  const onFinish2 = (values) => {
    values.Type = "Mobile Banking";
    createaccountsparent(values);
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
            <h3>Bank</h3>
            <Divider />
            <Form form={form} layout="vertical" onFinish={onFinish}>
              {auth.permissions.includes(
                "Settings.Account Groups_is_create"
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
              if (customer.Type == "Bank") {
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
                            deleteaccountsparent(customer.id).then((result) => {
                              setreload(true);
                            });
                          }}
                          okText="Yes"
                          cancelText="No"
                        >
                          {auth.permissions.includes(
                            "Settings.Account Groups_is_delete"
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
              }
            })}
          </Col>
          <Col span={9} offset={5}>
            <h3>Mobile Banking</h3>
            <Divider />
            <Form form={form2} layout="vertical" onFinish={onFinish2}>
              {auth.permissions.includes(
                "Settings.Account Groups_is_create"
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
              if (customer.Type == "Mobile Banking") {
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
                            deleteaccountsparent(customer.id).then((result) => {
                              setreload(true);
                            });
                          }}
                          okText="Yes"
                          cancelText="No"
                        >
                          {auth.permissions.includes(
                            "Settings.Account Groups_is_delete"
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
              }
            })}
          </Col>
        </Row>
      );
    }
  };

  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Account Groups</Breadcrumb.Item>
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
  getaccountsparent,
  deleteaccountsparent,
  createaccountsparent,
})(BusinessProfile);
