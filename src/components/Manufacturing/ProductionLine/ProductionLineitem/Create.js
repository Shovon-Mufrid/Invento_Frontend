import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { createproductionlinesitem } from "../../../../actions/Manufacturing/productionlinesitemAction";
import {
  getAllWorkorder,
  getAllWorkorderbyfilter,
} from "../../../../actions/Manufacturing/workorderAction";
import { getAllWorkorderitembyfilter } from "../../../../actions/Manufacturing/workorderitemAction";

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

var currentdate = new Date();

const Create = ({
  createproductionlinesitem,
  getAllWorkorder,
  getAllWorkorderbyfilter,
  getAllWorkorderitembyfilter,
  setUpdatelist,
  ContactList,
  updatelist,
  details,
}) => {
  const initial = { description: "" };
  const [visible, setVisible] = useState(false);
  const [workorder, setworkorder] = useState([]);
  const [workorderitem, setworkorderitem] = useState([]);
  const selectedworkorder = useRef("");
  const [reload, setreload] = useState(false);
  const [loading, setloading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (selectedworkorder.current != "") {
      setloading(true);
      getAllWorkorderitembyfilter(selectedworkorder.current).then((result) => {
        setworkorderitem(result);
        setloading(false);
      });
    }
  }, [reload]);

  const showDrawer = () => {
    getAllWorkorderbyfilter("", "", "Pending").then((result) => {
      setworkorder(result);
      setVisible(true);
    });
  };

  const onClose = () => {
    form.resetFields();
    setVisible(false);
  };

  const onFinish = (values) => {
    values["ProductionLine"] = details.id;
    values["status"] = "Pending";
    createproductionlinesitem(values).then((res) => {
      form.resetFields();
      setUpdatelist(!updatelist);
      // message.success(values.name + " Has been added to your contact list");
      setVisible(false);
    });
  };

  return (
    <>
      <>
        <Button
          type="link"
          onClick={showDrawer}
          style={{ marginBottom: "10px", float: "right" }}
        >
          <PlusOutlined /> Assign new work order
        </Button>
        <Drawer
          title="Assign new work order"
          width="40%"
          onClose={onClose}
          visible={visible}
          bodyStyle={{ paddingBottom: 80 }}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={initial}
          >
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item name="Workorder" label="Workorder">
                  <Select
                    placeholder="Please choose a workorder"
                    onChange={(event) => {
                      selectedworkorder.current = event;
                      form.setFieldsValue({ WorkOrderItem: "" });
                      setreload(!reload);
                    }}
                  >
                    {workorder.map((item) => (
                      <Option key={item.id} value={item.id}>
                        {item.order_name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={24}>
                <Form.Item name="WorkOrderItem" label="Workorder Item">
                  <Select placeholder="Please choose a workorder item">
                    {workorderitem.map((item) => (
                      <Option key={item.id} value={item.id}>
                        {item.description}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item name="capacity" label="Capacity">
                  <InputNumber placeholder="Capacity" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="start_date" label="Start Date">
                  <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="end_date" label="End Date">
                  <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
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
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    ContactList: state.contacts.contacttype,
  };
};

export default connect(null, {
  createproductionlinesitem,
  getAllWorkorder,
  getAllWorkorderitembyfilter,
  getAllWorkorderbyfilter,
})(Create);
