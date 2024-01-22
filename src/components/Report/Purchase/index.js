import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import {
  getAllPurchase,
  searchPurchase,
  searchPurchaseP,
} from "../../../actions/purchase";
import RenderTable from "./RenderTable";
import Excelldownload from "./Excelldownload";
import ReactToPrint from "react-to-print";
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
  AutoComplete,
  Button,
} from "antd";
const { Content } = Layout;
const { RangePicker } = DatePicker;
const { Option } = Select;

const ProductDetails = ({
  getAllPurchase,
  searchPurchase,
  searchPurchaseP,
  businessprofile,
}) => {
  var formatter = new Intl.NumberFormat("en-IN");
  const componentRef = useRef();
  const [details, setdetails] = useState([]);
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);
  const [type, setType] = useState("date");
  const start = useRef("");
  const end = useRef("");
  const keyward = useRef("");
  const [reload, setreload] = useState(false);
  const pageno = useRef(1);
  const page_size = useRef(10);
  let total_data = useRef({});
  const onChange = (data) => {
    keyward.current = data;
    setreload(!reload);
  };

  useEffect(() => {
    searchPurchaseP(
      start.current,
      end.current,
      "",
      "",
      "",
      keyward.current,
      pageno.current,
      page_size.current
    ).then(function (result) {
      total_data.current = {
        total_bill: result.total_bill,
        total_payment: result.total_payment,
        total_due: result.total_due,
        total_tax: result.total_tax,
        total_costing: result.total_costing,
        total_discount: result.total_discount,
        total_quantity: result.total_quantity,
        current_page_discount: result.current_page_discount,
        current_page_tax: result.current_page_tax,
        current_page_costing: result.current_page_costing,
        current_page_due: result.current_page_due,
        current_page_payment: result.current_page_payment,
        current_page_sales: result.current_page_sales,
      };

      setdata(result.results);
      setdetails(result);
      setloading(false);
    });
  }, [reload]);

  const renderdata = () => {
    if (loading) {
      return <Skeleton active />;
    } else {
      return (
        <RenderTable
          details={details}
          pageno={pageno}
          page_size={page_size}
          setreload={setreload}
          reload={reload}
          setloading={setloading}
          total_data={total_data}
        />
      );
    }
  };

  const rendetable = () => {
    if (loading) {
      return <Skeleton active />;
    } else {
      return (
        <table className="product_table invoice_print_fontSize">
          <tr>
            <td>SL.</td>
            <td>Date</td>
            <td>PO No.</td>
            <td>Bill</td>
            <td>Quantity</td>
            <td>Reference</td>
          </tr>

          {data.map((item, index) => {
            return (
              <>
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.issue_date}</td>
                  <td>{item.purchase_number}</td>
                  <td>{item.bill}</td>
                  <td>{item.quantity}</td>
                  <td>{item.reference}</td>
                </tr>
              </>
            );
          })}
          <tr>
            <td colSpan={3}>Total: </td>
            <td>{total_data.current["total_bill"]}</td>
            <td>{total_data.current["total_quantity"]}</td>
            <td colSpan={1}></td>
          </tr>
        </table>
      );
    }
  };

  const renderresult = () => {
    if (loading) {
      return <Skeleton active />;
    } else {
      return (
        <Row>
          <Col span={20}>
            <table style={{ width: "20%" }}>
              <tr>
                <td>
                  <b>Quantity :</b>{" "}
                </td>
                <td style={{ textAlign: "right" }}>
                  {" "}
                  {formatter.format(total_data.current["total_quantity"])}
                </td>
              </tr>
              <tr>
                <td>
                  <b>Bill :</b>
                </td>
                <td style={{ textAlign: "right" }}>
                  {" "}
                  {formatter.format(total_data.current["total_bill"])}
                </td>
              </tr>
              <tr>
                <td>
                  <b>Payment : </b>
                </td>
                <td style={{ textAlign: "right" }}>
                  {formatter.format(total_data.current["total_payment"])}
                </td>
              </tr>
              <tr>
                <td>
                  <b>Due :</b>
                </td>
                <td style={{ textAlign: "right" }}>
                  {" "}
                  {formatter.format(total_data.current["total_due"])}
                </td>
              </tr>
              {/* <tr>
              <td>VAT :</td>
              <td style={{ textAlign: "right" }}>
                {" "}
                {formatter.format(total_data.current["total_tax"])}
              </td>
            </tr> */}
              <tr>
                <td colSpan={6}></td>
              </tr>
            </table>
          </Col>
          <Col span={2}>
            <Excelldownload data={data} />
          </Col>
          <Col span={2}>
            <ReactToPrint
              trigger={() => <Button type="primary">Print</Button>}
              content={() => componentRef.current}
            />
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
                        // right: "0",
                      }}
                    />
                  </Col>
                </Row>

                <h3 style={{ textAlign: "center" }}>Purchase report</h3>
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
                  <Col span={12} style={{ textAlign: "right" }}></Col>
                </Row>
                {rendetable()}
              </div>
            </div>
          </Col>
        </Row>
      );
    }
  };

  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Purchase Report</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background main-frame">
        <Row>
          <Col span={8}>
            <AutoComplete
              placeholder="Insert PO No. to search"
              onChange={onChange}
              style={{ width: "100%" }}
            />
          </Col>
          <Col span={10} offset={1}>
            <Space>
              {/* <PickerWithType type={type} onChange={(value) => console.log(value)} /> */}
              Date range :
              <RangePicker
                picker={type}
                onChange={(value) => {
                  if (value) {
                    start.current =
                      value[0].format("YYYY-MM-DD") + "T00:00:00Z";
                    end.current = value[1].format("YYYY-MM-DD") + "T23:59:59Z";
                    setreload(!reload);
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
        </Row>
        <Divider />
        {renderresult()}
        <Divider />
        {renderdata()}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    businessprofile: state.settings.businessprofile,
  };
};

export default connect(mapStateToProps, {
  getAllPurchase,
  searchPurchase,
  searchPurchaseP,
})(ProductDetails);
