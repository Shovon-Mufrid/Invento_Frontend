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
import RenderTable from "./Sales/RenderTable";
import Linechart from "./linechart";
import { getcontacttype } from "../../../actions/settings";
import {
  getAllNotification,
  getAllUnreadNotification,
  markasRead,
  markAllasRead,
} from "../../actions/notificationAction";
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
}) => {
  var currentdate = new Date();
  const [loading, setloading] = useState(true);
  const [reload, setreload] = useState(false);
  const [List, setList] = useState([]);
  var datetime =
    currentdate.getFullYear() +
    "-" +
    (currentdate.getMonth() + 1) +
    "-" +
    currentdate.getDate() +
    "T00:00:00Z";
  var monthstart =
    currentdate.getFullYear() +
    "-" +
    (currentdate.getMonth() - 1) +
    "-" +
    "1" +
    "T00:00:00Z";
  // const location = useRef(Auth.profile.branch.id);
  const [invoice, setinvoice] = useState([]);
  const [monthlyinvoice, setmonthlyinvoice] = useState([]);
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
    ).then((result) => {
      setinvoice(result);
      total_invoice.current = 0;
      total_sales.current = 0;
      total_payment.current = 0;
      total_due.current = 0;
      total_tax.current = 0;
      total_costing.current = 0;
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
      getProductSearchResult("", location.current).then((result) => {
        const arr = [];
        for (const item of result) {
          if (item.quantity <= item.Deatils[0].stock_alart_amount) {
            arr.push(item);
          }
        }
        setList(arr);
      });
      getBusinessProfile();
      getcontacttype();
      getAllLocation().then((result) => {
        setoutletlist(result);
      });
      getAllAttribute();
      getAllChartofaccounts();
      getAllOutlet();
      getAllDepartment();

      setloading(false);
    });
    getSalesReport(
      monthstart,
      datetime,
      "",
      "",
      "",

      "",
      "",
      location.current,
      ""
    ).then((result) => {
      setmonthlyinvoice(result);
    });
  }, []);

  useEffect(() => {
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
    getProductSearchResult("", location.current).then((result) => {
      const arr = [];
      for (const item of result) {
        if (item.quantity <= item.Deatils[0].stock_alart_amount) {
          arr.push(item);
        }
      }
      setList(arr);
    });
    getSalesReport(
      monthstart,
      datetime,
      "",
      "",
      "",

      "",
      "",
      location.current,
      ""
    ).then((result) => {
      setmonthlyinvoice(result);
    });
  }, [reload, location.current]);

  let notificationRedirect = {
    loan: "/loan-management",
    leave: "/employee-leave",
    transfer: "/stock/transfer/history",
    services: "/service",
  };
  const [hrmNotification, sethrmNotification] = useState([]);
  const [productNotification, setProductNotification] = useState([]);
  const [orderNotification, setOrderNotification] = useState([]);

  useEffect(() => {
    sethrmNotification([]);
    setProductNotification([]);
    setOrderNotification([]);
    allnotificationList.map((notification) => {
      if (
        notification["description"] == "loan" ||
        notification["description"] == "leave"
      ) {
        sethrmNotification((hrmNotification) => [
          ...hrmNotification,
          notification,
        ]);
      } else if (notification["description"] == "transfer") {
        setProductNotification((productNotification) => [
          ...productNotification,
          notification,
        ]);
      } else if (notification["description"] == "services") {
        setOrderNotification((orderNotification) => [
          ...orderNotification,
          notification,
        ]);
      }
    });
    console.log(allnotificationList);
    console.log(hrmNotification);
    console.log(productNotification);
    console.log(orderNotification);
  }, [allnotificationList]);

  const SwitchablePicker = () => {
    return Auth.superuser || Auth.profile.user_role.id == 10 ? (
      <Row>
        <Col span={24}>
          <Space style={{ float: "right" }}>
            Select a outlet:
            <Select
              placeholder="Please select a outlet"
              style={{ width: "250px" }}
              defaultValue={Auth.profile.branch.name}
              onChange={(e) => {
                console.log(e);
                location.current = e;
                setreload(true);
              }}
            >
              <Option value="">All</Option>
              {outletlist.map((outlet) => {
                if (!outlet.is_office && outlet.is_outlet)
                  return <Option value={outlet.id}>{outlet.name}</Option>;
              })}
            </Select>
          </Space>
        </Col>
      </Row>
    ) : (
      ""
    );
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
              span={24}
              style={{ padding: "1rem", border: "1px solid whitesmoke" }}
            >
              {SwitchablePicker()}

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
                      {total_sales.current} BDT
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
                      {total_payment.current} BDT
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
                      {total_due.current} BDT
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
                        if (outlet.id == location.current)
                          return <> {outlet.cash} BDT</>;
                      })}
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
                          return <> {outlet.petty_cash} BDT</>;
                      })}
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
          <Row>
            <Col span={8}>
              <h3>HRM Notifications</h3>
              <div
                style={{
                  minHeight: "30vh",
                  background: "white",
                  borderRadius: "5px",
                }}
              >
                {hrmNotification.map((result) => {
                  return (
                    <>
                      <Card
                        className="notification transactions"
                        bordered={true}
                      >
                        {result.verb}
                      </Card>
                    </>
                  );
                })}
              </div>
            </Col>
            <Col span={8}>
              <h3>Product Notifications</h3>
              <div
                style={{
                  minHeight: "30vh",
                  background: "white",
                  borderRadius: "5px",
                }}
              >
                {productNotification.map((result) => {
                  return (
                    <>
                      <Card
                        className="notification transactions"
                        bordered={true}
                      >
                        {result.verb}
                      </Card>
                    </>
                  );
                })}
              </div>
            </Col>
            <Col span={8}>
              <h3>Order Notifications</h3>
              <div
                style={{
                  minHeight: "30vh",
                  background: "white",
                  borderRadius: "5px",
                }}
              >
                {orderNotification.map((result) => {
                  return (
                    <>
                      <Card
                        className="notification transactions"
                        bordered={true}
                      >
                        {result.verb}
                      </Card>
                    </>
                  );
                })}
              </div>
            </Col>
          </Row>
          <Row>
            <Col
              style={{ padding: "1rem", border: "1px solid whitesmoke" }}
              span={16}
            >
              <Card
                title="Today's Invoices"
                className="summary_card transactions stock"
                bordered={true}
                // extra={<> Total products : {List.length}</>}
              >
                <RenderTable List={invoice} />
              </Card>
            </Col>
            <Col
              span={8}
              style={{ padding: "1rem", border: "1px solid whitesmoke" }}
            >
              <Row>
                <Col span={24}>
                  <Card
                    title="Today's cash register"
                    className="summary_card transactions stock"
                    bordered={true}
                    // extra={<> Total products : {List.length}</>}
                  >
                    {total_payments.current.map((result) => {
                      if (result.type == "Cash" && result.payment > 0)
                        return (
                          <>
                            <Row>
                              <Col span={20}>
                                <p>{result.name}</p>
                              </Col>
                              <Col span={4} style={{ textAlign: "right" }}>
                                {result.payment}
                              </Col>
                            </Row>
                          </>
                        );
                    })}
                    {total_payments.current.map((result) => {
                      if (result.type == "Bank" && result.payment > 0)
                        return (
                          <>
                            <Row>
                              <Col span={20}>
                                <p>{result.name}</p>
                              </Col>
                              <Col span={4} style={{ textAlign: "right" }}>
                                {result.payment}
                              </Col>
                            </Row>
                          </>
                        );
                    })}
                    {total_payments.current.map((result) => {
                      if (result.type == "Mobile banking" && result.payment > 0)
                        return (
                          <>
                            <Row>
                              <Col span={20}>
                                <p>{result.name}</p>
                              </Col>
                              <Col span={4} style={{ textAlign: "right" }}>
                                {result.payment}
                              </Col>
                            </Row>
                          </>
                        );
                    })}
                  </Card>
                </Col>
                <Divider />
                <Col
                  span={24}
                  style={{
                    marginBottom: "1rem",
                    border: "1px solid whitesmoke",
                  }}
                >
                  <Card
                    title="Low stock"
                    className="summary_card transactions stock"
                    bordered={true}
                    extra={<> Total products : {List.length}</>}
                  >
                    {List.map((item, index) => {
                      if (index < 10) {
                        return (
                          <Row>
                            <Col span={20}>
                              <p>
                                {index + 1}
                                {". "}
                                {item.title}
                              </p>
                            </Col>
                            <Col span={4} style={{ textAlign: "right" }}>
                              <p>{item.quantity}</p>
                            </Col>
                          </Row>
                        );
                      }
                    })}
                  </Card>
                </Col>
              </Row>
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
