import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { createContactfromOrder } from "../../../actions/contactAction";
import { getcontacttype } from "../../../actions/settings";
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
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const CustomerDetails = ({ ContactList, Auth, contactDefaultValue }) => {
  return (
    <>
      <>
        <Row gutter={16}>
          <Col
            sm={{
              span: 24,
            }}
            lg={{
              span: 12,
            }}
          >
            <Form.Item name="name" label="Name">
              <Input placeholder="Please enter user name" />
            </Form.Item>
          </Col>
          <Col
            sm={{
              span: 24,
            }}
            lg={{
              span: 12,
            }}
          >
            <Form.Item name="email" label="Email">
              <Input
                style={{ width: "100%" }}
                addonBefore="@"
                placeholder="Please enter Email"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col
            sm={{
              span: 24,
            }}
            lg={{
              span: 12,
            }}
          >
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

          <Col
            sm={{
              span: 24,
            }}
            lg={{
              span: 12,
            }}
          >
            <Form.Item name="role" label="Type">
              <Select
                placeholder="Please choose the type"
                defaultValue={contactDefaultValue.current}
                disabled={
                  Auth.profile.Office == 13 || Auth.profile.Office == 11
                    ? true
                    : false
                }
                onChange={(value) => {
                  contactDefaultValue.current = value;
                }}
                style={{ width: "100%" }}
              >
                {ContactList.map((contact) => {
                  if (contact.Type == "Customer") {
                    return <Option value={contact.id}>{contact.name}</Option>;
                  }
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col
            sm={{
              span: 24,
            }}
            lg={{
              span: 12,
            }}
          >
            <Form.Item name="Special_Date_Type" label="Special Date Type">
              <Select
                placeholder="Please choose the type"
                style={{ width: "100%" }}
              >
                <Option value="Birthday">Birthday</Option>
                <Option value="Wedding">Wedding</Option>
                <Option value="Anniversary">Anniversary</Option>
                <Option value="Others">Others</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col
            sm={{
              span: 24,
            }}
            lg={{
              span: 12,
            }}
          >
            <Form.Item name="special_dates" label="Special Date">
              <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col
            sm={{
              span: 24,
            }}
            lg={{
              span: 12,
            }}
          >
            <Form.Item name="address" label="Address">
              <Input placeholder="please enter Address" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col
            sm={{
              span: 24,
            }}
            lg={{
              span: 12,
            }}
          >
            <Form.Item name="remarks" label="Remarks">
              <ReactQuill theme="snow" />
            </Form.Item>
          </Col>
        </Row>
        {/* <Row gutter={16}>
          <Col span={24}>
            <Form.Item name="is_active" valuePropName="checked" checked>
              <Checkbox>Active contact !</Checkbox>
            </Form.Item>
          </Col>
        </Row> */}
      </>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    // ContactList: state.contacts.contacttype,
    Auth: state.auth,
  };
};

export default connect(mapStateToProps, {
  createContactfromOrder,
  getcontacttype,
})(CustomerDetails);
