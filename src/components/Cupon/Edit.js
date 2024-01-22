import React, { useState } from "react";
import { connect } from "react-redux";
import ReactQuill from "react-quill";
import moment from "moment";
import "react-quill/dist/quill.snow.css";

import { updateCupon } from "../../actions/cupon";
import {
  Form,
  Input,
  Drawer,
  Button,
  Col,
  Row,
  Select,
  InputNumber,
  DatePicker,
  Divider,
} from "antd";

const { Option } = Select;

const Edit = ({ detail, setUpdatelist, updateCupon }) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const details = { ...detail };
  details.start = moment(details.start);
  details.end = moment(details.end);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onFinish = (values) => {
    updateCupon(details.id, values);
    setUpdatelist(true);
    setVisible(false);
  };
  const renderData = () => {
    if (visible) {
      return (
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={details}
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: "Please enter user name" }]}
              >
                <Input placeholder="Please enter user name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="ref_type"
                label="Type"
                rules={[{ required: true, message: "Please choose the type" }]}
              >
                <Select placeholder="Please choose the type">
                  <Option value="P">Percentage</Option>
                  <Option value="A">Amount</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="amount"
                label="Amount"
                rules={[{ required: true, message: "Please insert an amount" }]}
              >
                <InputNumber placeholder="please enter an amount" />
              </Form.Item>
            </Col>
          </Row>
          <Divider />
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="start"
                label="Start"
                rules={[{ required: true }]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }}
                  format="YYYY-MM-DD HH:mm:ss"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="end" label="End" rules={[{ required: true }]}>
                <DatePicker
                  style={{ width: "100%" }}
                  showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }}
                  format="YYYY-MM-DD HH:mm:ss"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="limit_type"
                label="Limit Type"
                rules={[
                  { required: true, message: "Please choose a limit type" },
                ]}
              >
                <Select placeholder="Please choose a limit type">
                  <Option value="Unlimited">Unlimited</Option>
                  <Option value="limited">Fixed limit amount</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="limit" label="Limit Amount">
                <InputNumber
                  // defaultValue={0}
                  placeholder="please enter a limit amount"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="status"
                label="Status"
                rules={[
                  { required: true, message: "Please choose the Status" },
                ]}
              >
                <Select placeholder="Please choose the type">
                  <Option value="Active">Active</Option>
                  <Option value="Deactivated">Deactivated</Option>
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
      <Button type="primary" onClick={showDrawer}>
        Edit
      </Button>

      <Drawer
        title="Edit coupon"
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        {renderData()}
      </Drawer>
    </>
  );
};

export default connect(null, { updateCupon })(Edit);
