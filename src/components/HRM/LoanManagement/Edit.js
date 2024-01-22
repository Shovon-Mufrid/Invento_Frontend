import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import moment from "moment";
import { updateEmployeeLoan } from "../../../actions/loanManagementAction";
import { getAllAccount } from "../../../actions/accountsAction";

import {
  Form,
  Input,
  Drawer,
  DatePicker,
  TreeSelect,
  Button,
  Col,
  Row,
  Select,
} from "antd";

const { Option } = Select;

const Edit = ({
  details,
  employeeList,
  leaveType,
  setUpdatelist,
  updatelist,
  updateEmployeeLoan,
  Auth,
  accountList,
  getAllAccount,
}) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const payableAmountDisabled = useRef(true);
  const [loanAmountValue, setLoanAmountValue] = useState(details.loanAmount);
  const [loanPayableMonths, setLoanPayableMonths] = useState(
    details.loanPayableMonths
  );
  //details['leaveStart'] = details['leaveStart'].format('YYYY-MM-DD');
  //details['leaveEnd'] = details['leaveEnd'].format('YYYY-MM-DD');
  const loan = useRef({
    PaymentMethod: "Cash",
    AccountNumber: "",
    amount: 0,
  });
  const showDrawer = () => {
    getAllAccount();
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  const loanPayableMonthChange = (value) => {
    //console.log("loanPayableMonths", value);
    setLoanPayableMonths(value);
  };

  const loanAmountChange = (value) => {
    //console.log(value);
    setLoanAmountValue(value);
  };

  useEffect(() => {
    form.setFieldsValue({
      loanPayableAmount:
        loanAmountValue / loanPayableMonths == NaN
          ? 0
          : (loanAmountValue / loanPayableMonths).toFixed(2),
    });
  }, [loanAmountValue, loanPayableMonths]);

  const onFinish = (values) => {
    values["employee_id"] = details.employee.id;
    updateEmployeeLoan(details.id, values);
    setUpdatelist(false);
    setVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        Edit
      </Button>

      <Drawer
        title="Edit Employee Leave"
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={details}
        >
          {details.loanStatus != "paid" ? (
            <>
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
                    <TreeSelect treeData={employeeList} disabled />
                  </Form.Item>
                </Col>
              </Row>
            </>
          ) : null}

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="loanType"
                label="Type"
                rules={[{ required: true, message: "Please Update Type" }]}
              >
                <Select placeholder="Please choose Type">
                  <Option value="emi">EMI</Option>
                  <Option value="advance">Advance</Option>
                </Select>
              </Form.Item>
            </Col>
            {details.loanStatus != "paid" ? (
              <Col span={12}>
                <Form.Item
                  name="loanAmount"
                  label="Loan Amount"
                  rules={[
                    { required: true, message: "Please enter Loan Amount" },
                  ]}
                >
                  <Input placeholder="Please enter Loan Amount" />
                </Form.Item>
              </Col>
            ) : (
              ""
            )}
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
                  placeholder="Please enter Loan Payable Amount"
                  disabled={payableAmountDisabled.current}
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
          {details.loanStatus == "approved" ? (
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="payment_method_type"
                  label="Payment Method"
                  rules={[{ required: true, message: "Please Update Method" }]}
                >
                  <Select
                    placeholder="select a Account"
                    style={{ width: "100%" }}
                    onChange={(e) => {
                      loan.current.PaymentMethod = e;
                      loan.current.AccountNumber = "";
                      setUpdatelist(!updatelist);
                    }}
                  >
                    <Option value="Cash">Cash</Option>
                    <Option value="Bank">Bank</Option>
                    <Option value="Mobile banking">Mobile banking</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="payment_method"
                  label="Account"
                  rules={[{ required: true, message: "Please Update Type" }]}
                >
                  <Select
                    placeholder="select a Account"
                    style={{ width: "100%" }}
                  >
                    {accountList.map((account) => {
                      if (account.type == loan.current.PaymentMethod) {
                        return (
                          <Option value={account.id}>{account.name}</Option>
                        );
                      }
                    })}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          ) : (
            ""
          )}
          <Row gutter={16}>
            {details.loanStatus != "paid" ? (
              <Col span={24}>
                <Form.Item
                  name="loanStatus"
                  label="Status"
                  rules={[{ required: true, message: "Please Update Status" }]}
                >
                  <Select placeholder="Please choose Status">
                    <Option value="pending">Pending</Option>
                    {Auth.superuser ? (
                      <>
                        <Option value="approved">Approved</Option>

                        <Option value="denied">Denied</Option>
                      </>
                    ) : (
                      ""
                    )}
                    {details.loanStatus == "approved" ? (
                      <>
                        <Option value="paid">Paid</Option>
                      </>
                    ) : (
                      ""
                    )}
                  </Select>
                </Form.Item>
              </Col>
            ) : (
              ""
            )}
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
  );
};

const mapStateToProps = (state) => {
  return {
    employeeList: state.employee.employeelist,
    Auth: state.auth,
    accountList: state.accounts.accountlist,
  };
};
export default connect(mapStateToProps, { updateEmployeeLoan, getAllAccount })(
  Edit
);
