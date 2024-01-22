import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import moment from "moment";
import { createEmployeeLeave } from "../../../actions/employeeLeaveActions";

import {
  Form,
  Input,
  InputNumber,
  Checkbox,
  DatePicker,
  Drawer,
  TreeSelect,
  Button,
  Col,
  Row,
  Select,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const CreateNewEmployeeLeave = ({
  createEmployeeLeave,
  employeeList,
  leaveType,
  updatelist,
  setUpdatelist,
}) => {
  const initial = { remarks: "" };
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const dateFormat = "YYYY-MM-DD";
  const [leaveStart, setLeaveStart] = useState(null);
  const [leaveEnd, setLeaveEnd] = useState(null);
  const [totalLeave, setTotalLeave] = useState(null);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    form.resetFields();
    setVisible(false);
  };

  const onFinish = (values) => {
    const value = {
      ...values,
      leaveStart: values["leaveStart"].format("YYYY-MM-DD"),
      leaveEnd: values["leaveEnd"].format("YYYY-MM-DD"),
    };
    createEmployeeLeave(value);
    form.resetFields();
    setUpdatelist(false);
    setVisible(false);
  };

  useEffect(() => {
    const startDate = moment(leaveStart);
    const timeEnd = moment(leaveEnd);
    const diff = timeEnd.diff(startDate);
    const diffDuration = moment.duration(diff);
    const days = diffDuration.days() + 1;

    setTotalLeave(days);
    // console.log(days);
    form.setFieldsValue({ leaveDays: days });
  }, [leaveStart, leaveEnd]);

  const onStartChage = (value) => {
    setLeaveStart(value);
  };
  const onEndChage = (value) => {
    setLeaveEnd(value);
  };

  // console.log(employeeList);
  return (
    <>
      <>
        <Button
          type="primary"
          onClick={showDrawer}
          style={{ marginBottom: "10px", float: "right" }}
        >
          <PlusOutlined /> New Employee Leave
        </Button>
        <Drawer
          title="Create a new Employee Leave"
          width={400}
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
                <Form.Item
                  name="employee"
                  label="Employee"
                  rules={[
                    {
                      required: true,
                      message: "Please select a Employee",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Please choose an employee"
                    style={{ fontWeight: "400" }}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {employeeList.map((employee) => {
                      return (
                        <Option value={employee.id}>{employee.name}</Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="leaveType"
                  label="Leave Type"
                  rules={[
                    {
                      required: true,
                      message: "Please select Leave Category",
                    },
                  ]}
                >
                  <TreeSelect treeData={leaveType} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="leaveStart"
                  label="Leave Start From"
                  rules={[
                    {
                      required: true,
                      message: "Please enter Leave Starting Date",
                    },
                  ]}
                >
                  <DatePicker format={dateFormat} onChange={onStartChage} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="leaveEnd"
                  label="Leave End On"
                  rules={[
                    {
                      required: true,
                      message: "Please enter Leave Ending Date",
                    },
                  ]}
                >
                  <DatePicker format={dateFormat} onChange={onEndChage} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={24}>
                <Form.Item name="leaveDays" label="Total Days">
                  <Input
                    disabled={true}
                    defaultValue={totalLeave}
                    placeholder="Please enter Total Leave Days"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item name="note" label="Note">
                  <Input.TextArea rows={4} placeholder="please enter Details" />
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
    employeeList: state.employee.employeelist,
    leaveType: state.leaveType.leaveTypelist,
  };
};

export default connect(mapStateToProps, { createEmployeeLeave })(
  CreateNewEmployeeLeave
);
