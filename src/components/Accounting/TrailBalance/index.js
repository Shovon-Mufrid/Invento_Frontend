import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import ReactToPrint from "react-to-print";

// import { getAllOutlet } from "../../../actions/warehouseAction";
import { getAllChartofaccounts } from "../../../actions/chartofaccountsAction";
import { getJournalSearchResult } from "../../../actions/journalAction";
import moment from "moment";

// import Excelldownload from "./Excelldownload";
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
  Button,
} from "antd";
const { Content } = Layout;
const { RangePicker } = DatePicker;
const { Option } = Select;

const Trailbalance = ({ getAllChartofaccounts, getJournalSearchResult }) => {
  const componentRef = useRef();
  const [charts, setcharts] = useState([]);
  const [journals, setjournals] = useState([]);
  //   const [outletlist, setoutletlist] = useState([]);
  const [type, setType] = useState("date");
  const [loading, setloading] = useState(true);
  const [reload, setreload] = useState(false);
  const start = useRef("");
  const end = useRef("");
  const totaldebit = useRef(0);
  const totalcredit = useRef(0);
  const sl = useRef(0);
  //   const location = useRef("");
  var formatter = new Intl.NumberFormat("en-IN");

  useEffect(() => {
    getAllChartofaccounts().then((result) => {
      totaldebit.current = 0;
      totalcredit.current = 0;
      setcharts(result);
      setloading(false);
    });
  }, [reload]);

  const accountRenderold = (chart) => {
    if (loading) {
      return <Skeleton active />;
    } else {
      let debit = 0;
      let credit = 0;
      let finalamount = 0;

      for (let i = 0; i < journals.length; i++) {
        if (journals[i].chartofaccount == chart.id) {
          if (journals[i].type == "Debit") {
            debit = parseFloat(debit) + parseFloat(journals[i].amount);
          } else {
            credit = parseFloat(credit) + parseFloat(journals[i].amount);
          }
        }
      }

      if (chart.normally_Debit == "Debit") {
        finalamount = debit - credit;
        if (finalamount != 0) {
          if (finalamount > 0) {
            totaldebit.current =
              parseFloat(totaldebit.current) + parseFloat(finalamount);
            return (
              <>
                <tr>
                  <td>{chart.account_name}</td>
                  <td style={{ textAlign: "right" }}>
                    {formatter.format(parseFloat(finalamount).toFixed(2))}
                  </td>
                  <td style={{ textAlign: "right" }}></td>
                </tr>
              </>
            );
          } else {
            totalcredit.current =
              parseFloat(totalcredit.current) +
              parseFloat(Math.abs(finalamount));
            return (
              <>
                <tr>
                  <td>{chart.account_name}</td>
                  <td style={{ textAlign: "right" }}></td>
                  <td style={{ textAlign: "right" }}>
                    {formatter.format(
                      parseFloat(Math.abs(finalamount)).toFixed(2)
                    )}
                  </td>
                </tr>
              </>
            );
          }
        }
      } else {
        finalamount = credit - debit;
        if (finalamount != 0) {
          if (finalamount > 0) {
            totalcredit.current =
              parseFloat(totalcredit.current) + parseFloat(finalamount);
            return (
              <>
                <tr>
                  <td>{chart.account_name}</td>
                  <td style={{ textAlign: "right" }}>
                    {/* {parseFloat(finalamount).toFixed(2)} */}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    {formatter.format(parseFloat(finalamount).toFixed(2))}
                  </td>
                </tr>
              </>
            );
          } else {
            totaldebit.current =
              parseFloat(totaldebit.current) +
              parseFloat(Math.abs(finalamount));
            return (
              <>
                <tr>
                  <td>{chart.account_name}</td>
                  <td style={{ textAlign: "right" }}>
                    {formatter.format(
                      parseFloat(Math.abs(finalamount)).toFixed(2)
                    )}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    {/* {parseFloat(finalamount).toFixed(2)} */}
                  </td>
                </tr>
              </>
            );
          }
        }
      }
      // console.log("total debit - " + totaldebit.current);
      // console.log("total credit - " + totalcredit.current);
      // console.log("--------------------------------");
    }
  };

  const accountRender = (chart) => {
    if (loading) {
      return <Skeleton active />;
    } else {
      if (chart.status == "Debit") {
        totaldebit.current += Math.abs(chart.amount);
      } else {
        totalcredit.current += Math.abs(chart.amount);
      }
      if (Math.abs(chart.amount) > 0) {
        return (
          <>
            <tr>
              <td>{chart.account_name}</td>
              <td style={{ textAlign: "right" }}>
                {chart.status == "Debit"
                  ? formatter.format(
                      parseFloat(Math.abs(chart.amount)).toFixed(2)
                    )
                  : ""}
              </td>
              <td style={{ textAlign: "right" }}>
                {chart.status == "Credit"
                  ? formatter.format(
                      parseFloat(Math.abs(chart.amount)).toFixed(2)
                    )
                  : ""}
              </td>
            </tr>
          </>
        );
      }
    }
  };

  const SwitchablePicker = () => {
    return (
      <Row>
        <Col span={14}>
          <Space>
            {/* <PickerWithType type={type} onChange={(value) => console.log(value)} /> */}
            {/* Select a date range to generate the report :
            <RangePicker
              picker={type}
              onChange={(value) => {
                if (value) {
                  start.current = value[0].format("YYYY-MM-DD") + "T00:00:00Z";
                  end.current = value[1].format("YYYY-MM-DD") + "T23:59:59Z";
                  totaldebit.current = 0;
                  totalcredit.current = 0;

                  setreload(true);
                }
              }}
            /> */}
            {/* <Select value={type} onChange={setType}>
              <Option value="date">Date</Option>

              <Option value="month">Month</Option>

              <Option value="year">Year</Option>
            </Select> */}
          </Space>
        </Col>

        <Col span={4}>
          {/* <Excelldownload data={data} data1={data1} /> */}
          <ReactToPrint
            trigger={() => <Button type="primary">Print Trail Balance</Button>}
            content={() => componentRef.current}
          />
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
              style={{
                padding: "1rem",
                border: "1px solid whitesmoke",
              }}
            >
              {SwitchablePicker()}
              <Divider />
              {/* <RenderTable List={data} /> */}
              <div ref={componentRef} style={{ padding: "20px" }}>
                <table className="account_table">
                  <tr
                    style={{
                      textAlign: "center",
                      backgroundColor: "#99FE8E",
                      minHeight: "50px",
                    }}
                  >
                    <td colSpan={3}>
                      <b>
                        <h2>MEHER</h2>
                        <h3>Trail Balance</h3>
                        {start.current != "" ? (
                          <h3>
                            From {dateFormat(start.current, "mmmm dS, yyyy")}{" "}
                            {"  "}To{"  "}
                            {dateFormat(end.current, "mmmm dS, yyyy")}
                          </h3>
                        ) : (
                          ""
                        )}
                      </b>
                    </td>
                  </tr>
                  <tr
                    style={{
                      textAlign: "center",
                      // backgroundColor: "#99FE8E",
                      height: "50px",
                    }}
                  >
                    <td>
                      <b>Particulars</b>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <b>Debit</b>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <b>Credit</b>
                    </td>
                  </tr>

                  <tr style={{ background: "lightgray" }}>
                    <td>
                      <b>Assets</b>
                    </td>
                    <td></td>
                    <td></td>
                  </tr>
                  {charts.map((chart) => {
                    if (
                      chart.account_code > 10000 &&
                      "Assets" == chart.Group[0].account_name
                    ) {
                      return accountRender(chart);
                    }
                  })}
                  <tr style={{ background: "lightgray" }}>
                    <td>
                      <b>Liabilities</b>
                    </td>
                    <td></td>
                    <td></td>
                  </tr>
                  {charts.map((chart) => {
                    if (
                      chart.account_code > 10000 &&
                      "Liabilities" == chart.Group[0].account_name
                    ) {
                      return accountRender(chart);
                    }
                  })}
                  <tr style={{ background: "lightgray" }}>
                    <td>
                      <b>Expenses</b>
                    </td>
                    <td></td>
                    <td></td>
                  </tr>
                  {charts.map((chart) => {
                    if (
                      chart.account_code > 10000 &&
                      "Expense" == chart.Group[0].account_name
                    ) {
                      return accountRender(chart);
                    }
                  })}
                  <tr style={{ background: "lightgray" }}>
                    <td>
                      <b>Revenue </b>
                    </td>
                    <td></td>
                    <td></td>
                  </tr>
                  {charts.map((chart) => {
                    if (
                      chart.account_code > 10000 &&
                      "Revenue" == chart.Group[0].account_name
                    ) {
                      return accountRender(chart);
                    }
                  })}
                  <tr style={{ background: "lightgray" }}>
                    <td>
                      <b>Owner's equity </b>
                    </td>
                    <td></td>
                    <td></td>
                  </tr>
                  {charts.map((chart) => {
                    if (
                      chart.account_code > 10000 &&
                      "Owner's equity" == chart.Group[0].account_name
                    ) {
                      return accountRender(chart);
                    }
                  })}
                  <tr
                    style={{
                      textAlign: "center",
                      height: "40px",
                    }}
                  >
                    <td>
                      <b>Total</b>
                    </td>
                    <td
                      style={{
                        backgroundColor: "#99FE8E",
                        textAlign: "right",
                      }}
                    >
                      <b>
                        {formatter.format(
                          parseFloat(totaldebit.current).toFixed(2)
                        )}
                      </b>
                    </td>
                    <td
                      style={{
                        backgroundColor: "#99FE8E",
                        textAlign: "right",
                      }}
                    >
                      <b>
                        {formatter.format(
                          parseFloat(totalcredit.current).toFixed(2)
                        )}
                      </b>
                    </td>
                  </tr>
                </table>
              </div>
            </Col>
          </Row>
        </>
      );
    }
  };
  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Trail balance</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background main-frame">{Rendercontent()}</div>
    </>
  );
};
// const mapStateToProps = (state) => {
//   return {
//     businessprofile: state.settings.businessprofile,
//   };
// };

export default connect(null, { getAllChartofaccounts, getJournalSearchResult })(
  Trailbalance
);
