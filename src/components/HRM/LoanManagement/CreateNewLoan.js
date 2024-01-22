import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getAllEmployee } from "../../../actions/employeeAction";
import { createEmployeeLoan } from "../../../actions/loanManagementAction";
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

const CreateNewEmployeeLoan = ({
  getAllEmployee,
  createEmployeeLoan,
  employeeList,
  updatelist,
  setUpdatelist,
}) => {
  const initial = { remarks: "" };
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [payableAmountDisabled, setpayableAmountDisabled] = useState(true);
  const [payableMonthDisabled, setpayableMonthDisabled] = useState(false);
  const [loanAmountValue, setLoanAmountValue] = useState(0);
  const [loanPayableMonths, setLoanPayableMonths] = useState(0);
  const dateFormat = "YYYY-MM-DD";
  const showDrawer = () => {
    setVisible(true);
  };
  useEffect(() => {
    if (visible) {
      getAllEmployee();
      setUpdatelist(true);
    }
  }, [updatelist, setUpdatelist]);
  const onClose = () => {
    form.resetFields();
    setVisible(false);
  };

  const onFinish = (values) => {
    createEmployeeLoan(values);
    form.resetFields();
    setUpdatelist(false);
    setVisible(false);
  };
  const loanAmountChange = (value) => {
    //console.log(value);
    setLoanAmountValue(value);
  };

  useEffect(() => {
    //console.log("loanAmount", loanAmountValue);
    //console.log("loanPayableMonths", loanPayableMonths);
    let payableAmount = parseFloat(loanAmountValue / loanPayableMonths).toFixed(
      2
    );
    form.setFieldsValue({
      loanPayableAmount: payableAmount == NaN ? 0 : payableAmount,
    });
  }, [loanAmountValue, loanPayableMonths]);

  const loanPayableMonthChange = (value) => {
    //console.log("loanPayableMonths", value);
    setLoanPayableMonths(value);
  };
  const loanPayableType = (value) => {
    if (value === "emi") {
      setpayableMonthDisabled(false);
    } else {
      setLoanPayableMonths(1);
      form.setFieldsValue({
        loanPayableMonths: 1,
      });
      setpayableMonthDisabled(true);
    }
  };
  return (
    <>
      <>
        <Button
          type="primary"
          onClick={showDrawer}
          style={{ marginBottom: "10px", float: "right" }}
        >
          <PlusOutlined /> New Employee Loan
        </Button>
        <Drawer
          title="Create a new Employee Loan"
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
              <Col span={12}>
                <Form.Item
                  name="loanType"
                  label="Type"
                  rules={[{ required: true, message: "Please Update Type" }]}
                >
                  <Select
                    placeholder="Please choose Type"
                    onChange={loanPayableType}
                  >
                    <Option value="emi">EMI</Option>
                    <Option value="advance">Advance</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="loanAmount"
                  label="Loan Amount"
                  rules={[
                    { required: true, message: "Please enter Loan Amount" },
                  ]}
                >
                  <Input
                    placeholder="Please enter Loan Amount"
                    onChange={(e) => loanAmountChange(e.target.value)}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="loanPayableMonths"
                  label="Loan Payable Month"
                  rules={[
                    {
                      required: true,
                      message: "Please enter Loan Payable Month",
                    },
                  ]}
                >
                  <Input
                    disabled={payableMonthDisabled}
                    placeholder="Please enter Loan Payable Month"
                    onChange={(e) => loanPayableMonthChange(e.target.value)}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="loanPayableAmount"
                  label="Payable Each Month"
                  rules={[
                    {
                      required: true,
                      message: "Please enter Loan Payable Amount",
                    },
                  ]}
                >
                  <Input
                    disabled={payableAmountDisabled}
                    placeholder="Please enter Loan Payable Amount"
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
  };
};

export default connect(mapStateToProps, { createEmployeeLoan, getAllEmployee })(
  CreateNewEmployeeLoan
);
