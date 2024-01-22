import React, { useState } from "react";
import { connect } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { createworkstationsitem } from "../../../actions/Manufacturing/workstationsitemAction";
import { getAllworkstations } from "../../../actions/Manufacturing/workstationsAction";
import { getAllproductionlines } from "../../../actions/Manufacturing/productionlinesAction";

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
var orderno =
  currentdate.getDate().toString() +
  (currentdate.getMonth() + 1).toString() +
  currentdate.getFullYear().toString() +
  currentdate.getHours().toString() +
  currentdate.getMinutes().toString() +
  currentdate.getSeconds().toString();

const Create = ({
  createworkstationsitem,
  getAllworkstations,
  getAllproductionlines,
  setUpdatelist,
  ContactList,
  updatelist,
}) => {
  const initial = { description: "" };
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [workstation, setworkstation] = useState([]);
  const [productionline, setproductionline] = useState([]);

  const showDrawer = () => {
    getAllworkstations().then((res) => {
      setworkstation(res);
      getAllproductionlines().then((result) => {
        setproductionline(result);
        setVisible(true);
      });
    });
  };

  const onClose = () => {
    form.resetFields();
    setVisible(false);
  };

  const onFinish = (values) => {
    createworkstationsitem(values).then((res) => {
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
          type="primary"
          onClick={showDrawer}
          style={{ marginBottom: "10px", float: "right" }}
        >
          <PlusOutlined /> New Process
        </Button>
        <Drawer
          title="Add new process"
          width="40%"
          onClose={onClose}
          visible={visible}
          bodyStyle={{ paddingBottom: 80 }}
        >
          {/* {renderItem()} */}
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={initial}
          >
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item name="ProductionLine" label="Production Line">
                  <Select placeholder="Please choose a production line">
                    {productionline.map((item) => {
                      if (item.status === "Initial") {
                        return (
                          <Option key={item.id} value={item.id}>
                            {item.line_name}
                          </Option>
                        );
                      }
                    })}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={24}>
                <Form.Item name="Workstation" label="Workstation">
                  <Select placeholder="Please choose a workstation">
                    {workstation.map((item) => (
                      <Option key={item.id} value={item.id}>
                        {item.workstation_name}
                      </Option>
                    ))}
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
  createworkstationsitem,
  getAllworkstations,
  getAllproductionlines,
})(Create);
