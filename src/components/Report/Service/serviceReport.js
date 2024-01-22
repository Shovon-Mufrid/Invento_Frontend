import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { getServiceReport } from "../../../actions/report";
import { getAllOutlet } from "../../../actions/warehouseAction";
import { getAllEmployee } from "../../../actions/employeeAction";
import RenderTable from "./RenderTable";
import Excelldownload from "./Excelldownload";
import dateFormat from "dateformat";
import ReactToPrint from "react-to-print";

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
  Button,
  AutoComplete,
} from "antd";
const { Content } = Layout;
const { RangePicker } = DatePicker;
const { Option } = Select;

const DeliveryReport = ({
  getServiceReport,
  getAllOutlet,
  businessprofile,
  getAllEmployee,
  employeeList,
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
  const employe = useRef("");
  const keyward = useRef("");
  let total_data = useRef({});
  const location = useRef("");
  const pageno = useRef(1);
  const page_size = useRef(10);
  const [loadServicepage, setloadServicepage] = useState(false);

  useEffect(() => {
    getAllEmployee();
    getAllOutlet().then((result) => {
      setoutletlist(result);
    });
  }, []);

  useEffect(() => {
    getServiceReport(
      start.current,
      end.current,
      keyward.current,
      employe.current
    ).then(function (result) {
      total_data.current = {
        total_quantity: result.total_quantity,
        total_price: result.total_price,
        total_cost: result.total_cost,
      };
      setData(result);
      setloading(false);
      // setreload(false);
    });
  }, [loadServicepage]);

  const PickerWithType = ({ type, onChange }) => {
    if (type === "time") return <TimePicker onChange={onChange} />;
    if (type === "date") return <DatePicker onChange={onChange} />;
    return <DatePicker picker={type} onChange={onChange} />;
  };

  const onChange = (event) => {
    if (event.keyCode == 13) {
      pageno.current = 1;
      keyward.current = event.target.value;
      setloadServicepage(!loadServicepage);
    }
  };

  const SwitchablePicker = () => {
    return (
      <Row>
        <Col span={24}>
          <Space>
            {/* <PickerWithType type={type} onChange={(value) => console.log(value)} /> */}
            Keyward :
            <AutoComplete
              placeholder="input search text"
              // onChange={onChange}
              onKeyUp={onChange}
              style={{ width: "200px" }}
            />
            Issue date :
            <RangePicker
              picker={type}
              onChange={(value) => {
                if (value) {
                  from.current = value[0].format("YYYY-MM-DD");
                  to.current = value[1].format("YYYY-MM-DD");
                  start.current = value[0].format("YYYY-MM-DD") + "T00:00:00";
                  end.current = value[1].format("YYYY-MM-DD") + "T23:59:59";
                  // setreload(true);
                  setloadServicepage(!loadServicepage);
                }
              }}
            />
            {/* <Select value={type} onChange={setType}>
              <Option value="date">Date</Option>

              <Option value="month">Month</Option>

              <Option value="year">Year</Option>
            </Select> */}
            Employee :
            <Select
              showSearch
              placeholder="Please choose an assignee"
              style={{ fontWeight: "400", width: "200px" }}
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              onChange={(value) => {
                employe.current = value;
                setloadServicepage(!loadServicepage);
              }}
            >
              <Option value="">All</Option>;
              {employeeList.map((employee) => {
                if (employee.branchName == "Factory") {
                  return <Option value={employee.id}>{employee.name}</Option>;
                }
              })}
            </Select>
          </Space>
        </Col>
        {/* <Col span={3}>
          <Space>
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
        </Col> */}
      </Row>
    );
  };

  const resultrender = () => {
    return (
      <Row>
        <Divider />
        <Col span={19}>
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
                {formatter.format(total_data.current["total_price"])}
              </td>
            </tr>
            <tr>
              <td>
                <b>Cost : </b>
              </td>
              <td style={{ textAlign: "right" }}>
                {formatter.format(total_data.current["total_cost"])}
              </td>
            </tr>
          </table>
        </Col>
        <Col span={3}>
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
                    }}
                  />
                </Col>
              </Row>

              <h3 style={{ textAlign: "center" }}>Service report</h3>
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
                  <td>Issue date</td>
                  <td>Invoice No.</td>
                  <td>Details</td>
                  <td>QTY</td>
                  <td>Bill</td>
                  <td>Cost</td>
                  <td>Status</td>
                  <td>Delivery date</td>
                </tr>

                {data.results.map((item, index) => {
                  return (
                    <>
                      <tr>
                        <td>{index + 1}</td>
                        <td>{item.issue_date}</td>
                        <td>{item.invoice_number}</td>
                        <td>
                          <div
                            className="d-div"
                            dangerouslySetInnerHTML={{
                              __html: item.details,
                            }}
                          ></div>
                        </td>
                        <td>{formatter.format(item.quantity)}</td>
                        <td>{formatter.format(item.price)}</td>
                        <td>{formatter.format(item.cost)}</td>
                        <td>{item.status}</td>
                        <td>{item.delivery_date}</td>
                      </tr>
                    </>
                  );
                })}
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>Total</td>
                  <td>
                    {formatter.format(total_data.current["total_quantity"])}
                  </td>
                  <td>{formatter.format(total_data.current["total_price"])}</td>
                  <td>{formatter.format(total_data.current["total_cost"])}</td>
                  <td></td>
                  <td></td>
                </tr>
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
            {/* <Calendar /> */}
            <Col
              style={{ padding: "1rem", border: "1px solid whitesmoke" }}
              span={24}
            >
              {SwitchablePicker()}
              {resultrender()}
              {/* <Divider />
              <DemoDualAxes data1={data} data2={data} /> */}
            </Col>
            <Col
              span={24}
              style={{ padding: "1rem", border: "1px solid whitesmoke" }}
            >
              <RenderTable
                List={data}
                setloadServicepage={setloadServicepage}
                pageno={pageno}
                page_size={page_size}
                loadServicepage={loadServicepage}
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
    employeeList: state.employee.employeelist,
  };
};

export default connect(mapStateToProps, {
  getServiceReport,
  getAllOutlet,
  getAllEmployee,
})(DeliveryReport);
