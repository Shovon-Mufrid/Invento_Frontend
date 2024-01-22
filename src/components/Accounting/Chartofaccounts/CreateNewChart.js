import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import {
  createChartofaccounts,
  getAllChartofaccounts,
} from "../../../actions/chartofaccountsAction";
import {
  Form,
  Input,
  Drawer,
  Button,
  Col,
  Row,
  message,
  TreeSelect,
  InputNumber,
  Select,
} from "antd";

import { PlusOutlined } from "@ant-design/icons";

const CreateNewChart = ({
  createChartofaccounts,
  getAllChartofaccounts,
  setreload,
}) => {
  const [visible, setVisible] = useState(false);
  const [List, setList] = useState([]);
  const [loading, setloading] = useState(true);
  const [form] = Form.useForm();
  const { Option } = Select;

  const showDrawer = () => {
    getAllChartofaccounts().then((result) => {
      setList(result);
      setVisible(true);
    });
  };

  const onClose = () => {
    form.resetFields();
    setVisible(false);
  };

  const onFinish = async (values) => {
    createChartofaccounts(values).then((result) => {
      if (result) {
        setreload(true);
        form.resetFields();
        setloading(true);
        setVisible(false);
      } else {
        message.warning("Couldn't add new account");
      }
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
          <PlusOutlined /> New account
        </Button>
        <Drawer
          title="Add new account"
          width={400}
          onClose={onClose}
          visible={visible}
          bodyStyle={{ paddingBottom: 80 }}
        >
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="account_name"
                  label="Account Name"
                  rules={[
                    { required: true, message: "Please enter Account Name" },
                  ]}
                >
                  <Input placeholder="Please enter Account Name" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="account_code"
                  label="Account Code"
                  rules={[
                    {
                      required: true,
                      message: "Please enter Account Code",
                    },
                  ]}
                >
                  <InputNumber
                    style={{ width: "100%" }}
                    placeholder="Please enter Account Code"
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="Financial_statement"
                  label="Financial Statement"
                  rules={[
                    {
                      required: true,
                      message: "Please enter Financial Statement",
                    },
                  ]}
                >
                  <Select placeholder="Select a option">
                    <Option value="Balance sheet">Balance sheet</Option>
                    <Option value="Income statement">Income statement</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item name="group" label="Group">
                  <TreeSelect treeData={List} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="sub_group" label="Sub group">
                  <TreeSelect treeData={List} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="normally_Debit"
                  label="Normality (on increase)"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select placeholder="Select a option">
                    <Option value="Debit">Debit</Option>
                    <Option value="Credit">Credit</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item>
              <Button
                onClick={() => {
                  form.resetFields();
                }}
                style={{ marginRight: 8 }}
              >
                Clear
              </Button>
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

export default connect(null, { createChartofaccounts, getAllChartofaccounts })(
  CreateNewChart
);
