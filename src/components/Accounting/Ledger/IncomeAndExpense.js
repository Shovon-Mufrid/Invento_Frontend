import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import Sidebar from "../../layout/Sidebar";
import Navbar from "../../layout/Navbar";
import ReactToPrint from "react-to-print";

import moment from "moment";
import { getJournalSearchResult } from "../../../actions/journalAction";

import {
  Layout,
  Breadcrumb,
  Row,
  Col,
  DatePicker,
  Space,
  Select,
  Divider,
  Skeleton,
  Button,
} from "antd";
const { Content } = Layout;
const { RangePicker } = DatePicker;
const { Option } = Select;

const IncomeAndExpense = ({
  getJournalSearchResult,
}) => {
  const componentRef = useRef();
  const [type, setType] = useState("date");
  const [loading, setloading] = useState(true);
  const [reload, setreload] = useState(false);
  const [dataFetched, setDatFetched] = useState(false);
  const [data, setData] = useState([]);
  const start = useRef("");
  const end = useRef("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const totalIncome = useRef(0);
  const totalExpense = useRef(0);

  useEffect(() => {
    setloading(false);
  }, [reload]);

  useEffect(() => {
    setData([]);
    totalIncome.current = 0;
    totalExpense.current = 0;
   
    getJournalSearchResult("", start.current, end.current, "", "5000").then(
      (result) => {
        console.log(result);

        result.forEach((element) => {
          if (element.type == "Debit") {
            totalExpense.current =
              parseFloat(totalExpense.current) + parseFloat(element.amount);
          } else {
            totalIncome.current =
              parseFloat(totalIncome.current) + parseFloat(element.amount);
          }
        });
        setData((data) => [...data, ...result]);
        setDatFetched(true);
        setDatFetched(false);
      }
    );
    getJournalSearchResult("", start.current, end.current, "", "4000").then(
      (result) => {
        console.log(result);
        result.forEach((element) => {
          if (element.type == "Debit") {
            totalExpense.current =
              parseFloat(totalExpense.current) + parseFloat(element.amount);
          } else {
            totalIncome.current =
              parseFloat(totalIncome.current) + parseFloat(element.amount);
          }
        });
        setData((data) => [...data, ...result]);
        setDatFetched(true);
        setDatFetched(false);
      }
    );
  }, [startTime, endTime]);
  
  useEffect(() => {
    let d = [...data];
    let sorted = d.sort((a, b) => new Date(b.created) - new Date(a.created));
    sorted.reverse();
    setData(sorted);
    console.log(data);
    console.log(totalExpense.current);
    console.log(totalIncome.current);
    setreload(true);
  }, [dataFetched]);

  const SwitchablePicker = () => {
    return (
      <Row>
        <Col span={10}>
          <Space>
            <RangePicker
              picker={type}
              onChange={(value) => {
                if (value) {
                  start.current = value[0].format("YYYY-MM-DD") + "T00:00:00";
                  end.current = value[1].format("YYYY-MM-DD") + "T23:59:59";
                  totalIncome.current = 0;
                  totalExpense.current = 0;
                  setStartTime(value[0].format("YYYY-MM-DD") + "T00:00:00");
                  setEndTime(value[1].format("YYYY-MM-DD") + "T23:59:59");
                  setreload(true);
                }
              }}
            />
          </Space>
        </Col>

        <Col span={4}>
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
              style={{ padding: "1rem", border: "1px solid whitesmoke" }}
            >
              {SwitchablePicker()}
              <Divider />
              <div ref={componentRef} style={{ padding: "20px" }}>
                <table className="history_table">
                  <tr>
                    <td>Date</td>
                    <td>Particular</td>
                    {/* <td>Income</td> */}
                    <td>Expense</td>
                  </tr>
                  {data.map((item, index) => {
                    return (
                      <>
                        <tr>
                          <td>
                            {moment(item.created, ["YYYY-MM-DD"]).format(
                              "DD-MM-YYYY"
                            )}
                          </td>
                          <td>{item.details}</td>
                          {/* <td>{item.type == "Credit" ? item.amount : ""}</td> */}
                          <td>{item.type == "Debit" ? item.amount : ""}</td>
                        </tr>
                      </>
                    );
                  })}
                  <tr>
                    <td colSpan={2}>Total</td>
                    {/* <td>{parseFloat(totalIncome.current).toFixed(2)}</td> */}
                    <td>{parseFloat(totalExpense.current).toFixed(2)}</td>
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
      <Layout className="window-frame">
        <Sidebar />
        <Layout className="site-layout">
          <Navbar />
          <Content className="main-frame-content">
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>Income & Expense</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background main-frame">
              {Rendercontent()}
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    businessprofile: state.settings.businessprofile,
  };
};

export default connect(mapStateToProps, {
  getJournalSearchResult,
})(IncomeAndExpense);
