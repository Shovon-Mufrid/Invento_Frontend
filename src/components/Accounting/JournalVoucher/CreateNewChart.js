import React, { useState, useEffect, useRef } from "react";

import { connect } from "react-redux";
// import history from "../../../history";

import {
  createChartofaccounts,
  getAllChartofaccounts,
  getSpecificChartofaccounts,
  getSpecificChartofaccountsbycode,
} from "../../../actions/chartofaccountsAction";
import { createjournalvoucher } from "../../../actions/accounting/JournalVoucher";
import { createjournalvoucheritems } from "../../../actions/accounting/JournalVoucheritems";
import { createjournals } from "../../../actions/journalAction";
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
import ContctSearch from "./ContctSearch";
import EmployeeSearch from "./EmployeeSearch";
import InvoiceSearch from "./InvoiceSearch";
import PurchaseSearch from "./PurchaseSearch";

import { AmazonCircleFilled, MinusCircleFilled } from "@ant-design/icons";

const { Content } = Layout;

const CreateNewChart = ({
  createChartofaccounts,
  getAllChartofaccounts,
  getSpecificChartofaccounts,
  getSpecificAccount,
  getAllAccount,
  setreload,
  getAllLocation,
  getAllEmployee,
  createjournalvoucher,
  createjournalvoucheritems,
  createjournals,
  getSpecificChartofaccountsbycode,
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

  const selectedhead = useRef(null);
  const selectedheadcode = useRef(0);
  const selectedsubhead = useRef(null);
  const selectedpayto = useRef("");
  const selectednaration = useRef("");
  const selecteddebit = useRef(null);
  const selectedcredit = useRef(null);
  const selectednormality = useRef(null);

  const selectedpaymentname = useRef(null);
  const selectedheadname = useRef("");
  const selectedsubheadname = useRef("");
  const selectedcontactname = useRef(null);

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
    getAllChartofaccounts().then((result) => {
      setList(result);
    });
    getAllLocation().then((result) => {
      setlocationList(result);
    });
    getAllEmployee().then((result) => {
      // console.log(result);
      setemployeeList(result);
    });
  }, []);

  const onFinish = async (values) => {
    createChartofaccounts(values).then((result) => {
      if (result) {
        setreload(true);
        form.resetFields();
        setloading(true);
      } else {
        message.warning("Couldn't add new account");
      }
    });
  };

  return (
    <>
      <>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Accounting</Breadcrumb.Item>
          <Breadcrumb.Item>Journal voucher</Breadcrumb.Item>
          <Breadcrumb.Item>Create</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background main-frame">
          <h2 style={{ textAlign: "center" }}>Journal voucher</h2>
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
                            // value={Auth.profile.id}
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
                <th>Chart of accounts</th>
                <th>Group</th>
                <th>Head</th>
                {/* <th>Sub head</th> */}
                {/* <th>Debit</th>
                      <th>Credit</th> */}
                <th>Increase</th>
                <th>Decrease</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{selectedheadcode.current}</td>
                <td>
                  {selectedheadname.current
                    ? selectedheadname.current.Group[0].account_name
                    : ""}
                </td>
                <td>
                  <Select
                    showSearch
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    defaultValue={selectedhead.current}
                    style={{ width: "100%" }}
                    onChange={(value) => {
                      // console.log(value);
                      getSpecificChartofaccounts(value).then((result) => {
                        // console.log(result);
                        selectedheadcode.current = result.account_code;
                        selectedhead.current = result.id;
                        selectedheadname.current = result;
                        selectednormality.current = result.normally_Debit;
                        selectedsubhead.current = null;
                        setloading(true);
                      });
                    }}
                  >
                    {List.map((item) => {
                      if (item.group) {
                        return (
                          <Option value={item.id}>{item.account_name}</Option>
                        );
                      }
                    })}
                  </Select>
                </td>
                {/* <td>
                        {" "}
                        <Select
                          style={{ width: "100%" }}
                          value={selectedsubhead.current}
                          onChange={(value) => {
                            getSpecificChartofaccounts(value).then((result) => {
                              console.log(result);
                              selectedheadcode.current = result.account_code;
                              selectedsubheadname.current = result;
                              selectedsubhead.current = result.id;
                              selectednormality.current = result.normally_Debit;
                              setloading(true);
                            });
                          }}
                        >
                          {List.map((item) => {
                            if (item.sub_group)
                              if (item.sub_group == selectedhead.current) {
                                return (
                                  <Option value={item.id}>
                                    {item.account_name}
                                  </Option>
                                );
                              }
                          })}
                        </Select>
                      </td> */}
                <td style={{ width: "15%" }}>
                  {selectednormality.current == "Debit" ? (
                    <InputNumber
                      value={selecteddebit.current}
                      onChange={(value) => {
                        selecteddebit.current = value;
                        setloading(true);
                      }}
                    />
                  ) : (
                    <InputNumber
                      value={selectedcredit.current}
                      onChange={(value) => {
                        selectedcredit.current = value;
                        setloading(true);
                      }}
                    />
                  )}
                </td>
                <td style={{ width: "15%" }}>
                  {selectednormality.current != "Debit" ? (
                    <InputNumber
                      value={selecteddebit.current}
                      onChange={(value) => {
                        selecteddebit.current = value;
                        setloading(true);
                      }}
                    />
                  ) : (
                    <InputNumber
                      value={selectedcredit.current}
                      onChange={(value) => {
                        selectedcredit.current = value;
                        setloading(true);
                      }}
                    />
                  )}
                </td>
              </tr>
              <tr>
                <td>Narration</td>
                <td colspan="2">
                  <input
                    type="text"
                    id="narration"
                    class="ant-input"
                    style={{ width: "100%" }}
                    // value={selectednaration.current || ""}
                    onChange={(e) => {
                      selectednaration.current = e.target.value;
                    }}
                    placeholder=""
                  />
                </td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr>
                <td>From / To</td>
                <td>
                  <Select
                    defaultValue={contacttype.current}
                    style={{ width: "100%" }}
                    onChange={(value) => {
                      contacttype.current = value;
                      setloading(true);
                    }}
                  >
                    <Option value="Invoice">Sales Invoice</Option>
                    <Option value="Purchase">Purchase Invoice</Option>
                    <Option value="Supplier">Supplier</Option>
                    <Option value="Customer">Customer</Option>
                    <Option value="Employee">Employee</Option>

                    <Option value="Open">Open Field</Option>
                  </Select>
                </td>
                <td colspan="1" style={{ width: "40%" }}>
                  {contacttype.current == "Open" ? (
                    <input
                      type="text"
                      id="payto"
                      class="ant-input"
                      style={{ width: "100%" }}
                      defaultValue={selectedpayto.current}
                      onChange={(value) => {
                        selectedpayto.current = value;
                      }}
                      placeholder=""
                    />
                  ) : (
                    ""
                  )}
                  {contacttype.current == "Supplier" ? (
                    <ContctSearch
                      selector={selectedcontactname}
                      type="Supplier"
                    />
                  ) : (
                    ""
                  )}
                  {contacttype.current == "Customer" ? (
                    <ContctSearch
                      selector={selectedcontactname}
                      type="Customer"
                    />
                  ) : (
                    ""
                  )}
                  {contacttype.current == "Employee" ? (
                    <EmployeeSearch selector={selectedcontactname} />
                  ) : (
                    ""
                  )}
                  {contacttype.current == "Invoice" ? (
                    <InvoiceSearch selector={selectedcontactname} />
                  ) : (
                    ""
                  )}
                  {contacttype.current == "Purchase" ? (
                    <PurchaseSearch selector={selectedcontactname} />
                  ) : (
                    ""
                  )}
                </td>
                <td>-</td>
                <td>-</td>
              </tr>

              <tr>
                <td>Transaction method</td>
                <td colspan="2">
                  <Select
                    style={{ width: "100%" }}
                    placeholder="Select a payment method"
                    value={
                      selectedpaymentname.current != null
                        ? selectedpaymentname.current.id
                        : ""
                    }
                    onChange={(value) => {
                      getSpecificAccount(value).then((result) => {
                        // selectedpayment.current = value;
                        selectedpaymentname.current = result;
                        setloading(true);
                      });
                    }}
                  >
                    {accountList.map((item) => {
                      return <Option value={item.id}>{item.name}</Option>;
                    })}
                  </Select>
                </td>
                <td>{selecteddebit.current ? selecteddebit.current : "-"}</td>
                <td>{selectedcredit.current ? selectedcredit.current : "-"}</td>
              </tr>
            </tbody>
          </table>
          <Row style={{ float: "right", margin: "5px auto" }}>
            <Button
              type="primary"
              onClick={() => {
                if (
                  (selecteddebit.current > 0 &&
                    selectedcredit.current > 0 &&
                    selectedpaymentname.current > 0) ||
                  selectedheadcode.current > 0
                ) {
                  if (selecteddebit.current > 0) {
                    const arr = {
                      voucherno: voucherno.current,
                      code: selectedheadcode.current,
                      amount: selecteddebit.current,
                      type: "Debit",
                      normality: selectednormality.current,
                      payto: selectedpayto.current,
                      narations: selectednaration.current,

                      head: selectedheadname.current,
                      subhead: selectedsubheadname.current,
                      payment: selectedpaymentname.current,
                      contacttype: contacttype.current,
                      contactname: selectedcontactname.current,
                    };
                    cartlist.current.push(arr);
                    // document.getElementById("narration").value = "";
                    // document.getElementById("payto").value = "";
                    selectedpaymentname.current = null;
                    selectedpayto.current = "";
                    selecteddebit.current = 0;
                    selectedcredit.current = 0;
                    setloading(true);
                  } else if (selectedcredit.current > 0) {
                    const arr = {
                      voucherno: voucherno.current,
                      code: selectedheadcode.current,
                      amount: selectedcredit.current,
                      type: "Credit",
                      normality: selectednormality.current,
                      payto: selectedpayto.current,
                      narations: selectednaration.current,

                      head: selectedheadname.current,
                      subhead: selectedsubheadname.current,
                      payment: selectedpaymentname.current,
                      contacttype: contacttype.current,
                      contactname: selectedcontactname.current,
                    };
                    cartlist.current.push(arr);
                    // selectedhead.current = 0;
                    // selectedheadname.current = null;
                    // selectedheadcode.current = 0;
                    // selectedsubhead.current = 0;
                    // selectedsubheadname.current = null;
                    // selectednormality.current = null;
                    // selectedpaymentname.current = null;
                    // document.getElementById("narration").value = "";
                    // document.getElementById("payto").value = "";
                    selectedpaymentname.current = null;
                    selectedpayto.current = "";
                    selecteddebit.current = 0;
                    selectedcredit.current = 0;

                    setloading(true);
                  }
                } else {
                  message.warning("Please inset all the fields");
                }
              }}
            >
              Add to list
            </Button>
          </Row>
          <table className="product_table">
            <tr>
              <td>SL.</td>
              <td>Code</td>
              <td>particulars</td>
              <td>Narration</td>
              {/* <td>Payment method</td> */}
              <td>Debit</td>
              <td>Credit</td>
              <td>Action</td>
            </tr>

            {cartlist.current.map((list, index) => {
              // console.log(cartlist.current);
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{list.code}</td>
                  <td>
                    {list.head.account_name}{" "}
                    {list.subhead ? (
                      <>
                        {", "}
                        {list.subhead.account_name}
                      </>
                    ) : (
                      ""
                    )}
                  </td>

                  <td style={{ width: "30%" }}>{list.narations}</td>
                  {/* <td>{list.payment ? list.payment.name : ""}</td> */}
                  <td>
                    {list.type == "Debit"
                      ? parseFloat(list.amount).toFixed(2)
                      : ""}
                  </td>
                  <td>
                    {list.type == "Credit"
                      ? parseFloat(list.amount).toFixed(2)
                      : ""}
                  </td>
                  <td>
                    <Button
                      type="link"
                      onClick={() => {
                        cartlist.current.splice(index, 1);
                        setloading(true);
                      }}
                    >
                      <MinusCircleFilled />
                    </Button>
                  </td>
                </tr>
              );
            })}
            <tr>
              <td colspan="4">Total</td>

              <td>{parseFloat(debitamount.current).toFixed(2)}</td>
              <td>{parseFloat(creditamount.current).toFixed(2)}</td>
            </tr>
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
                  formData.append(
                    "debit",
                    parseFloat(debitamount.current).toFixed(2)
                  );
                  formData.append(
                    "credit",
                    parseFloat(creditamount.current).toFixed(2)
                  );
                  createjournalvoucher(formData).then((result) => {
                    for (let i = 0; i < cartlist.current.length; i++) {
                      formData = new FormData();
                      formData.append("journalvoucher", result.id);
                      if (cartlist.current[i].subhead == "") {
                        formData.append(
                          "chartofaccount",
                          cartlist.current[i].head.id
                        );
                      } else {
                        formData.append(
                          "chartofaccount",
                          cartlist.current[i].subhead.id
                        );
                      }
                      if (cartlist.current[i].contacttype == "Invoice") {
                        formData.append(
                          "invoice",
                          cartlist.current[i].contactname.id
                        );
                      } else if (
                        cartlist.current[i].contacttype == "Purchase"
                      ) {
                        formData.append(
                          "purchasee",
                          cartlist.current[i].contactname.id
                        );
                      } else if (
                        cartlist.current[i].contacttype == "Supplier" ||
                        cartlist.current[i].contacttype == "Customer"
                      ) {
                        formData.append(
                          "contact",
                          cartlist.current[i].contactname.id
                        );
                      } else if (
                        cartlist.current[i].contacttype == "Employee"
                      ) {
                        formData.append(
                          "employee",
                          cartlist.current[i].contactname.id
                        );
                      }
                      formData.append("location", branch.current);
                      formData.append(
                        "amount",
                        parseFloat(cartlist.current[i].amount).toFixed(2)
                      );
                      formData.append(
                        "narration",
                        cartlist.current[i].narations
                      );
                      formData.append("details", cartlist.current[i].narations);

                      if (
                        cartlist.current[i].normality ==
                        cartlist.current[i].type
                      ) {
                        formData.append("increase", true);
                      } else {
                        formData.append("increase", false);
                      }
                      if (
                        // typeof cartlist.current[i].payment.id !=
                        // "undefined"
                        cartlist.current[i].payment != null
                      ) {
                        formData.append(
                          "account",
                          cartlist.current[i].payment.id
                        );
                      }

                      createjournalvoucheritems(formData);
                      createjournals(formData);
                    }
                    window.location.href = "/accounting/journalvoucher";
                    // history.push("/accounting/journalvoucher");
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
  createChartofaccounts,
  getAllChartofaccounts,
  getSpecificChartofaccounts,
  getAllAccount,
  getSpecificAccount,
  getAllLocation,
  getAllEmployee,
  createjournalvoucher,
  createjournalvoucheritems,
  createjournals,
  getSpecificChartofaccountsbycode,
})(CreateNewChart);
