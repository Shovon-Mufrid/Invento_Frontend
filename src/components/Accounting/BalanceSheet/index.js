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
  var formatter = new Intl.NumberFormat("en-IN");
  const componentRef = useRef();
  const [charts, setcharts] = useState([]);
  const [journals, setjournals] = useState([]);
  //   const [outletlist, setoutletlist] = useState([]);
  const [type, setType] = useState("date");
  const [loading, setloading] = useState(true);
  const [reload, setreload] = useState(false);
  const start = useRef("");
  const end = useRef("");
  const non_current_Assets = useRef(0);
  const current_Assets = useRef(0);
  const Assets = useRef(0);
  const capital = useRef(0);
  const equity = useRef(0);
  const retained_earnings = useRef(0);
  const drawings = useRef(0);
  const liabilities = useRef(0);
  const OE = useRef(0);

  //   net income
  const total_net_sale = useRef(0);
  const total_cost_of_goods = useRef(0);
  const gross_profit = useRef(0);
  const total_operating_expense = useRef(0);
  const operating_income = useRef(0);
  const total_owners_equity = useRef(0);
  const income_befor_tax = useRef(0);
  const total_tax = useRef(0);
  const income = useRef(0);

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

      if (chart.Financial_statement == "Balance sheet") {
        sum = chart.amount;
      }
      if ("total_net_sale" == target && chart.normally_Debit == "Debit") {
        // fixation for debit entries in revenue (ex: sales discount)
        sum = -1 * chart.amount;
      }

      if ("non_current_Assets" == target) {
        non_current_Assets.current += parseFloat(sum);
      } else if ("current_Assets" == target) {
        current_Assets.current += parseFloat(sum);
      } else if ("liabilities" == target) {
        liabilities.current += parseFloat(sum);
      } else if ("capital" == target) {
        capital.current += parseFloat(sum);
      } else if ("retained_earnings" == target) {
        sum = parseFloat(sum) + parseFloat(income.current);
        console.log(sum);
        retained_earnings.current += parseFloat(sum);
      } else if ("drawings" == target) {
        drawings.current += parseFloat(sum);
      } else if ("equity" == target) {
        equity.current += parseFloat(sum);
      }
      Assets.current =
        parseFloat(non_current_Assets.current) +
        parseFloat(current_Assets.current);
      equity.current =
        capital.current + retained_earnings.current - drawings.current;
      OE.current = parseFloat(liabilities.current) + parseFloat(equity.current);

      if (chart.Financial_statement == "Balance sheet") {
        if (sum != 0) {
          return (
            <>
              <Row>
                <Col span={20}>
                  <h3>{chart.account_name}</h3>
                </Col>
                <Col span={4} style={{ textAlign: "right" }}>
                  <h3>{formatter.format(sum)}</h3>
                </Col>
              </Row>
            </>
          );
        }
      }
    }
  };

  //   net income
  const netincomeRender = (chart, target) => {
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
                        <h3>Balance sheet</h3>
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
                <h2>Assets</h2>

                {/* net income calculations start ------------------------ */}
                {charts.map((chart) => {
                  if (
                    chart.account_code > 10000 &&
                    "Revenue" == chart.Group[0].account_name
                  ) {
                    return netincomeRender(chart, "total_net_sale");
                  }
                })}
                {charts.map((chart) => {
                  if (
                    (chart.account_code > 10000 &&
                      "Cost of Goods sold" == chart.account_name) ||
                    "Cost of Goods sold" == chart.Sub_group
                  ) {
                    return netincomeRender(chart, "total_cost_of_goods");
                  }
                })}

                {charts.map((chart) => {
                  if (
                    chart.account_code > 10000 &&
                    "Expense" == chart.Group[0].account_name &&
                    "Cost of Goods sold" != chart.account_name &&
                    "Cost of Goods sold" != chart.Sub_group &&
                    chart.account_code != 400010019
                  ) {
                    return netincomeRender(chart, "total_operating_expense");
                  }
                })}
                {charts.map((chart) => {
                  if (
                    chart.account_code > 10000 &&
                    "Owner's equity" == chart.Group[0].account_name
                  ) {
                    return netincomeRender(chart, "income_befor_tax");
                  }
                })}
                {charts.map((chart) => {
                  if (
                    (chart.account_code > 10000 &&
                      "Liabilities" == chart.Group[0].account_name) ||
                    chart.account_code == 400010019
                  ) {
                    return netincomeRender(chart, "tax");
                  }
                })}

                {/* net income calculations ends ------------------------ */}

                {charts.map((chart) => {
                  if (
                    chart.account_code > 10000 &&
                    "Assets" == chart.Group[0].account_name &&
                    "Current Asset" != chart.Sub_group &&
                    "Current Asset" != chart.account_name
                  ) {
                    return accountRender(chart, "non_current_Assets");
                  }
                })}
                <Row>
                  <Col span={4}>
                    {" "}
                    <h3 style={{ borderBottom: "2px solid black" }}>
                      Total non-current assets
                    </h3>
                  </Col>
                  <Col span={3} style={{ textAlign: "right" }} offset={17}>
                    <h3 style={{ borderBottom: "2px solid black" }}>
                      {formatter.format(non_current_Assets.current)}
                    </h3>
                  </Col>
                </Row>

                {charts.map((chart) => {
                  if (
                    chart.account_code > 10000 &&
                    ("Current Asset" == chart.Sub_group ||
                      "Current Asset" == chart.account_name)
                  ) {
                    return accountRender(chart, "current_Assets");
                  }
                })}
                <Row>
                  <Col span={4}>
                    {" "}
                    <h3 style={{ borderBottom: "2px solid black" }}>
                      Total current assets
                    </h3>
                  </Col>
                  <Col span={3} style={{ textAlign: "right" }} offset={17}>
                    <h3 style={{ borderBottom: "2px solid black" }}>
                      {formatter.format(current_Assets.current)}
                    </h3>
                  </Col>
                </Row>

                <Row>
                  <Col span={4}>
                    {" "}
                    <h3
                      style={{
                        borderBottom: "2px solid black",
                        borderTop: "2px solid black",
                      }}
                    >
                      Total assets
                    </h3>
                  </Col>
                  <Col span={20} style={{ textAlign: "right" }}>
                    <h3
                      style={{
                        borderBottom: "2px solid black",
                        borderTop: "2px solid black",
                      }}
                    >
                      {formatter.format(Assets.current)}
                    </h3>
                  </Col>
                </Row>
                <Divider />

                <h2>Liabilities</h2>

                {charts.map((chart) => {
                  if (
                    chart.account_code > 10000 &&
                    "Liabilities" == chart.Group[0].account_name
                  ) {
                    return accountRender(chart, "liabilities");
                  }
                })}
                <Row>
                  <Col span={4}>
                    {" "}
                    <h3 style={{ borderBottom: "2px solid black" }}>
                      Total liabilities
                    </h3>
                  </Col>
                  <Col span={3} style={{ textAlign: "right" }} offset={17}>
                    <h3 style={{ borderBottom: "2px solid black" }}>
                      {formatter.format(liabilities.current)}
                    </h3>
                  </Col>
                </Row>
                <Divider />
                <h2>Owner's equity </h2>

                {charts.map((chart) => {
                  if (
                    chart.account_code > 10000 &&
                    chart.account_code == 300010
                  ) {
                    return accountRender(chart, "capital");
                  }
                })}
                {charts.map((chart) => {
                  if (
                    chart.account_code > 10000 &&
                    chart.account_code == 300040
                  ) {
                    return accountRender(chart, "retained_earnings");
                  }
                })}
                {charts.map((chart) => {
                  if (
                    chart.account_code > 10000 &&
                    chart.account_code == 300020
                  ) {
                    return accountRender(chart, "drawings");
                  }
                })}
                <Row>
                  <Col span={4}>
                    {" "}
                    <h3 style={{ borderBottom: "2px solid black" }}>
                      Total owner's equity
                    </h3>
                  </Col>
                  <Col span={3} style={{ textAlign: "right" }} offset={17}>
                    <h3 style={{ borderBottom: "2px solid black" }}>
                      {formatter.format(equity.current)}
                    </h3>
                  </Col>
                </Row>

                <Row>
                  <Col span={10}>
                    {" "}
                    <h3
                      style={{
                        borderBottom: "2px solid black",
                        borderTop: "2px solid black",
                      }}
                    >
                      Total equity and liabilities
                    </h3>
                  </Col>
                  <Col span={14} style={{ textAlign: "right" }}>
                    <h3
                      style={{
                        borderBottom: "2px solid black",
                        borderTop: "2px solid black",
                      }}
                    >
                      {formatter.format(OE.current)}
                    </h3>
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
