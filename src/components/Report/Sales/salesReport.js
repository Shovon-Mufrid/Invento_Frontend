import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";

import ReactToPrint from "react-to-print";
import {
  getSalesReportByInvoiceCount,
  getSalesReport,
  getSalesReportP,
} from "../../../actions/report";
import { getAllOutlet } from "../../../actions/warehouseAction";
import { getAllAccount } from "../../../actions/accountsAction";
import moment from "moment";

import Linechart from "../linechart";
import DemoDualAxes from "./Doublechart";
import RenderTable from "./RenderTable";
import Excelldownload from "./Excelldownload";
import dateFormat from "dateformat";
import CashRegister from "./CashRegister";

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
  Button,
  AutoComplete,
  Badge,
  Avatar,
} from "antd";
const { Content } = Layout;
const { RangePicker } = DatePicker;
const { Option } = Select;

const SalesReport = ({
  getSalesReportByInvoiceCount,
  getSalesReport,
  getSalesReportP,
  getAllOutlet,
  getAllAccount,
  businessprofile,
  Auth,
}) => {
  var formatter = new Intl.NumberFormat("en-IN");
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
  const keyward = useRef("");
  const status = useRef("");
  const location = useRef("");
  const pageno = useRef(1);
  const page_size = useRef(10);
  let total_payments = useRef([]);
  let total_data = useRef({});
  useEffect(() => {
    getAllOutlet().then((result) => {
      setoutletlist(result);
    });

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
    getSalesReportP(
      start.current,
      end.current,
      keyward.current,
      "",
      "",
      "",

      status.current,
      "",
      location.current,
      "",
      pageno.current,
      page_size.current
    ).then(function (result) {
      total_data.current = {
        total_invoices: result.count,
        total_sales: result.total_sales,
        total_payment: result.total_payment,
        total_due: result.total_due,
        total_tax: result.total_tax,
        total_costing: result.total_costing,
        total_discount: result.total_discount,
        current_page_discount: result.current_page_discount,
        current_page_tax: result.current_page_tax,
        current_page_costing: result.current_page_costing,
        current_page_due: result.current_page_due,
        current_page_payment: result.current_page_payment,
        current_page_sales: result.current_page_sales,
      };
      setData(result);
      setloading(false);
    });
  }, [reload]);

  const onChange = (event) => {
    if (event.keyCode == 13) {
      pageno.current = 1;
      keyward.current = event.target.value;
      setreload(!reload);
    }
  };

  const SwitchablePicker = () => {
    return (
      <Row wrap={false}>
        <Col flex="auto">
          keyword :
          <AutoComplete
            placeholder="input search text"
            // onChange={onChange}
            onKeyUp={onChange}
            style={{ width: "100%", minWidth: "140px" }}
          />
        </Col>
        <Col flex="auto">
          Issue date :<br></br>
          <RangePicker
            style={{ width: "80%" }}
            picker={type}
            onChange={(value) => {
              if (value) {
                console.log(value);
                from.current = value[0].format("YYYY-MM-DD");
                to.current = value[1].format("YYYY-MM-DD");
                start.current = value[0].format("YYYY-MM-DD") + "T00:00:00";
                end.current = value[1].format("YYYY-MM-DD") + "T23:59:59";
                setreload(!reload);
              }
            }}
          />
          <Select value={type} onChange={setType} style={{ width: "20%" }}>
            <Option value="date">Date</Option>

            <Option value="month">Month</Option>

            <Option value="year">Year</Option>
          </Select>
        </Col>
        <Col flex="auto">
          Status :
          <Select
            style={{ width: "100%" }}
            placeholder="Status"
            onChange={(value) => {
              status.current = value;
              setreload(!reload);
            }}
          >
            <Option value="">All</Option>
            <Option value="Pending">Pending</Option>
            <Option value="Factory Received">Factory received</Option>
            <Option value="Outlet received">Outlet received</Option>
            <Option value="Ready">Ready</Option>
            <Option value="Picked by courier">Picked by courier</Option>
            <Option value="Delivered">Delivered</Option>
            <Option value="Paid">Paid</Option>
            <Option value="Booked">Booked</Option>
            <Option value="Exchanged">Exchanged</Option>
            <Option value="Cancelled">Cancelled</Option>
          </Select>
        </Col>
        <Col flex="auto">
          Outlet:
          <Select
            placeholder="Please select a outlet"
            style={{ width: "100%" }}
            // defaultValue={
            //   Auth.profile.branch.is_outlet ? Auth.profile.branch.id : ""
            // }
            disabled={
              Auth.superuser ||
              Auth.profile.user_role.id == 10 ||
              Auth.profile.user_role.id == 36 ||
              Auth.profile.user_role.id == 38
                ? false
                : true
            }
            onChange={(e) => {
              console.log(e);
              location.current = e;
              setreload(!reload);
            }}
          >
            <Option value="">All</Option>
            {outletlist.map((outlet) => {
              return <Option value={outlet.id}>{outlet.name}</Option>;
            })}
          </Select>
        </Col>
        <Col>
        .
          <Excelldownload data={data.results} data1={data1} />
        </Col>
        <Col flex="auto">
          .
          <ReactToPrint
            trigger={() => (
              <Button type="primary" style={{ width: "100%", marginLeft: "4px" }}>
                Print
              </Button>
            )}
            content={() => componentRef.current}
          />
        </Col>
      </Row>
    );
  };
  const resultrender = () => {
    return (
      <Row>
        <Divider />

        <Col span={24}>
          <CashRegister
            location={location}
            loading={loading}
            setloading={setloading}
            reload={reload}
            setreload={setreload}
            start={start}
            end={end}
            collectionType={"Due"}
            total_data={total_data}
          />
        </Col>

        <Col span={2}>
          <div style={{ display: "none" }}>
            <div
              className="invoice_print_fontSize"
              ref={componentRef}
              style={{ padding: "10px" }}
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
                      maxHeight: "60px",
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

              <CashRegister
                location={location}
                loading={loading}
                setloading={setloading}
                reload={reload}
                setreload={setreload}
                start={start}
                end={end}
                collectionType={"Current"}
                total_data={total_data}
              />
              <br />

              <table className="product_table ">
                <tr>
                  <td>SL.</td>
                  <td>Date</td>
                  <td>Invoice No.</td>
                  <td>Order No.</td>
                  <td>Status</td>
                  <td>Discount</td>
                  <td>Bill</td>
                  <td>Payment</td>
                  <td>Due</td>
                  <td>Tax</td>
                  <td>Payment method</td>
                  <td>delivery date</td>
                  <td>Delivery method</td>
                  <td>Delivery cost</td>
                  <td>Account no.</td>
                  <td>Transection</td>
                </tr>

                {data.results.map((item, index) => {
                  return (
                    <>
                      <tr>
                        <td>{index + 1}</td>
                        <td>{item.issue_date}</td>
                        <td>{item.invoice_number}</td>
                        <td>{item.order_number}</td>
                        <td>{item.status}</td>
                        <td>{formatter.format(item.discount)}</td>
                        <td>{formatter.format(item.bill)}</td>
                        <td>{formatter.format(item.payment)}</td>
                        <td>{formatter.format(item.due)}</td>
                        <td>{formatter.format(item.tax)}</td>
                        <td>{item.Payment_method}</td>
                        <td>{item.delivery_date}</td>
                        <td>{item.DeliveryTypeName}</td>
                        <td>{item.delivery_cost}</td>
                        <td>{item.Account_no}</td>
                        <td>{item.Transection_no}</td>
                      </tr>
                    </>
                  );
                })}
                {/* <tr>
                  <td colSpan={5}>Total: </td>
                  <td>
                    {formatter.format(total_data.current["total_discount"])}
                  </td>
                  <td>{formatter.format(total_data.current["total_sales"])}</td>
                  <td>
                    {formatter.format(total_data.current["total_payment"])}
                  </td>
                  <td>{formatter.format(total_data.current["total_due"])}</td>
                  <td>{formatter.format(total_data.current["total_tax"])}</td>
                  <td colSpan={6}></td>
                </tr> */}
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
              {resultrender()}
              <Divider />

              <RenderTable
                List={data}
                pageno={pageno}
                page_size={page_size}
                setreload={setreload}
                reload={reload}
                setloading={setloading}
                total_data={total_data}
              />
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
  getSalesReportP,
  getAllOutlet,
  getAllAccount,
})(SalesReport);
