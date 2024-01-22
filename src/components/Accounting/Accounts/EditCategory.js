import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import {
  updateAccount,
  getSpecificAccount,
  deleteAccount,
} from "../../../actions/accountsAction";
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
  Skeleton,
  Popconfirm,
} from "antd";

import { PlusOutlined } from "@ant-design/icons";

const CreateNewChart = ({
  updateAccount,
  getSpecificAccount,
  getaccountsparent,
  deleteAccount,
  setreload,
  id,
  reload,
}) => {
  const [visible, setVisible] = useState(false);
  const [loading, setloading] = useState(true);
  const [data, setdata] = useState([]);
  const [accounts, setaccounts] = useState([]);

  const [form] = Form.useForm();
  const { Option } = Select;

  const showDrawer = () => {
    getaccountsparent().then((result) => {
      console.log(result);
      setaccounts(result);
    });
    getSpecificAccount(id).then((e) => {
      setdata(e);
      setloading(false);
      setVisible(true);
    });
  };

  function confirm(e) {
    deleteAccount(id).then((e) => {
      setdata([]);
      setloading(true);
      form.resetFields();
      setVisible(false);
      setreload(!reload);
    });
  }

  const onClose = () => {
    form.resetFields();
    setloading(true);
    setVisible(false);
  };

  const onFinish = async (values) => {
    updateAccount(data.id, values).then((result) => {
      if (result) {
        setdata([]);
        setloading(true);
        form.resetFields();
        setVisible(false);
        setreload(!reload);
      } else {
        message.warning("Couldn't update");
      }
    });
  };

  const rendercontent = () => {
    if (loading) {
      return <Skeleton active />;
    } else {
      return (
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={data}
        >
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
            {/* <Col span={24}>
              <Form.Item name="cash" label="Opening balance">
                <InputNumber
                  defaultValue="0"
                  style={{ width: "100%" }}
                  placeholder="Please enter an opening balance"
                />
              </Form.Item>
            </Col> */}
            <Col span={24}>
              <Form.Item name="txnCharge" label="Transaction Charge">
                <InputNumber
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
            <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
              Submit
            </Button>
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>

            <Popconfirm
              title="Are you sure to delete this account ? All data will be removed if you do."
              onConfirm={confirm}
              // onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button type="default" danger style={{ marginRight: 8 }}>
                Delete
              </Button>
            </Popconfirm>
          </Form.Item>
        </Form>
      );
    }
  };

  return (
    <>
      <>
        <Button
          type="link"
          onClick={showDrawer}
          style={{ marginBottom: "10px" }}
        >
          Edit
        </Button>
        <Drawer
          title="Edit"
          width={400}
          onClose={onClose}
          visible={visible}
          bodyStyle={{ paddingBottom: 80 }}
        >
          {rendercontent()}
        </Drawer>
      </>
    </>
  );
};

export default connect(null, {
  updateAccount,
  getSpecificAccount,
  deleteAccount,
  getaccountsparent,
})(CreateNewChart);
