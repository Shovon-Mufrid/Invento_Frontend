import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import ReactToPrint from "react-to-print";

// import { getAllOutlet } from "../../../actions/warehouseAction";
import {
  getAllChartofaccounts,
  getSpecificChartofaccounts,
} from "../../../actions/chartofaccountsAction";
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
  AutoComplete,
  Input,
  Spin,
} from "antd";
const { Content } = Layout;
const { RangePicker } = DatePicker;
const { Option } = Select;
const { Search } = Input;

const Trailbalance = ({
  getAllChartofaccounts,
  getJournalSearchResult,
  getSpecificChartofaccounts,
}) => {
  const componentRef = useRef();
  const [charts, setcharts] = useState([]);
  const [journals, setjournals] = useState([]);
  //   const [outletlist, setoutletlist] = useState([]);
  const [type, setType] = useState("date");
  const [loading, setloading] = useState(true);
  const [reload, setreload] = useState(false);
  var currentdate = new Date();
  var datetime =
    currentdate.getFullYear() +
    "-" +
    (currentdate.getMonth() + 1) +
    "-" +
    "1" +
    "T00:00:00";
  const start = useRef("");
  const end = useRef("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const selectedchartofaccount = useRef("");
  const selectedaccount = useRef("");
  const totaldebit = useRef(0);
  const totalcredit = useRef(0);
  const sl = useRef(0);
  const invoiceno = useRef("");
  const purchaseno = useRef("");
  const contactno = useRef("");
  const spinning = useRef(false);
  var formatter = new Intl.NumberFormat("en-IN");
  //   const location = useRef("");

  useEffect(() => {
    getAllChartofaccounts().then((result) => {
      setcharts(result);
      setloading(false);
    });
  }, []);
  useEffect(() => {
    if (spinning.current) {
      totaldebit.current = 0;
      totalcredit.current = 0;
      getJournalSearchResult(
        selectedchartofaccount.current,
        // "",
        start.current,
        end.current,
        selectedaccount.current,
        "",
        invoiceno.current,
        purchaseno.current,
        contactno.current
      ).then((result) => {
        spinning.current = false;
        result.reverse();
        setjournals(result);
        setloading(false);
        // setreload(false);
      });
    }
  }, [reload]);
  const renderTable = (totalindex, debitentry, creditentry) => {
    let result = "";

    return Array.apply(null, Array(totalindex)).map((data, index) => {
      return (
        <tr>
          <td style={{ textAlign: "center" }}>
            {debitentry[index]
              ? moment(debitentry[index].created).format("DD-MM-YYYY")
              : " "}
          </td>
          <td style={{ textAlign: "center" }}>
            {debitentry[index] ? debitentry[index].details : " "}
          </td>
          <td style={{ textAlign: "right", color: "green" }}>
            {debitentry[index]
              ? formatter.format(debitentry[index].amount)
              : " "}
          </td>
          <td style={{ textAlign: "center" }}>
            {creditentry[index]
              ? moment(creditentry[index].created).format("DD-MM-YYYY")
              : " "}
          </td>
          <td style={{ textAlign: "center" }}>
            {creditentry[index] ? creditentry[index].details : " "}
          </td>
          <td style={{ textAlign: "right", color: "green" }}>
            {creditentry[index]
              ? formatter.format(creditentry[index].amount)
              : " "}
          </td>
        </tr>
      );
    });
  };

  const accountRender = (chart) => {
    if (loading) {
      return <Skeleton active />;
    } else {
      let debit = 0;
      let credit = 0;
      let debitentry = [];
      let creditentry = [];
      let totalindex = 0;
      for (let i = 0; i < journals.length; i++) {
        if (journals[i].chartofaccount == chart.id) {
          if (journals[i].type == "Debit") {
            debit = parseFloat(debit) + parseFloat(journals[i].amount);
            debitentry.push(journals[i]);
          } else {
            credit = parseFloat(credit) + parseFloat(journals[i].amount);
            creditentry.push(journals[i]);
          }
        }
      }
      if (debitentry.length >= creditentry.length) {
        totalindex = debitentry.length;
      } else {
        totalindex = creditentry.length;
      }
      if (totalindex > 0) {
        return (
          <>
            <h3 style={{ textAlign: "center" }}>{chart.account_name}</h3>
            <table className="account_table" style={{ width: "100%" }}>
              <tr style={{ background: "lightgray" }}>
                <td colSpan={3} style={{ textAlign: "center" }}>
                  <b> Debit</b>
                </td>
                <td colSpan={3} style={{ textAlign: "center" }}>
                  <b>Credit</b>
                </td>
              </tr>
              <tr style={{ background: "#f0f0f0" }}>
                <td style={{ width: "10%", textAlign: "center" }}>
                  <b>Date</b>
                </td>
                <td style={{ width: "30%", textAlign: "center" }}>
                  <b>Particulars</b>
                </td>
                <td style={{ width: "10%", textAlign: "right" }}>
                  <b>Amount</b>
                </td>
                <td style={{ width: "10%", textAlign: "center" }}>
                  <b>Date</b>
                </td>
                <td style={{ width: "30%", textAlign: "center" }}>
                  <b>Particulars</b>
                </td>
                <td style={{ width: "10%", textAlign: "right" }}>
                  <b>Amount</b>
                </td>
              </tr>
              {renderTable(totalindex, debitentry, creditentry)}
              <tr style={{ background: "#f0f0f0" }}>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  Sub Total
                </td>

                <td style={{ textAlign: "right", color: "green" }}>
                  {formatter.format(parseFloat(debit).toFixed(2))}
                </td>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  Sub Total
                </td>

                <td style={{ textAlign: "right", color: "green" }}>
                  {formatter.format(parseFloat(credit).toFixed(2))}
                </td>
              </tr>
              {chart.normally_Debit == "Debit" ? (
                <tr style={{ background: "lightgray" }}>
                  <td colSpan={5}>
                    <b>Total Balance ({chart.normally_Debit})</b>
                  </td>

                  <td style={{ textAlign: "right", color: "green" }}>
                    <b>
                      {formatter.format(
                        parseFloat(
                          parseFloat(debit) - parseFloat(credit)
                        ).toFixed(2)
                      )}
                    </b>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colSpan={5}>
                    <b>Total Balance ({chart.normally_Debit})</b>
                  </td>

                  <td style={{ textAlign: "right", color: "green" }}>
                    <b>
                      {formatter.format(
                        parseFloat(
                          parseFloat(credit) - parseFloat(debit)
                        ).toFixed(2)
                      )}
                    </b>
                  </td>
                </tr>
              )}
            </table>
            <Divider />
          </>
        );
      }
    }
  };

  const SwitchablePicker = () => {
    return (
      <Row style={{ width: "100%" }}>
        <Col span={5}>
          <RangePicker
            picker={type}
            onChange={(value) => {
              if (value) {
                start.current = value[0].format("YYYY-MM-DD") + "T00:00:00";
                end.current = value[1].format("YYYY-MM-DD") + "T23:59:59";
                totaldebit.current = 0;
                totalcredit.current = 0;
                // setStartTime(value[0].format("YYYY-MM-DD") + "T00:00:00");
                // setEndTime(value[1].format("YYYY-MM-DD") + "T23:59:59");
                spinning.current = true;
                setreload(!reload);
              }
            }}
          />
        </Col>
        <Col span={4}>
          <Select
            placeholder="Select an Account"
            showSearch
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            style={{ width: "95%" }}
            onChange={(value) => {
              if (value != "") {
                getSpecificChartofaccounts(value).then((result) => {
                  selectedchartofaccount.current = result.account_code;
                  spinning.current = true;
                  setreload(!reload);
                });
              } else {
                selectedchartofaccount.current = value;
                spinning.current = true;
                setreload(!reload);
              }
            }}
          >
            <Option value="">All</Option>;
            {charts.map((item) => {
              return <Option value={item.id}>{item.account_name}</Option>;
            })}
          </Select>
        </Col>

        <Col span={13}>
          <Space>
            <Search
              placeholder="Invoice no."
              onChange={(value) => {
                invoiceno.current = value.target.value;
              }}
              onSearch={(value) => {
                invoiceno.current = value;
                spinning.current = true;
                setreload(!reload);
              }}
              style={{ width: "100%" }}
            />
            <Search
              placeholder="Purchase no."
              onChange={(value) => {
                purchaseno.current = value.target.value;
              }}
              onSearch={(value) => {
                purchaseno.current = value;
                spinning.current = true;
                setreload(!reload);
              }}
              style={{ width: "100%" }}
            />
            <Search
              placeholder="Contact no."
              onChange={(value) => {
                contactno.current = value.target.value;
              }}
              onSearch={(value) => {
                contactno.current = value;
                spinning.current = true;
                setreload(!reload);
              }}
              style={{ width: "100%" }}
            />
          </Space>
        </Col>

        <Col span={2}>
          {/* <Excelldownload data={data} data1={data1} /> */}
          <ReactToPrint
            trigger={() => <Button type="primary">Print Ledger</Button>}
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
                width: "100%",
              }}
            >
              <Spin spinning={spinning.current} style={{ width: "100%" }}>
                {SwitchablePicker()}
                <Divider />

                <div ref={componentRef} style={{ padding: "10px" }}>
                  {charts.map((chart) => {
                    if (
                      chart.account_code > 10000 &&
                      "Assets" == chart.Group[0].account_name
                    ) {
                      return accountRender(chart);
                    }
                  })}

                  {charts.map((chart) => {
                    if (
                      chart.account_code > 10000 &&
                      "Liabilities" == chart.Group[0].account_name
                    ) {
                      return accountRender(chart);
                    }
                  })}

                  {charts.map((chart) => {
                    if (
                      chart.account_code > 10000 &&
                      "Expense" == chart.Group[0].account_name
                    ) {
                      return accountRender(chart);
                    }
                  })}

                  {charts.map((chart) => {
                    if (
                      chart.account_code > 10000 &&
                      "Revenue" == chart.Group[0].account_name
                    ) {
                      return accountRender(chart);
                    }
                  })}

                  {charts.map((chart) => {
                    if (
                      chart.account_code > 10000 &&
                      "Owner's equity" == chart.Group[0].account_name
                    ) {
                      return accountRender(chart);
                    }
                  })}
                </div>
              </Spin>
            </Col>
          </Row>
        </>
      );
    }
  };
  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Ledger Report</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background main-frame">{Rendercontent()}</div>
    </>
  );
};

export default connect(null, {
  getAllChartofaccounts,
  getJournalSearchResult,
  getSpecificChartofaccounts,
})(Trailbalance);
