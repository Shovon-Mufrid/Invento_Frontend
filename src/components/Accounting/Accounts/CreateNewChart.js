import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { createAccount, getAllAccount } from "../../../actions/accountsAction";
import { getaccountsparent } from "../../../actions/settings";
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
  createAccount,
  getAllAccount,
  setreload,
  reload,
  getaccountsparent,
}) => {
  const [visible, setVisible] = useState(false);
  const [List, setList] = useState([]);
  const [accounts, setaccounts] = useState([]);
  const [loading, setloading] = useState(true);
  const [form] = Form.useForm();
  const { Option } = Select;

  const showDrawer = () => {
    getaccountsparent().then((result) => {
      console.log(result);
      setaccounts(result);
    });
    setVisible(true);
  };

  const onClose = () => {
    form.resetFields();
    setVisible(false);
  };

  const onFinish = async (values) => {
    createAccount(values).then((result) => {
      if (result) {
        setreload(!reload);
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
                  name="name"
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
                <Form.Item name="account_no" label="Account Number">
                  <Input
                    style={{ width: "100%" }}
                    placeholder="Please enter Account Code"
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="type"
                  label="Account type"
                  rules={[
                    {
                      required: true,
                      message: "Please enter Financial Statement",
                    },
                  ]}
                >
                  <Select placeholder="Select a option">
                    <Option value="Cash">Cash</Option>
                    <Option value="Bank">Bank</Option>
                    <Option value="Mobile banking">Mobile banking</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="accountparent" label="Parent">
                  <Select placeholder="Select a option">
                    {accounts.map((account) => {
                      return <Option value={account.id}>{account.name}</Option>;
                    })}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="cash" label="Opening balance">
                  <InputNumber
                    defaultValue="0"
                    style={{ width: "100%" }}
                    placeholder="Please enter an opening balance"
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="txnCharge" label="Transaction Charge">
                  <InputNumber
                    defaultValue="0"
                    style={{ width: "100%" }}
                    placeholder="Please enter an Transaction Charge"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item name="address" label="Address">
                  <Input />
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

export default connect(null, {
  createAccount,
  getAllAccount,
  getaccountsparent,
})(CreateNewChart);
