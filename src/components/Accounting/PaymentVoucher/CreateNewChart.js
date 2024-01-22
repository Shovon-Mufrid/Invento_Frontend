import React, { useState, useEffect, useRef } from "react";

import { connect } from "react-redux";
// import history from "../../../history";

import {
  createChartofaccounts,
  getAllChartofaccounts,
  getSpecificChartofaccounts,
  getSpecificChartofaccountsbycode,
} from "../../../actions/chartofaccountsAction";
import { createpaymentVoucher } from "../../../actions/accounting/paymentVoucher";
import { createpaymentvoucheritem } from "../../../actions/accounting/paymentVoucheritems";
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
  createpaymentVoucher,
  createpaymentvoucheritem,
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
  const amount = useRef("");
  const selectedpayto = useRef(null);
  const selectedcontactname = useRef(null);
  const selectedpaymentname = useRef(null);
  const reference = useRef("");

  const selectedhead = useRef(null);
  const selectedheadcode = useRef(0);
  const selectedsubhead = useRef(null);

  const selectednaration = useRef(null);
  const selecteddebit = useRef(null);
  const selectedcredit = useRef(null);
  const selectednormality = useRef(null);
  const selectedheadname = useRef("");
  const selectedsubheadname = useRef("");
  const selectedAccountName = useRef("");
  const selectedAccountType = useRef("");
  const selectedAccountAddress = useRef("");
  const selectedAccountNo = useRef("");
  const selectedAccountAmount = useRef("");
  const debitTotal = useRef(0);
  const creditTotal = useRef(0);

  const cartlist = useRef([]);

  const { Option } = Select;
  var currentdate = new Date();

  useEffect(() => {
    amount.current = 0;
    debitTotal.current = 0;
    creditTotal.current = 0;
    cartlist.current.map((list, index) => {
      if (list.type == "Credit") {
        creditTotal.current = creditTotal.current + parseFloat(list.amount);
      } else {
        debitTotal.current = debitTotal.current + parseFloat(list.amount);
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
          <Breadcrumb.Item>Payment voucher</Breadcrumb.Item>
          <Breadcrumb.Item>Create</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background main-frame">
          <h2 style={{ textAlign: "center" }}>Payment voucher</h2>
          <Row>
            <Col span={16} style={{ textAlign: "left" }}>
              <Row>
                <Col span={6}>
                  <b>Payment receiver / Client </b>
                </Col>
              </Row>
              <br></br>
              <Row>
                <Col span={8}>
                  <Select
                    defaultValue={contacttype.current}
                    style={{ width: "100%" }}
                    onChange={(value) => {
                      contacttype.current = value;
                      setloading(true);
                    }}
                  >
                    {/* <Option value="Purchase">Purchase</Option>
                          <Option value="Invoice">Invoice</Option> */}
                    <Option value="Supplier">Supplier</Option>
                    <Option value="Customer">Customer</Option>
                    {/* <Option value="Employee">Employee</Option> */}
                    <Option value="Open">Open Field</Option>
                  </Select>
                </Col>
              </Row>
              <br></br>
              <Row>
                <Col span={8}>
                  {contacttype.current == "Open" ? (
                    <AutoComplete
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
                </Col>
              </Row>
            </Col>

            <Col span={8} style={{ textAlign: "left" }}>
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
                      style={{ width: "100%" }}
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
                          <b>*Created by</b>
                        </td>
                        <td>
                          <Select
                            style={{ width: "100%" }}
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
                <tr>
                  <td style={{ width: "45%" }}>
                    <b>Reference </b>
                  </td>
                  <td>
                    <Input
                      onChange={(e) => {
                        reference.current = e.target.value;
                        setloading(true);
                      }}
                    ></Input>
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "45%" }}>
                    <b>*Transaction method </b>
                  </td>
                  <td>
                    <Select
                      style={{ width: "100%" }}
                      placeholder="Select a transaction method"
                      onChange={(value) => {
                        getSpecificAccount(value).then((result) => {
                          // selectedpayment.current = value;
                          selectedpaymentname.current = result;
                          accountList.find((item) => {
                            if (item.id == value) {
                              console.log(item);
                              selectedAccountName.current = item.name;
                              selectedAccountType.current = item.type;
                              selectedAccountAddress.current = item.address;
                              selectedAccountNo.current = item.account_no;
                              selectedAccountAmount.current = item.cash;
                              setloading(true);
                            }
                          });
                        });
                      }}
                    >
                      {accountList.map((item) => {
                        return <Option value={item.id}>{item.name}</Option>;
                      })}
                    </Select>
                  </td>
                </tr>
                {/* <tfoot>
                  {selectedAccountName.current != "" ? (
                    <tr>
                      <td colSpan={4}>
                        Name: {selectedAccountName.current} (
                        {selectedAccountNo.current})
                        <br />
                        Type: {selectedAccountType.current} -{" "}
                        {selectedAccountAddress.current}
                        <br />
                        Amount: {selectedAccountAmount.current}
                      </td>
                    </tr>
                  ) : (
                    ""
                  )}
                </tfoot> */}
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
                <th>Amount</th>
                {/* <th>Increase / Debit</th> */}
                {/* <th>Decrease / Credit</th> */}
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
                      console.log(value);
                      getSpecificChartofaccounts(value).then((result) => {
                        console.log(result);
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
                      // console.log(item);
                      if (item.group) {
                        if (
                          item.Group[0].account_name == "Expense" ||
                          item.account_code == "100010003"
                        ) {
                          return (
                            <Option value={item.id}>{item.account_name}</Option>
                          );
                        }
                        // return (
                        //   <Option value={item.id}>
                        //     {item.account_name}
                        //   </Option>
                        // );
                      }
                    })}
                  </Select>
                </td>

                <td style={{ width: "15%" }}>
                  <InputNumber
                    value={selecteddebit.current}
                    onChange={(value) => {
                      selecteddebit.current = value;
                      setloading(true);
                    }}
                  />
                </td>
                {/* <td style={{ width: "15%" }}>
                        <InputNumber
                          value={selectedcredit.current}
                          onChange={(value) => {
                            selectedcredit.current = value;
                            setloading(true);
                          }}
                        />
                      </td> */}
              </tr>

              <tr>
                <td>Narration</td>
                <td colspan="2">
                  <input
                    type="text"
                    id="narration"
                    class="ant-input"
                    style={{ width: "100%" }}
                    // defaultValue={selectednaration.current}
                    onChange={(e) => {
                      selectednaration.current = e.target.value;
                    }}
                    placeholder=""
                  />
                </td>
                <td>-</td>
                {/* <td>-</td> */}
              </tr>
              {/* <tr>
                      <td>Transaction method</td>
                      <td colspan="2">
                        <Select
                          style={{ width: "100%" }}
                          placeholder="Select a transaction method"
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
                      <td>
                        {selecteddebit.current ? selecteddebit.current : "-"}
                      </td>
                      <td>
                        {selectedcredit.current ? selectedcredit.current : "-"}
                      </td>
                    </tr> */}
            </tbody>
          </table>
          <Row style={{ float: "right", margin: "5px auto" }}>
            <Button
              type="primary"
              onClick={() => {
                if (
                  (selecteddebit.current > 0 && selectedcredit.current > 0) ||
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
                    document.getElementById("narration").value = "";

                    selectednaration.current = "";
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
                    document.getElementById("narration").value = "";

                    selectednaration.current = "";
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
              {/* <td>Debit</td> */}
              {/* <td>Credit</td> */}
              <td>Amount</td>
              <td>Action</td>
            </tr>

            {cartlist.current.map((list, index) => {
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
                  {/* <td>{list.payment.name}</td> */}
                  {/* <td>{list.type == "Debit" ? list.amount : ""}</td> */}
                  {/* <td>{list.type == "Credit" ? list.amount : ""}</td> */}
                  <td>{parseFloat(list.amount).toFixed(2)}</td>
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
              <td>
                {parseFloat(debitTotal.current + creditTotal.current).toFixed(
                  2
                )}
              </td>
              {/* <td>{creditTotal.current}</td> */}
            </tr>
          </table>
          <Row style={{ float: "right", margin: "5px auto" }}>
            <Button
              type="primary"
              onClick={() => {
                if (
                  branch.current > 0 &&
                  employee.current > 0 &&
                  selectedpaymentname.current != null
                ) {
                  let formData = new FormData();
                  formData.append("voucher_number", voucherno.current);
                  formData.append("location", branch.current);
                  formData.append("employee", employee.current);
                  formData.append(
                    "amount",
                    parseFloat(amount.current).toFixed(2)
                  );
                  if (contacttype.current == "Invoice") {
                    formData.append("invoice", selectedcontactname.current.id);
                  } else if (
                    contacttype.current == "Supplier" ||
                    contacttype.current == "Customer"
                  ) {
                    formData.append("contact", selectedcontactname.current.id);
                  } else if (contacttype.current == "Employee") {
                    formData.append("employee", selectedcontactname.current.id);
                  } else if (contacttype.current == "Purchase") {
                    formData.append(
                      "purchasee",
                      selectedcontactname.current.id
                    );
                  } else {
                    formData.append("narration", selectedpayto.current);
                  }

                  formData.append("account", selectedpaymentname.current.id);
                  formData.append("referance", reference.current);

                  createpaymentVoucher(formData).then((result) => {
                    for (let i = 0; i < cartlist.current.length; i++) {
                      formData = new FormData();
                      formData.append("paymentvoucher", result.id);
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
                      } else if (
                        cartlist.current[i].contacttype == "Purchase"
                      ) {
                        formData.append(
                          "purchasee",
                          cartlist.current[i].contactname.id
                        );
                      } else {
                        cartlist.current[i].narations =
                          cartlist.current[i].narations;
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
                      if (cartlist.current[i].payment.id > 0) {
                        formData.append(
                          "account",
                          cartlist.current[i].payment.id
                        );
                      }

                      createpaymentvoucheritem(formData);
                      createjournals(formData);
                      //cash credit

                      let formData2 = new FormData();

                      if (cartlist.current[i].contacttype == "Invoice") {
                        formData2.append(
                          "invoice",
                          cartlist.current[i].contactname.id
                        );
                      } else if (
                        cartlist.current[i].contacttype == "Supplier" ||
                        cartlist.current[i].contacttype == "Customer"
                      ) {
                        formData2.append(
                          "contact",
                          cartlist.current[i].contactname.id
                        );
                      } else if (
                        cartlist.current[i].contacttype == "Employee"
                      ) {
                        formData2.append(
                          "employee",
                          cartlist.current[i].contactname.id
                        );
                      } else if (
                        cartlist.current[i].contacttype == "Purchase"
                      ) {
                        formData2.append(
                          "purchasee",
                          cartlist.current[i].contactname.id
                        );
                      }
                      formData2.append("location", branch.current);
                      formData2.append(
                        "amount",
                        parseFloat(cartlist.current[i].amount).toFixed(2)
                      );

                      formData2.append(
                        "details",
                        cartlist.current[i].narations
                      );

                      formData2.append("voucher_type", "cash");
                      if (
                        cartlist.current[i].normality ==
                        cartlist.current[i].type
                      ) {
                        formData2.append("increase", false);
                      } else {
                        formData2.append("increase", true);
                      }
                      if (cartlist.current[i].payment.id > 0) {
                        formData2.append(
                          "account",
                          cartlist.current[i].payment.id
                        );
                      }
                      formData2.append("location", branch.current);
                      formData2.append("employee", employee.current);
                      let accountCode = "";
                      if (selectedpaymentname.current.type == "Cash") {
                        accountCode = 100040;
                      } else {
                        accountCode = 100010002;
                      }

                      getSpecificChartofaccountsbycode(accountCode).then(
                        (res) => {
                          console.log(res);
                          formData2.append("chartofaccount", res[0].id);
                          createjournals(formData2);
                          window.location.href = "/accounting/paymentvoucher";
                          // history.push("/accounting/paymentvoucher");
                        }
                      );
                    }
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
  createpaymentVoucher,
  createpaymentvoucheritem,
  createjournals,
  getSpecificChartofaccountsbycode,
})(CreateNewChart);
