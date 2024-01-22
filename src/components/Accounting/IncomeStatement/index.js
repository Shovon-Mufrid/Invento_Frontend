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
  //   const location = useRef("");

  useEffect(() => {
    getAllChartofaccounts().then((result) => {
      setcharts(result);
      setloading(false);
      setreload(false);
    });
  }, []);
  // useEffect(() => {
  //   getJournalSearchResult("", start.current, end.current).then((result) => {
  //     setjournals(result);
  //     setloading(false);
  //     setreload(false);
  //   });
  // }, [reload]);

  const accountRender = (chart, target) => {
    if (loading) {
      return <Skeleton active />;
    } else {
      let debit = 0;
      let credit = 0;
      let sum = 0;

      if (chart.Financial_statement == "Income statement") {
        sum = chart.amount;
      }
      if ("total_net_sale" == target && chart.normally_Debit == "Debit") {
        // fixation for debit entries in revenue (ex: sales discount)
        sum = -1 * chart.amount;
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
        sum > 0 &&
        chart.status == "Debit"
      ) {
        return (
          <>
            <Row>
              <Col span={20}>
                <h3>{chart.account_name}</h3>
              </Col>
              <Col span={4} style={{ textAlign: "right" }}>
                <h3>{parseFloat(sum).toFixed(2)}</h3>
              </Col>
            </Row>
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
                  setreload(true);
                }
              }}
            /> */}
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
                        <h3>Income statement</h3>
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
                    "Revenue" == chart.Group[0].account_name
                  ) {
                    return accountRender(chart, "total_net_sale");
                  }
                })}
                {charts.map((chart) => {
                  console.log(chart);
                  if (
                    (chart.account_code > 10000 &&
                      "Cost of Goods sold" == chart.account_name) ||
                    "Cost of Goods sold" == chart.Sub_group
                  ) {
                    return accountRender(chart, "total_cost_of_goods");
                  }
                })}
                <Row>
                  <Col span={20}>
                    <h3>Total Revenue</h3>
                  </Col>
                  <Col span={4} style={{ textAlign: "right" }}>
                    <h3>{parseFloat(total_net_sale.current).toFixed(2)}</h3>
                  </Col>
                </Row>
                <Row>
                  <Col span={20}>
                    <h3>Cost of Goods Sold</h3>
                  </Col>
                  <Col span={4} style={{ textAlign: "right" }}>
                    <h3>
                      {parseFloat(total_cost_of_goods.current).toFixed(2)}
                    </h3>
                  </Col>
                </Row>

                <Row>
                  <Col
                    span={20}
                    style={{
                      borderBottom: "2px solid black",
                      borderTop: "2px solid black",
                    }}
                  >
                    {" "}
                    <h3>Gross profit</h3>
                  </Col>
                  <Col
                    span={4}
                    style={{
                      textAlign: "right",
                      borderBottom: "2px solid black",
                      borderTop: "2px solid black",
                    }}
                  >
                    <h3>{parseFloat(gross_profit.current).toFixed(2)}</h3>
                  </Col>
                </Row>
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
                  <Col span={4}>
                    {" "}
                    <h3
                      style={{
                        borderBottom: "2px solid black",
                      }}
                    >
                      Total operating expense
                    </h3>
                  </Col>
                  <Col span={4} offset={16}>
                    <h3
                      style={{
                        textAlign: "right",
                        borderBottom: "2px solid black",
                      }}
                    >
                      {parseFloat(total_operating_expense.current).toFixed(2)}
                    </h3>
                  </Col>
                </Row>

                <Row>
                  <Col span={20}>
                    {" "}
                    <h2
                      style={{
                        borderBottom: "2px solid black",
                        borderTop: "2px solid black",
                      }}
                    >
                      Total operating income
                    </h2>
                  </Col>
                  <Col span={4} style={{ textAlign: "right" }}>
                    <h2
                      style={{
                        textAlign: "right",
                        borderBottom: "2px solid black",
                        borderTop: "2px solid black",
                      }}
                    >
                      {parseFloat(operating_income.current).toFixed(2)}
                    </h2>
                  </Col>
                </Row>
                <Divider />
                {charts.map((chart) => {
                  if (
                    chart.account_code > 10000 &&
                    "Owner's equity" == chart.Group[0].account_name
                  ) {
                    return accountRender(chart, "income_befor_tax");
                  }
                })}

                <Row>
                  <Col span={20}>
                    {" "}
                    <h2
                      style={{
                        borderBottom: "2px solid black",
                        borderTop: "2px solid black",
                      }}
                    >
                      Income before Taxes
                    </h2>
                  </Col>
                  <Col span={4} style={{ textAlign: "right" }}>
                    <h2
                      style={{
                        textAlign: "right",
                        borderBottom: "2px solid black",
                        borderTop: "2px solid black",
                      }}
                    >
                      {parseFloat(income_befor_tax.current).toFixed(2)}
                    </h2>
                  </Col>
                </Row>
                <Divider />
                {charts.map((chart) => {
                  if (
                    (chart.account_code > 10000 &&
                      "Liabilities" == chart.Group[0].account_name) ||
                    chart.account_code == 400010019
                  ) {
                    return accountRender(chart, "tax");
                  }
                })}

                <Row>
                  <Col span={20}>
                    {" "}
                    <h2
                      style={{
                        borderBottom: "2px solid black",
                        borderTop: "2px solid black",
                      }}
                    >
                      Net income
                    </h2>
                  </Col>
                  <Col span={4} style={{ textAlign: "right" }}>
                    <h2
                      style={{
                        textAlign: "right",
                        borderBottom: "2px solid black",
                        borderTop: "2px solid black",
                      }}
                    >
                      {parseFloat(income.current).toFixed(2)}
                    </h2>
                  </Col>
                </Row>

                <Divider />
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
        <Breadcrumb.Item>Income Statement</Breadcrumb.Item>
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
