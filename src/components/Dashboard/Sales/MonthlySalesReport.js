import React, { Component, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";

import { getSpecificEmployee } from "../../../actions/employeeAction";
import { getBusinessProfile } from "../../../actions/settings";
import { getAllLocation, getAllOutlet } from "../../../actions/warehouseAction";
import { getProductSearchResult } from "../../../actions/productDetails";
import { getAllChartofaccounts } from "../../../actions/chartofaccountsAction";
import { getSalesReport } from "../../../actions/report";
import { getAllAttribute } from "../../../actions/attributeAction";
import { getAllDepartment } from "../../../actions/departmentActions";
import { getAllAccount } from "../../../actions/accountsAction";
import Linechart from "./linechart";
import { getcontacttype } from "../../../actions/settings";
import {
  getAllNotification,
  getAllUnreadNotification,
  markasRead,
  markAllasRead,
} from "../../../actions/notificationAction";
import {
  Layout,
  Breadcrumb,
  Row,
  Col,
  DatePicker,
  TimePicker,
  Space,
  Select,
  Divider,
  Skeleton,
  Card,
} from "antd";
const { Content } = Layout;
const { Option } = Select;

const Dashboard = ({
  getSpecificEmployee,
  getBusinessProfile,
  getAllLocation,
  getAllAttribute,
  getAllChartofaccounts,
  getAllOutlet,
  getAllDepartment,
  getSalesReport,
  getAllAccount,
  getcontacttype,
  getProductSearchResult,
  getAllNotification,
  allnotificationList,
  Auth,
  location,
  loading,
  setloading,
  reload,
  setreload,
}) => {
  var currentdate = new Date();
  const [chart, setchart] = useState(true);
  var formatter = new Intl.NumberFormat("en-IN");
  //   const [loading, setloading] = useState(true);
  //   const [reload, setreload] = useState(false);
  const [List, setList] = useState([]);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var datetime =
    currentdate.getFullYear() +
    "-" +
    (currentdate.getMonth() + 1) +
    "-" +
    "1" +
    "T00:00:00";

  const [invoice, setinvoice] = useState([]);
  const [invoice_list, setInvoice_list] = useState([]);
  let total_invoice = useRef(0);
  let total_sales = useRef(0);
  let total_payments = useRef([]);

  let total_payment = useRef(0);
  let total_due = useRef(0);
  let total_tax = useRef(0);
  let total_costing = useRef(0);

  const cash = useRef(0);
  const bank = useRef(0);
  const mobile = useRef(0);
  const [accounts, setaccounts] = useState([]);

  const [outletlist, setoutletlist] = useState([]);
  const totalcash = useRef(0);
  const totalpetty = useRef(0);

  useEffect(() => {
    getAllAccount().then((result) => {
      setaccounts(result);
      result.map((r) => {
        const arr = {
          name: r.name,
          total: 0,
          payment: 0,
          type: r.type,
        };
        total_payments.current.push(arr);
      });
    });
  }, []);

  useEffect(() => {
    totalpetty.current = 0;
    totalcash.current = 0;
    outletlist.map((outlet) => {
      totalpetty.current += parseFloat(outlet.petty_cash);
      totalcash.current += parseFloat(outlet.cash);
    });
    getSalesReport(
      datetime,
      "",
      "",
      "",
      "",

      "",
      "",
      location.current,
      ""
    ).then(function (result) {
      setinvoice(result);
      total_invoice.current = 0;
      total_sales.current = 0;
      total_payment.current = 0;
      total_due.current = 0;
      total_tax.current = 0;
      total_costing.current = 0;
      // updateData();
      // for (let i = 0; i < total_payments.current.length; i++) {
      //   total_payments.current[i].payment = 0;
      //   total_payments.current[i].total = 0;
      // }
      result.map((d) => {
        total_payments.current.map((account) => {
          if (account.name == d.Payment_method) {
            account.payment =
              parseFloat(account.payment) + parseFloat(d.payment);
            account.total = parseFloat(account.total) + parseFloat(d.bill);
          }
        });
        total_invoice.current = parseInt(total_invoice.current) + 1;
        total_sales.current = total_sales.current + parseInt(d.bill);
        total_payment.current = total_payment.current + parseInt(d.payment);
        total_due.current = total_due.current + parseInt(d.due);
        total_tax.current = total_tax.current + parseInt(d.tax);
        total_costing.current = total_costing.current + parseInt(d.costing);
      });

      //Start mapping
      let map = {};
      let lists = [];
      for (let i = 0; i < result.length; i++) {
        if (map[result[i].issue_date]) {
          map[result[i].issue_date].issue_date = result[i].issue_date;
          if (map[result[i].issue_date].total_invoices) {
            map[result[i].issue_date].total_invoices =
              parseInt(map[result[i].issue_date].total_invoices) + 1;
          } else {
            map[result[i].issue_date].total_invoices = 1;
          }
          if (map[result[i].issue_date].bill) {
            map[result[i].issue_date].bill =
              parseFloat(map[result[i].issue_date].bill) +
              parseFloat(result[i].bill);
          } else {
            map[result[i].issue_date].bill = parseFloat(result[i].bill);
          }
          if (map[result[i].issue_date].quantity) {
            map[result[i].issue_date].quantity =
              parseFloat(map[result[i].issue_date].quantity) +
              parseFloat(result[i].quantity);
          } else {
            map[result[i].issue_date].quantity = parseFloat(result[i].quantity);
          }

          if (map[result[i].issue_date].payment) {
            map[result[i].issue_date].payment =
              parseFloat(map[result[i].issue_date].payment) +
              parseFloat(result[i].payment);
          } else {
            map[result[i].issue_date].payment = parseFloat(result[i].payment);
          }

          if (map[result[i].issue_date].due) {
            map[result[i].issue_date].due =
              parseFloat(map[result[i].issue_date].due) +
              parseFloat(result[i].due);
          } else {
            map[result[i].issue_date].due = parseFloat(result[i].due);
          }
        } else {
          map[result[i].issue_date] = {
            issue_date: result[i].issue_date,
            total_invoices: parseInt(1),
            quantity: parseInt(result[i].quantity),
            bill: parseInt(result[i].bill),
            payment: parseFloat(result[i].payment),
            due: parseFloat(result[i].due),
          };
        }
      }

      for (var key in map) {
        if (map.hasOwnProperty(key)) {
          lists.push(map[key]);
        }
      }
      console.log(lists);
      setInvoice_list(lists.reverse());
      //End mapping

      setloading(false);
      setreload(false);
      setchart(false);
    });
    getAllLocation().then((result) => {
      setoutletlist(result);
    });
  }, [location.current]);

  const updateData = () => {
    let map = {};
    let lists = [];
    invoice.forEach((element) => {
      if (map[element.issue_date]) {
        map[element.issue_date].issue_date = element.issue_date;
        if (map[element.issue_date].total_invoices) {
          map[element.issue_date].total_invoices =
            parseInt(map[element.issue_date].total_invoices) + 1;
        } else {
          map[element.issue_date].total_invoices = 1;
        }
        if (map[element.issue_date].bill) {
          map[element.issue_date].bill =
            parseFloat(map[element.issue_date].bill) + parseFloat(element.bill);
        } else {
          map[element.issue_date].bill = parseFloat(element.bill);
        }
        if (map[element.issue_date].quantity) {
          map[element.issue_date].quantity =
            parseFloat(map[element.issue_date].quantity) +
            parseFloat(element.quantity);
        } else {
          map[element.issue_date].quantity = parseFloat(element.quantity);
        }

        if (map[element.issue_date].payment) {
          map[element.issue_date].payment =
            parseFloat(map[element.issue_date].payment) +
            parseFloat(element.payment);
        } else {
          map[element.issue_date].payment = parseFloat(element.payment);
        }

        if (map[element.issue_date].due) {
          map[element.issue_date].due =
            parseFloat(map[element.issue_date].due) + parseFloat(element.due);
        } else {
          map[element.issue_date].due = parseFloat(element.due);
        }
      } else {
        map[element.issue_date] = {
          issue_date: element.issue_date,
          total_invoices: parseInt(1),
          quantity: parseInt(element.quantity),
          bill: parseInt(element.bill),
          payment: parseFloat(element.payment),
          due: parseFloat(element.due),
        };
      }
    });
    for (var key in map) {
      if (map.hasOwnProperty(key)) {
        lists.push(map[key]);
      }
    }

    setInvoice_list(lists);
    setchart(false);
  };

  const RenderCHart = () => {
    if (chart) {
      return <Skeleton active />;
    } else {
      return (
        <Linechart data={invoice_list} xField={"issue_date"} yField={"bill"} />
      );
    }
  };

  const Rendercontent = () => {
    if (loading) {
      return (
        <>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </>
      );
    } else {
      return (
        <>
          <Row>
            <Col
              style={{ padding: "1rem", border: "1px solid whitesmoke" }}
              span={24}
            >
              <Card
                title={monthNames[currentdate.getMonth()] + " report"}
                className="summary_card transactions stock"
                bordered={true}
                // extra={<> Total products : {List.length}</>}
              >
                {RenderCHart()}
                <br></br>
                <Row gutter={16}>
                  <Col span={6}>
                    <Card
                      className="summary_card"
                      bordered={true}
                      style={{
                        backgroundColor: "#EEEEEE",
                      }}
                    >
                      <h3 style={{ color: "red" }}>Invoices</h3>
                      <br></br>
                      {formatter.format(total_invoice.current)}
                    </Card>
                  </Col>
                  <Col span={6}>
                    <Card
                      className="summary_card "
                      bordered={true}
                      style={{
                        backgroundColor: "#EEEEEE",
                      }}
                    >
                      <h3 style={{ color: "#172774" }}>Bill</h3>
                      <br></br>
                      {formatter.format(total_sales.current)} BDT
                    </Card>
                  </Col>

                  <Col span={6}>
                    <Card
                      className="summary_card "
                      bordered={true}
                      style={{
                        backgroundColor: "#EEEEEE",
                      }}
                    >
                      <h3 style={{ color: "#77D970" }}>Collection</h3>
                      <br></br>
                      {formatter.format(total_payment.current)} BDT
                    </Card>
                  </Col>
                  <Col span={6}>
                    <Card
                      className="summary_card"
                      bordered={true}
                      style={{
                        backgroundColor: "#EEEEEE",
                      }}
                    >
                      <h3 style={{ color: "#FF8243" }}>Due</h3>
                      <br></br>
                      {formatter.format(
                        total_due.current > 0 ? total_due.current : 0
                      )}{" "}
                      BDT
                    </Card>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </>
      );
    }
  };

  return (
    <>
      <div>{Rendercontent()}</div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    Auth: state.auth,
    allnotificationList: state.notifications.allnotificationList,
  };
};

export default connect(mapStateToProps, {
  getSpecificEmployee,
  getBusinessProfile,
  getAllLocation,
  getAllAttribute,
  getAllChartofaccounts,
  getAllOutlet,
  getAllDepartment,
  getSalesReport,
  getAllAccount,
  getcontacttype,
  getProductSearchResult,
  getAllNotification,
})(Dashboard);
