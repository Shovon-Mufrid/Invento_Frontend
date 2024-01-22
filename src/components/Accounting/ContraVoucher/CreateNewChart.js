import React, { useState, useEffect, useRef } from "react";

import { connect } from "react-redux";
// import history from "../../../history";

import { createcontravoucher } from "../../../actions/accounting/ContraVoucher";

import {
  getAllAccount,
  getSpecificAccount,
} from "../../../actions/accountsAction";
import { getAllLocation } from "../../../actions/warehouseAction";
import { getAllEmployee } from "../../../actions/employeeAction";
import {
  Layout,
  Breadcrumb,
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
  Divider,
  AutoComplete,
} from "antd";

const { Content } = Layout;

const CreateNewChart = ({
  createChartofaccounts,
  getAllChartofaccounts,
  getAllAccount,
  setreload,
  getAllLocation,
  getAllEmployee,
  createcontravoucher,
  Auth,
}) => {
  const [List, setList] = useState([]);
  const [accountList, setaccountList] = useState([]);
  const [locationList, setlocationList] = useState([]);
  const [employeeList, setemployeeList] = useState([]);
  const [loading, setloading] = useState(true);
  const [form] = Form.useForm();
  const voucherno = useRef(0);
  const branch = useRef(null);
  const employee = useRef(Auth.profile.id);
  const contacttype = useRef("Open");
  const creditamount = useRef("");
  const debitamount = useRef("");
  const amount = useRef("");
  const selectedFromAccount = useRef(null);
  const selectedFromAccountName = useRef("");
  const selectedFromAccountType = useRef("");
  const selectedFromAccountAddress = useRef("");
  const selectedFromAccountNo = useRef("");
  const selectedFromAccountAmount = useRef("");
  const selectedToAccount = useRef(null);
  const selectedToAccountName = useRef("");
  const selectedToAccountType = useRef("");
  const selectedToAccountAddress = useRef("");
  const selectedToAccountNo = useRef("");
  const selectedToAccountAmount = useRef("");
  const fromAmount = useRef(0);
  const toAmount = useRef(0);
  const narration = useRef("");

  const cartlist = useRef([]);

  const { Option } = Select;
  var currentdate = new Date();

  useEffect(() => {
    amount.current = 0;
    creditamount.current = 0;
    debitamount.current = 0;
    cartlist.current.map((list, index) => {
      if (list.type == "Credit") {
        creditamount.current = creditamount.current + parseFloat(list.amount);
      } else {
        debitamount.current = debitamount.current + parseFloat(list.amount);
      }
      amount.current = parseFloat(amount.current) + parseFloat(list.amount);
    });
    setloading(false);
  }, [loading]);
  useEffect(() => {
    var invoiceNumber =
      currentdate.getDate().toString() +
      (currentdate.getMonth() + 1).toString() +
      currentdate.getFullYear().toString() +
      currentdate.getHours().toString() +
      currentdate.getMinutes().toString() +
      currentdate.getSeconds().toString();
    voucherno.current = invoiceNumber;
    getAllAccount().then((result) => {
      setaccountList(result);
    });
    getAllLocation().then((result) => {
      setlocationList(result);
    });
    getAllEmployee().then((result) => {
      // console.log(result);
      setemployeeList(result);
    });
  }, []);

  return (
    <>
      <>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Accounting</Breadcrumb.Item>
          <Breadcrumb.Item>Contra voucher</Breadcrumb.Item>
          <Breadcrumb.Item>Create</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background main-frame">
          <h2 style={{ textAlign: "center" }}>Contra voucher</h2>
          <Row>
            <Col span={24} style={{ textAlign: "left" }}>
              <table className="voucher_table_title">
                <tr>
                  <td style={{ width: "45%" }}>
                    <b>Voucher No. </b>
                  </td>
                  <td> {voucherno.current}</td>
                </tr>
                <tr>
                  <td>
                    <b>*Branch</b>
                  </td>
                  <td style={{ width: "70%" }}>
                    <Select
                      style={{ minWidth: "200px" }}
                      onChange={(value) => {
                        branch.current = value;
                      }}
                    >
                      {locationList.map((item) => {
                        if (item.is_office) {
                          return <Option value={item.id}>{item.name}</Option>;
                        }
                      })}
                    </Select>
                  </td>
                </tr>
                {/* <tr>
                        <td>
                          <b>*Created by </b>
                        </td>
                        <td>
                          <Select
                            style={{ minWidth: "200px" }}
                            onChange={(value) => {
                              employee.current = value;
                            }}
                          >
                            {employeeList.map((item) => {
                              return (
                                <Option value={item.id}>{item.name}</Option>
                              );
                            })}
                          </Select>
                        </td>
                      </tr> */}
              </table>
            </Col>
          </Row>
          <Divider />
          <table className="voucher_table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Account</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>From</td>
                <td>
                  <Select
                    showSearch
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    style={{ width: "100%" }}
                    placeholder="Select a Account"
                    onChange={(value) => {
                      console.log(value);
                      selectedFromAccount.current = value;
                      accountList.find((item) => {
                        if (item.id == value) {
                          console.log(item);
                          selectedFromAccountName.current = item.name;
                          selectedFromAccountType.current = item.type;
                          selectedFromAccountAddress.current = item.address;
                          selectedFromAccountNo.current = item.account_no;
                          selectedFromAccountAmount.current = item.cash;
                          setloading(true);
                        }
                      });
                    }}
                  >
                    {accountList.map((item) => {
                      return <Option value={item.id}>{item.name}</Option>;
                    })}
                  </Select>
                </td>

                <td style={{ width: "15%" }}>
                  <InputNumber
                    value={fromAmount.current}
                    onChange={(value) => {
                      fromAmount.current = value;
                      toAmount.current = value;
                      setloading(true);
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td>To</td>
                <td>
                  <Select
                    showSearch
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    style={{ width: "100%" }}
                    placeholder="Select a Account"
                    onChange={(value) => {
                      console.log(value);
                      selectedToAccount.current = value;
                      accountList.find((item) => {
                        if (item.id == value) {
                          console.log(item);
                          selectedToAccountName.current = item.name;
                          selectedToAccountType.current = item.type;
                          selectedToAccountAddress.current = item.address;
                          selectedToAccountNo.current = item.account_no;
                          selectedToAccountAmount.current = item.cash;
                          setloading(true);
                        }
                      });
                    }}
                  >
                    {accountList.map((item) => {
                      return <Option value={item.id}>{item.name}</Option>;
                    })}
                  </Select>
                </td>

                <td style={{ width: "25%" }}>
                  <InputNumber value={toAmount.current} disabled={true} />
                </td>
              </tr>
              <tr>
                <td>Narration</td>
                <td>
                  <Input
                    value={narration.current}
                    onChange={(e) => {
                      narration.current = e.target.value;
                      setloading(true);
                    }}
                  />
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={1.5}>
                  From 
                  {/* {selectedFromAccountName.current} (
                  {selectedFromAccountNo.current}) */}
                  <br />
                  {selectedFromAccountType.current} -{" "}
                  {selectedFromAccountAddress.current}
                  <br />
                  {selectedFromAccountAmount.current} Tk
                </td>
                <td colSpan={1.5}>
                  To 
                   {/* {selectedToAccountName.current} (
                  {selectedToAccountNo.current}) */}
                  <br />
                  {selectedToAccountType.current} -{" "}
                  {selectedToAccountAddress.current}
                  <br />
                  {selectedToAccountAmount.current} Tk
                </td>
              </tr>
            </tfoot>
          </table>

          <Row style={{ float: "right", margin: "5px auto" }}>
            <Button
              type="primary"
              onClick={() => {
                if (branch.current > 0 && employee.current > 0) {
                  let formData = new FormData();
                  formData.append("voucher_number", voucherno.current);
                  formData.append("location", branch.current);
                  formData.append("employee", employee.current);
                  formData.append("narration", narration.current);
                  formData.append("amount", fromAmount.current);
                  formData.append("accountFrom", selectedFromAccount.current);
                  formData.append("accountTo", selectedToAccount.current);
                  createcontravoucher(formData).then((result) => {
                    window.location.href = "/accounting/contravoucher";
                    // history.push("/accounting/contravoucher");
                  });
                } else {
                  message.warning("Please fill up all the required fields");
                }
              }}
            >
              Submit
            </Button>
          </Row>
          <Divider />
        </div>
      </>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    Auth: state.auth,
  };
};

export default connect(mapStateToProps, {
  getAllAccount,
  getSpecificAccount,
  getAllLocation,
  getAllEmployee,
  createcontravoucher,
})(CreateNewChart);
