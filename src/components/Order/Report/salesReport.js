import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";

import ReactToPrint from "react-to-print";
import {
  getSalesReportByInvoiceCount,
  getSalesReport,
} from "../../../actions/report";
import { getAllOutlet } from "../../../actions/warehouseAction";
import { getAllAccount } from "../../../actions/accountsAction";
import moment from "moment";

import RenderTable from "./RenderTable";
import Excelldownload from "./Excelldownload";
import dateFormat from "dateformat";

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
const { RangePicker } = DatePicker;
const { Option } = Select;

const SalesReport = ({
  getSalesReportByInvoiceCount,
  getSalesReport,
  getAllOutlet,
  getAllAccount,
  businessprofile,
  Auth,
}) => {
  const componentRef = useRef();
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [accounts, setaccounts] = useState([]);
  const [outletlist, setoutletlist] = useState([]);
  const [loading, setloading] = useState(true);
  const [reload, setreload] = useState(false);
  const [type, setType] = useState("date");
  const from = useRef("2021-01-01");
  const to = useRef("2071-01-01");
  const start = useRef("");
  const end = useRef("");
  const location = useRef("");
  let total_invoice = useRef(0);
  let total_sales = useRef(0);
  let total_payments = useRef([]);

  let total_payment = useRef(0);
  let total_due = useRef(0);
  let total_tax = useRef(0);
  let total_costing = useRef(0);
  if (!Auth.superuser) {
    location.current = Auth.profile.branch.id;
  }

  useEffect(() => {
    getAllOutlet().then((result) => {
      setoutletlist(result);
    });
    // getSalesReportByInvoiceCount(from.current, to.current).then((result) => {
    //   setData1(result);
    // });
    getAllAccount().then((result) => {
      setaccounts(result);
      result.map((r) => {
        const arr = {
          name: r.name,
          total: 0,
          payment: 0,
        };
        total_payments.current.push(arr);
      });
    });
    getSalesReport(
      start.current,
      end.current,
      "",
      "",
      "",

      "",
      "",
      location.current,
      ""
    ).then(function (result) {
      setData(result);

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
      setloading(false);
      setreload(false);
      console.log("loading");
    });
  }, []);
  useEffect(() => {
    // if ((start.current != "") & (end.current != "")) {
    //   getSalesReportByInvoiceCount(from.current, to.current).then((result) => {
    //     setData1(result);
    //   });
    // } else {
    //   getSalesReportByInvoiceCount("2021-01-01", "2061-01-01").then(
    //     (result) => {
    //       setData1(result);
    //     }
    //   );
    // }

    getSalesReport(
      start.current,
      end.current,
      "",
      "",
      "",
      "",

      "",
      location.current,
      ""
    ).then(function (result) {
      setData(result);
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
  }, [reload]);

  const SwitchablePicker = () => {
    return (
      <Row>
        <Col span={14}>
          <Space>
            {/* <PickerWithType type={type} onChange={(value) => console.log(value)} /> */}
            Select a date range to generate the report :
            <RangePicker
              picker={type}
              onChange={(value) => {
                if (value) {
                  from.current = value[0].format("YYYY-MM-DD");
                  to.current = value[1].format("YYYY-MM-DD");
                  start.current = value[0].format("YYYY-MM-DD") + "T00:00:00";
                  end.current = value[1].format("YYYY-MM-DD") + "T23:59:59";
                  setreload(true);
                }
              }}
            />
            <Select value={type} onChange={setType}>
              <Option value="date">Date</Option>

              <Option value="month">Month</Option>

              <Option value="year">Year</Option>
            </Select>
          </Space>
        </Col>
        <Col span={5} offset={1}>
          {Auth.superuser ? (
            <Space style={{ width: "100%" }}>
              Outlet:
              <Select
                placeholder="Please select a outlet"
                style={{ width: "100%" }}
                onChange={(e) => {
                  console.log(e);
                  location.current = e;
                  setreload(true);
                }}
              >
                <Option value="">All</Option>
                {outletlist.map((outlet) => {
                  return <Option value={outlet.id}>{outlet.name}</Option>;
                })}
              </Select>
            </Space>
          ) : (
            ""
          )}
        </Col>
        <Col span={2}>
          <Excelldownload data={data} data1={data1} />
        </Col>
        <Col span={2}>
          <ReactToPrint
            trigger={() => <button>Print</button>}
            content={() => componentRef.current}
          />
          <div style={{ display: "none" }}>
            <div
              className="invoice_print_fontSize"
              ref={componentRef}
              style={{ padding: "40px" }}
            >
              <Row
                style={{
                  borderBottom: "2px solid lightgray",
                  paddingBottom: "5px",
                  marginBottom: "20px",
                }}
              >
                <Col span={17} style={{ paddingTop: "10px" }}>
                  <small>
                    <div
                      style={{ lineHeight: "2.5px" }}
                      dangerouslySetInnerHTML={{
                        __html: businessprofile.address,
                      }}
                    ></div>
                  </small>
                </Col>

                <Col span={7} style={{ textAlign: "right" }}>
                  <img
                    src={businessprofile.logo}
                    style={{
                      maxHeight: "120px",
                      right: "0",
                    }}
                  />
                </Col>
              </Row>

              <h3 style={{ textAlign: "center" }}>Sales report</h3>
              <Row>
                <Col span={12} style={{ textAlign: "left" }}>
                  {start.current != "" ? (
                    <>
                      From : {dateFormat(start.current, "mmmm dS, yyyy")}
                      <br></br>
                    </>
                  ) : (
                    ""
                  )}

                  {end.current != "" ? (
                    <>
                      To : {dateFormat(end.current, "mmmm dS, yyyy")}
                      <br></br>
                    </>
                  ) : (
                    ""
                  )}
                </Col>
                <Col span={12} style={{ textAlign: "right" }}>
                  {outletlist.map((outlet) => {
                    if (outlet.id == location.current)
                      return <>Outlet : {outlet.name}</>;
                  })}
                </Col>
              </Row>
              <table className="product_table ">
                <tr>
                  <td>SL.</td>
                  <td>Date</td>
                  <td>Invoice No.</td>
                  <td>Order No.</td>
                  <td>Status</td>
                  <td>Bill</td>
                  <td>Payment</td>
                  <td>Due</td>
                  <td>Payment method</td>
                  <td>delivery date</td>
                  <td> Delivery method</td>
                  <td>Delivery cost</td>

                  <td>Account no.</td>
                  <td>Transection</td>
                </tr>

                {data.map((item, index) => {
                  return (
                    <>
                      <tr>
                        <td>{index + 1}</td>
                        <td>{item.issue_date}</td>
                        <td>{item.invoice_number}</td>
                        <td>{item.order_number}</td>
                        <td>{item.status}</td>
                        <td>{item.bill}</td>
                        <td>{item.payment}</td>
                        <td>{item.due}</td>
                        <td>{item.Payment_method}</td>
                        <td>{item.delivery_date}</td>
                        <td>{item.delivery_method}</td>
                        <td>{item.delivery_cost}</td>
                        <td>{item.Account_no}</td>
                        <td>{item.Transection_no}</td>
                      </tr>
                    </>
                  );
                })}
              </table>
            </div>
          </div>
        </Col>
      </Row>
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
              <Divider />

              <RenderTable List={data} />
            </Col>
          </Row>
        </>
      );
    }
  };
  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Report</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background main-frame">{Rendercontent()}</div>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    businessprofile: state.settings.businessprofile,
    Auth: state.auth,
  };
};

export default connect(mapStateToProps, {
  getSalesReportByInvoiceCount,
  getSalesReport,
  getAllOutlet,
  getAllAccount,
})(SalesReport);
