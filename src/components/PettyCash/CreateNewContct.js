import React, { useState } from "react";
import { connect } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { createpettycash } from "../../actions/accounting/pettycash";
import { getAllLocation } from "../../actions/warehouseAction";
import { getAllEmployee } from "../../actions/employeeAction";
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
  DatePicker,
  Skeleton,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const CreateNewContact = ({
  createpettycash,
  setUpdatelist,
  ContactList,
  getAllLocation,
  getAllEmployee,
  employeeList,
  Auth,
}) => {
  const initial = { narration: "" };
  const [visible, setVisible] = useState(false);
  const [locations, setlocations] = useState(false);
  const [loading, setloading] = useState(true);
  const [form] = Form.useForm();

  const showDrawer = () => {
    getAllEmployee();
    getAllLocation().then((result) => {
      setlocations(result);
      setloading(false);
    });
    setVisible(true);
  };

  const onClose = () => {
    form.resetFields();
    setVisible(false);
  };

  const onFinish = (values) => {
    if (!Auth.superuser) {
      values.location = Auth.profile.branch.id;
    }
    createpettycash(values);
    form.resetFields();
    setUpdatelist(false);
    // message.success(values.name + " Has been added to your contact list");
    setVisible(false);
  };

  const renderData = () => {
    if (loading) {
      return <Skeleton active />;
    } else {
      return (
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={initial}
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="narration" label="Narration">
                <ReactQuill theme="snow" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              {Auth.superuser ? (
                <Form.Item
                  name="location"
                  label="Location"
                  rules={[
                    {
                      required: true,
                      message: "Please enter a phone number",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Please choose the type"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {locations.map((contact) => {
                      return <Option value={contact.id}>{contact.name}</Option>;
                    })}
                  </Select>
                </Form.Item>
              ) : (
                ""
              )}
            </Col>

            <Col span={24}>
              <Form.Item
                name="employee"
                label="Employe"
                rules={[
                  {
                    required: true,
                    message: "Please enter a phone number",
                  },
                ]}
              >
                <Select
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  placeholder="Please choose an employe"
                >
                  {employeeList.map((contact) => {
                    return <Option value={contact.id}>{contact.name}</Option>;
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="amount"
                label="Amount"
                rules={[
                  {
                    required: true,
                    message: "Please enter a phone number",
                  },
                ]}
              >
                <Input placeholder="please enter amount" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="increase"
                label="Type"
                rules={[
                  {
                    required: true,
                    message: "Please enter a phone number",
                  },
                ]}
              >
                <Select placeholder="Please choose the type">
                  <Option value="true">Pay</Option>
                  <Option value="false">Receive</Option>
                </Select>
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
      );
    }
  };

  return (
    <>
      <>
        <Button
          type="primary"
          onClick={showDrawer}
          style={{ marginBottom: "10px", float: "right" }}
        >
          <PlusOutlined /> New petty cash
        </Button>
        <Drawer
          title="Create a new petty cash"
          width={720}
          onClose={onClose}
          visible={visible}
          bodyStyle={{ paddingBottom: 80 }}
        >
          {renderData()}
        </Drawer>
      </>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    ContactList: state.contacts.contacttype,
    employeeList: state.employee.employeelist,
    Auth: state.auth,
  };
};
export default connect(mapStateToProps, {
  createpettycash,
  getAllLocation,
  getAllEmployee,
})(CreateNewContact);
