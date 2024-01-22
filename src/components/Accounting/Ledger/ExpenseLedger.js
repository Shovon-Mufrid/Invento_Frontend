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
  Spin,
} from "antd";
const { Content } = Layout;
const { RangePicker } = DatePicker;
const { Option } = Select;

const ExpenseLedger = ({ getAllChartofaccounts, getJournalSearchResult }) => {
  const componentRef = useRef();
  const [charts, setcharts] = useState([]);
  const [journals, setjournals] = useState([]);
  //   const [outletlist, setoutletlist] = useState([]);
  const [type, setType] = useState("date");
  const [loading, setloading] = useState(true);
  const [reload, setreload] = useState(false);
  const start = useRef("");
  const end = useRef("");
  const total_net_sale = useRef(0);
  const total_cost_of_goods = useRef(0);
  const gross_profit = useRef(0);
  const total_operating_expense = useRef(0);
  const operating_income = useRef(0);
  const total_owners_equity = useRef(0);
  const income_befor_tax = useRef(0);
  const total_tax = useRef(0);
  const income = useRef(0);
  const sl = useRef(0);
  var formatter = new Intl.NumberFormat("en-IN");
  //   const location = useRef("");

  useEffect(() => {
    getAllChartofaccounts().then((result) => {
      setcharts(result);
    });
  }, []);
  useEffect(() => {
    total_operating_expense.current = 0;
    getJournalSearchResult("", start.current, end.current).then((result) => {
      setjournals(result);
      setloading(false);
    });
  }, [reload]);

  const rendertable = (chart, target) => {
    for (let i = 0; i < journals.length; i++) {
      if (chart.Financial_statement == "Income statement") {
        if (journals[i].chartofaccount == chart.id) {
          console.log(journals[i]);
          return;
        }
      }
    }
  };

  const accountRender = (chart, target) => {
    if (loading) {
      return <Skeleton active />;
    } else {
      let debit = 0;
      let credit = 0;
      let sum = 0;

      for (let i = 0; i < journals.length; i++) {
        if (chart.Financial_statement == "Income statement") {
          if (journals[i].chartofaccount == chart.id) {
            console.log(journals[i]);
            if (journals[i].type == "Debit") {
              debit = parseFloat(debit) + parseFloat(journals[i].amount);
            } else {
              credit = parseFloat(credit) + parseFloat(journals[i].amount);
            }
          }
        }
      }
      if ("total_net_sale" == target) {
        //fixation for purchase discount on revenue
        sum = parseFloat(credit) - parseFloat(debit);
      } else {
        if (
          chart.Financial_statement == "Income statement" &&
          chart.normally_Debit == "Debit"
        ) {
          sum = parseFloat(debit) - parseFloat(credit);
        } else {
          sum = parseFloat(credit) - parseFloat(debit);
        }
      }
      if ("total_net_sale" == target) {
        total_net_sale.current =
          parseFloat(total_net_sale.current) + parseFloat(sum);
      } else if ("total_cost_of_goods" == target) {
        total_cost_of_goods.current =
          parseFloat(total_cost_of_goods.current) + parseFloat(sum);
      } else if ("total_operating_expense" == target) {
        total_operating_expense.current =
          parseFloat(total_operating_expense.current) + parseFloat(sum);
      } else if ("income_befor_tax" == target) {
        total_owners_equity.current =
          parseFloat(total_owners_equity.current) + parseFloat(sum);
      } else if ("tax" == target) {
        total_tax.current = parseFloat(total_tax.current) + parseFloat(sum);
      }
      gross_profit.current =
        parseFloat(total_net_sale.current) -
        parseFloat(total_cost_of_goods.current);
      operating_income.current =
        parseFloat(gross_profit.current) -
        parseFloat(total_operating_expense.current);
      income_befor_tax.current =
        parseFloat(operating_income.current) +
        parseFloat(total_owners_equity.current);
      income.current =
        parseFloat(income_befor_tax.current) - parseFloat(total_tax.current);
      if (
        chart.Financial_statement == "Income statement" &&
        target != "total_cost_of_goods" &&
        target != "total_net_sale" &&
        sum > 0
      ) {
        return (
          <>
            {journals.map((journal) => {
              if (chart.Financial_statement == "Income statement") {
                if (journal.chartofaccount == chart.id) {
                  return (
                    <>
                      <Row>
                        <Col span={16}>{journal.details}</Col>
                        <Col span={4}>
                          {moment(journal.created).format("DD-MM-YYYY")}
                        </Col>
                        <Col span={2}>{journal.type}</Col>
                        <Col span={2} style={{ textAlign: "right" }}>
                          {formatter.format(
                            parseFloat(journal.amount).toFixed(2)
                          )}
                        </Col>
                      </Row>
                    </>
                  );
                }
              }
            })}
            <Row>
              <Col span={20}>
                <h3>{chart.account_name}</h3>
              </Col>
              <Col span={4} style={{ textAlign: "right" }}>
                <h3>{formatter.format(parseFloat(sum).toFixed(2))}</h3>
              </Col>
            </Row>

            <br />
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
            Select a date range to generate the report :
            <RangePicker
              picker={type}
              onChange={(value) => {
                if (value) {
                  start.current = value[0].format("YYYY-MM-DD") + "T00:00:00Z";
                  end.current = value[1].format("YYYY-MM-DD") + "T23:59:59Z";
                  setloading(true);
                  setreload(!reload);
                }
              }}
            />
          </Space>
        </Col>

        <Col span={4}>
          <ReactToPrint
            trigger={() => <Button type="primary">Print Trail Balance</Button>}
            content={() => componentRef.current}
          />
        </Col>
      </Row>
    );
  };

  const Rendercontent = () => {
    return (
      <>
        <Row>
          <Col
            span={24}
            style={{ padding: "1rem", border: "1px solid whitesmoke" }}
          >
            {SwitchablePicker()}
            <Divider />
            {/* <RenderTable List={data} /> */}
            <Spin spinning={loading}>
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
                        <h2>Anzara</h2>
                        <h3>Expense Report</h3>
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
                </table>
                <Divider />

                {charts.map((chart) => {
                  if (
                    chart.account_code > 10000 &&
                    "Expense" == chart.Group[0].account_name &&
                    "Cost of Goods sold" != chart.account_name &&
                    "Cost of Goods sold" != chart.Sub_group &&
                    chart.account_code != 400010019
                  ) {
                    return accountRender(chart, "total_operating_expense");
                  }
                })}

                <Row>
                  <Col span={20}>
                    {" "}
                    <h3
                      style={{
                        borderBottom: "2px solid black",
                      }}
                    >
                      Total operating expense
                    </h3>
                  </Col>
                  <Col span={4}>
                    <h3
                      style={{
                        textAlign: "right",
                        borderBottom: "2px solid black",
                      }}
                    >
                      {formatter.format(
                        parseFloat(total_operating_expense.current).toFixed(2)
                      )}
                    </h3>
                  </Col>
                </Row>

                <Divider />
              </div>
            </Spin>
          </Col>
        </Row>
      </>
    );
  };
  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Expense Report</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background main-frame">{Rendercontent()}</div>
    </>
  );
};

export default connect(null, { getAllChartofaccounts, getJournalSearchResult })(
  ExpenseLedger
);
