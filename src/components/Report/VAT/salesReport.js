import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import ReactToPrint from "react-to-print";
import { getVATReport } from "../../../actions/report";
import { getAllOutlet } from "../../../actions/warehouseAction";
import moment from "moment";

// import RenderTable from "./RenderTable";
// import Excelldownload from "./Excelldownload";
import dateFormat from "dateformat";
import invoiceDetails from "./invoiceDetails";
import Excelldownload from "./Excelldownload";

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
} from "antd";
const { Content } = Layout;
const { RangePicker } = DatePicker;
const { Option } = Select;

const SalesReport = ({ getVATReport, businessprofile, Auth, getAllOutlet }) => {
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
  const disc = useRef(0);
  const vat = useRef(0);
  const bill = useRef(0);
  const location = useRef(Auth.profile.Office);
  const [report, setReport] = useState([]);
  var formatter = new Intl.NumberFormat("en-IN");

  useEffect(() => {
    setloading(true);
    let promises = [];
    getAllOutlet().then((result) => {
      setoutletlist(result);
    });

    promises.push(
      getVATReport(
        start.current,
        end.current,
        "",
        "",
        "",
        "Paid",
        "",
        location.current,
        "",
        "true"
      ).then(function (result) {
        setData(result);
        let cnt = 1;
        disc.current = 0;
        vat.current = 0;
        bill.current = 0;
        result.map((item) => {
          let invoice_number = item.invoice_number;
          let issue_date = item.Vat_issued_date;
          let name = item.contact ? item.Contact[0].name : "";
          let phone = item.contact ? item.Contact[0].phone : "";
          let bill = item.bill;
          let discount = item.discount;
          let tax = item.tax;
          let payment = item.payment;
          let due = 0;
          let total = item.bill;
          let invoice_items = item.invoice_items;

          invoice_items.map((invoice_item) => {
            let Details = invoice_item.Details;
            let quantity = invoice_item.quantity;
            let price = invoice_item.price;
            let report_item = {
              sl: parseInt(cnt),
              invoice_number: invoice_number,
              issue_date: issue_date,
              name: name,
              phone: phone,
              bill: bill,
              discount: discount,
              tax: tax,
              payment: payment,
              due: due,
              total: total,
              Details: Details,
              quantity: quantity,
              price: price,
            };
            setReport((report) => [...report, report_item]);
          });
          cnt = parseInt(cnt) + 1;
        });
      })
    );
    Promise.all(promises).then(function (values) {
      console.log(report);
      setloading(false);
    });
  }, [reload]);

  const renderremaingitem = (items) => {
    return items.map((item, index) => {
      if (index != 0) {
        return (
          <tr>
            <td>{item.Details}</td>
            <td>{formatter.format(item.quantity)}</td>
            <td>{formatter.format(item.price)}</td>
          </tr>
        );
      }
    });
  };

  const SwitchablePicker = () => {
    return (
      <Row>
        <Space>
          Select a date range :
          <RangePicker
            picker={type}
            onChange={(value) => {
              if (value) {
                from.current = value[0].format("YYYY-MM-DD");
                to.current = value[1].format("YYYY-MM-DD");
                start.current = value[0].format("YYYY-MM-DD") + "T00:00:00";
                end.current = value[1].format("YYYY-MM-DD") + "T23:59:59";
                setreload(!reload);
              }
            }}
          />
          {/* <Select value={type} onChange={setType}>
            <Option value="date">Date</Option>

            <Option value="month">Month</Option>

            <Option value="year">Year</Option>
          </Select> */}
          {Auth.superuser ? (
            <>
              {" "}
              Outlet :
              <Select
                placeholder="Please select a outlet"
                style={{ width: 200 }}
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
            </>
          ) : (
            ""
          )}
          <ReactToPrint
            trigger={() => <Button type="primary">Print</Button>}
            content={() => componentRef.current}
          />
          <Excelldownload data={data} data1={data} />
        </Space>
      </Row>
    );
  };

  const Rendercontent = () => {
    if (loading) {
      return <>Loading .....</>;
    } else {
      return (
        <>
          <div
            // className="invoice_print_fontSize"
            // style={{ fontSize: "12px" }}
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
                <div
                  className="d-div"
                  dangerouslySetInnerHTML={{
                    __html: businessprofile.address,
                  }}
                ></div>
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

            <h3 style={{ textAlign: "center" }}>VAT report</h3>

            {/* <RenderTable List={data} /> */}
            <table style={{ width: "100%" }} className="vat_table">
              <tr>
                <th>Invoice No.</th>
                <th>Date</th>
                <th>Customer Name</th>
                <th>Contact No.</th>
                <th>SL.</th>
                <th>Product Details</th>
                <th>QTY</th>
                <th>Rate</th>
                <th>Amount(BDT)</th>
                <th>Disc</th>
                <th>VAT incl.</th>
                <th>Paid</th>
                <th>Due</th>
                <th>Total</th>
              </tr>

              {data.map((item, index) => {
                disc.current += parseFloat(item.discount);
                vat.current += parseFloat(item.tax);
                bill.current += parseFloat(item.bill);
                return (
                  <>
                    <tr>
                      <td rowspan={item.invoice_items.length}>
                        {item.invoice_number}
                      </td>
                      <td rowspan={item.invoice_items.length}>
                        {item.Vat_issued_date}
                      </td>
                      <td rowspan={item.invoice_items.length}>
                        {item.contact ? item.Contact[0].name : ""}
                      </td>
                      <td rowspan={item.invoice_items.length}>
                        {item.contact ? item.Contact[0].phone : ""}
                      </td>
                      <td rowspan={item.invoice_items.length}>{index + 1}</td>
                      <td>{item.invoice_items[0].Details}</td>
                      <td>
                        {formatter.format(item.invoice_items[0].quantity)}
                      </td>
                      <td>{formatter.format(item.invoice_items[0].price)}</td>
                      <td rowspan={item.invoice_items.length}>
                        {/* {item.total_price} */}
                        {formatter.format(item.bill)}
                      </td>
                      <td rowspan={item.invoice_items.length}>
                        {formatter.format(item.discount)}
                      </td>
                      <td rowspan={item.invoice_items.length}>
                        {formatter.format(item.tax)}
                      </td>
                      <td rowspan={item.invoice_items.length}>
                        {formatter.format(item.payment)}
                      </td>
                      {/* <td>{item.due}</td> */}
                      <td rowspan={item.invoice_items.length}>0</td>
                      <td rowspan={item.invoice_items.length}>
                        {formatter.format(item.bill)}
                      </td>
                    </tr>
                    {item.invoice_items.length > 1 ? (
                      renderremaingitem(item.invoice_items)
                    ) : (
                      <></>
                    )}
                  </>
                );
              })}
              <tr>
                <th>Total</th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th>{formatter.format(bill.current)}</th>
                <th>{formatter.format(disc.current)}</th>
                <th>{formatter.format(vat.current)}</th>
                <th>{formatter.format(bill.current)}</th>
                <th>0</th>
                <th>{formatter.format(bill.current)}</th>
              </tr>
            </table>
          </div>
        </>
      );
    }
  };
  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Report</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background main-frame">
        <Row>
          <Col
            span={24}
            style={{ padding: "1rem", border: "1px solid whitesmoke" }}
          >
            {SwitchablePicker()}
            <Divider />
            {Rendercontent()}
          </Col>
        </Row>
      </div>
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
  getVATReport,
  getAllOutlet,
})(SalesReport);
