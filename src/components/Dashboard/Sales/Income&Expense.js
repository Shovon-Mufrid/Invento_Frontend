import React, { Component, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";

import { Layout, Row, Col, Space, Select, Divider, Skeleton, Card } from "antd";
import { getJournalSearchResult } from "../../../actions/journalAction";

const Dashboard = ({ getJournalSearchResult, Auth, location }) => {
  var currentdate = new Date();
  const [loading, setloading] = useState(true);
  const [reload, setreload] = useState(false);
  const [List, setList] = useState([]);
  const income = useRef(0);
  var formatter = new Intl.NumberFormat("en-IN");
  const expense = useRef(0);
  var datetime =
    currentdate.getFullYear() +
    "-" +
    (currentdate.getMonth() + 1) +
    "-" +
    currentdate.getDate() +
    "T00:00:00";
  var monthstart =
    currentdate.getFullYear() +
    "-" +
    (currentdate.getMonth() + 1) +
    "-" +
    "1" +
    "T00:00:00Z";

  useEffect(() => {
    setloading(true);
    income.current = 0;
    expense.current = 0;
    getJournalSearchResult("", monthstart, "", "", "100040").then((result) => {
      let increase_revenue = 0;
      let decrease_revenue = 0;
      for (let i = 0; i < result.length; i++) {
        if (result[i].invoice > 0) {
          if (result[i].increase) {
            increase_revenue += parseFloat(result[i].amount);
          } else {
            decrease_revenue += parseFloat(result[i].amount);
          }
        }
      }
      getJournalSearchResult("", monthstart, "", "", "100010002").then(
        (bank) => {
          for (let i = 0; i < bank.length; i++) {
            if (bank[i].invoice > 0) {
              if (bank[i].increase) {
                increase_revenue += parseFloat(bank[i].amount);
              } else {
                decrease_revenue += parseFloat(bank[i].amount);
              }
            }
          }
          income.current = increase_revenue - decrease_revenue;
          getJournalSearchResult("", monthstart, "", "", "4000").then(
            (new_result) => {
              let increase_expense = 0;
              let decrease_expense = 0;
              for (let i = 0; i < new_result.length; i++) {
                if (new_result[i].increase) {
                  increase_expense += parseFloat(new_result[i].amount);
                } else {
                  decrease_expense += parseFloat(new_result[i].amount);
                }
              }

              //puchase count for cash

              for (let i = 0; i < result.length; i++) {
                if (result[i].purchasee > 0) {
                  if (!result[i].increase) {
                    increase_expense += parseFloat(result[i].amount);
                  } else {
                    decrease_expense += parseFloat(result[i].amount);
                  }
                }
              }

              //puchase count for bank

              for (let i = 0; i < bank.length; i++) {
                if (bank[i].purchasee > 0) {
                  if (!bank[i].increase) {
                    increase_expense += parseFloat(bank[i].amount);
                  } else {
                    decrease_expense += parseFloat(bank[i].amount);
                  }
                }
              }
              expense.current = increase_expense - decrease_expense;
              setloading(false);
            }
          );
        }
      );
    });
  }, [reload, location.current]);

  const Rendercontent = () => {
    if (loading) {
      return (
        <>
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
              <Row>
                <Col
                  span={24}
                  style={{
                    marginBottom: "1rem",
                    border: "1px solid whitesmoke",
                  }}
                >
                  <Card
                    title="Monthly (BDT)"
                    className="summary_card transactions stock"
                    bordered={true}
                    // extra={<> Total : {List.length}</>}
                  >
                    <Row>
                      <Col span={12} style={{ textAlign: "center" }}>
                        <h3>Cash In</h3>
                        {formatter.format(income.current)}
                      </Col>
                      <Col span={12} style={{ textAlign: "center" }}>
                        <h3>Cash Out</h3>
                        {formatter.format(expense.current)}
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </>
      );
    }
  };

  return (
    <>
      <div>{Rendercontent()}</div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    Auth: state.auth,
    allnotificationList: state.notifications.allnotificationList,
  };
};

export default connect(mapStateToProps, {
  getJournalSearchResult,
})(Dashboard);
