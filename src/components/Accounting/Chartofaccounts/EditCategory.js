import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import {
  updateChartofaccounts,
  getAllChartofaccounts,
  getSpecificChartofaccounts,
  deleteChartofaccounts,
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
  Skeleton,
  Popconfirm,
} from "antd";

import { PlusOutlined } from "@ant-design/icons";

const CreateNewChart = ({
  updateChartofaccounts,
  getAllChartofaccounts,
  getSpecificChartofaccounts,
  deleteChartofaccounts,
  setreload,
  id,
  reload,
}) => {
  const [visible, setVisible] = useState(false);
  const [loading, setloading] = useState(true);
  const [data, setdata] = useState([]);
  const [List, setList] = useState([]);
  const [form] = Form.useForm();
  const { Option } = Select;

  const showDrawer = () => {
    getSpecificChartofaccounts(id).then((e) => {
      getAllChartofaccounts().then((result) => {
        setdata(e);
        setList(result);
        setloading(false);
        setVisible(true);
      });
    });
  };

  function confirm(e) {
    deleteChartofaccounts(id).then((e) => {
      setdata([]);
      setloading(true);
      form.resetFields();
      setVisible(false);
      setreload(true);
    });
  }

  const onClose = () => {
    form.resetFields();
    setloading(true);
    setVisible(false);
  };

  const onFinish = async (values) => {
    updateChartofaccounts(data.id, values).then((result) => {
      if (result) {
        setdata([]);
        setloading(true);
        form.resetFields();
        setVisible(false);
        setreload(true);
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
            {/* <Col span={24}>
              <Form.Item name="amount" label="Amount">
                <InputNumber />
              </Form.Item>
            </Col> */}
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
          // style={{ marginBottom: "10px", float: "right" }}
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
  updateChartofaccounts,
  getAllChartofaccounts,
  getSpecificChartofaccounts,
  deleteChartofaccounts,
})(CreateNewChart);
