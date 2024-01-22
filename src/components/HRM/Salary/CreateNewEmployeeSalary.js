import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getAllEmployee } from "../../../actions/employeeAction";
import { createEmployeeSalary } from "../../../actions/employeeSalaryActions";
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
  createEmployeeSalary,
  getAllEmployee,
  employeeList,
  updatelist,
  setUpdatelist,
}) => {
  const initial = { remarks: "" };
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const dateFormat = "YYYY-MM-DD";

  useEffect(() => {
    getAllEmployee();
    setUpdatelist(true);
  }, [updatelist, setUpdatelist]);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    form.resetFields();
    setVisible(false);
  };

  const onFinish = (values) => {
    createEmployeeSalary(values);
    form.resetFields();
    setUpdatelist(false);
    setVisible(false);
  };

  //console.log(employeeList);
  return (
    <>
      <>
        <Button
          type="primary"
          onClick={showDrawer}
          style={{ marginBottom: "10px", float: "right" }}
        >
          <PlusOutlined /> New Employee Salary
        </Button>
        <Drawer
          title="Create a new Employee Salary"
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
                      message: "Please select A Employee",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Please choose an Employee"
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
                  name="monthlySalary"
                  label="Basic Salary"
                  rules={[
                    { required: true, message: "Please enter Basic Salary" },
                  ]}
                >
                  <Input placeholder="Please enter Basic Salary" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="dailyAllowance"
                  label="Daily Allowance"
                  rules={[
                    { required: true, message: "Please enter Daily Allowance" },
                  ]}
                >
                  <Input placeholder="Please enter Daily Allowance" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="incentive"
                  label="Incentive"
                  rules={[
                    { required: true, message: "Please enter Incentive" },
                  ]}
                >
                  <Input placeholder="Please enter Incentive" />
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
  };
};

export default connect(mapStateToProps, {
  createEmployeeSalary,
  getAllEmployee,
})(CreateNewEmployeeLeave);
