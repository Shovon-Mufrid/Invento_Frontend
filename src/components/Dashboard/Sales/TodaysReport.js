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
import { getcontacttype } from "../../../actions/settings";

import {
  getAllNotification,

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
  //   const [loading, setloading] = useState(true);
  //   const [reload, setreload] = useState(false);
  const [List, setList] = useState([]);
  var datetime =
    currentdate.getFullYear() +
    "-" +
    (currentdate.getMonth() + 1) +
    "-" +
    currentdate.getDate() +
    "T00:00:00";
  var formatter = new Intl.NumberFormat("en-IN");
  const [invoice, setinvoice] = useState([]);
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
    setloading(true);
    totalpetty.current = 0;
    totalcash.current = 0;
    outletlist.map((outlet) => {
      totalpetty.current += parseFloat(outlet.petty_cash);
      totalcash.current += parseFloat(outlet.cash);
    });
    getSalesReport(
      datetime,
      datetime,
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
      for (let i = 0; i < total_payments.current.length; i++) {
        total_payments.current[i].payment = 0;
        total_payments.current[i].total = 0;
      }
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

      setloading(false);
      setreload(false);
    });
    getAllLocation().then((result) => {
      setoutletlist(result);
    });
  }, [reload, location.current]);

  const Rendercontent = () => {
    if (loading) {
      return (
        <>
          <Skeleton active />
        </>
      );
    } else {
      return (
        <>
          <Row>
            <Col
              span={24}
              style={{ padding: "1rem", border: "1px solid whitesmoke" }}
            >
              <div className="site-card-wrapper ">
                <h3>Today's Report</h3>
                <Row gutter={16} className="glossy_card">
                  <Col span={4}>
                    <Card
                      className="summary_card"
                      bordered={true}
                      style={{
                        backgroundColor: "#EEEEEE",
                      }}
                    >
                      <h3 style={{ color: "red" }}>Invoices</h3>
                      <br></br>
                      {total_invoice.current}
                    </Card>
                  </Col>
                  <Col span={4}>
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
                  {/* <Col span={4}>
                    <Card
                      className="summary_card "
                      bordered={true}
                      style={{
                        backgroundColor: "#EEEEEE",
                      }}
                    >
                      <h3 style={{ color: "#3E7C17" }}>Revenue</h3>
                      <br></br>
                      {total_sales.current - total_costing.current} BDT
                    </Card>
                  </Col> */}
                  <Col span={4}>
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
                  <Col span={4}>
                    <Card
                      className="summary_card"
                      bordered={true}
                      style={{
                        backgroundColor: "#EEEEEE",
                      }}
                    >
                      <h3 style={{ color: "#FF8243" }}>Due</h3>
                      <br></br>
                      {total_due.current > 0
                        ? formatter.format(total_due.current)
                        : 0}{" "}
                      BDT
                    </Card>
                  </Col>
                  <Col span={4}>
                    <Card
                      className="summary_card"
                      bordered={true}
                      style={
                        {
                          // backgroundColor: "#EEEEEE",
                        }
                      }
                    >
                      <h3 style={{ color: "#FF0000" }}>Petty cash</h3>
                      <br></br>
                      {outletlist.map((outlet) => {
                        if (outlet.id == location.current)
                          return (
                            <> {formatter.format(outlet.petty_cash)} BDT</>
                          );
                      })}
                      {location.current == "" ? (
                        <> {formatter.format(totalpetty.current)} BDT</>
                      ) : (
                        ""
                      )}
                    </Card>
                  </Col>
                  <Col span={4}>
                    <Card
                      className="summary_card"
                      bordered={true}
                      style={
                        {
                          // backgroundColor: "#EEEEEE",
                        }
                      }
                    >
                      <h3 style={{ color: "#1890FF" }}>Cash on hand</h3>
                      <br></br>
                      {outletlist.map((outlet) => {
                        if (outlet.id == location.current) {
                          return <> {formatter.format(outlet.cash)} BDT</>;
                        }
                      })}
                      {location.current == "" ? (
                        <> {formatter.format(totalcash.current)} BDT</>
                      ) : (
                        ""
                      )}
                    </Card>
                  </Col>
                </Row>

                {/* <Row>
                  <Col
                    style={{ padding: "1rem", border: "1px solid whitesmoke" }}
                    span={24}
                  >
                    <Linechart
                      data={monthlyinvoice}
                      xField="issue_date"
                      yField="bill"
                    />
                  </Col>
                </Row> */}
              </div>
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
