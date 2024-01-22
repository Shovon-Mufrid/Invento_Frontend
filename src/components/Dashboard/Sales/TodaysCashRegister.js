import React, { Component, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";

import { getAllAccount } from "../../../actions/accountsAction";
import { getJournalSearchResult } from "../../../actions/journalAction";

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
} from "antd";
const { Content } = Layout;
const { Option } = Select;

const Dashboard = ({
  getJournalSearchResult,
  getAllAccount,
  Auth,
  location,
  loading,
  setloading,
  reload,
  setreload,
}) => {
  var currentdate = new Date();
  const [List, setList] = useState([]);
  let total_payments = useRef([]);
  var datetime =
    currentdate.getFullYear() +
    "-" +
    (currentdate.getMonth() + 1) +
    "-" +
    currentdate.getDate() +
    "T00:00:00";

  const cash = useRef(0);
  const bank = useRef(0);
  const mobile = useRef(0);
  const [accounts, setaccounts] = useState([]);
  const [journals, setjournals] = useState([]);
  const [outletlist, setoutletlist] = useState([]);
  const totalcash = useRef(0);
  const totalpetty = useRef(0);

  useEffect(() => {
    getAllAccount().then((result) => {
      setaccounts(result);
    });
    getJournalSearchResult("", datetime, "", "", "").then((result) => {
      totalcash.current = 0;
      setjournals(result);
      setloading(false);
    });
  }, [reload, location.current]);

  // useEffect(() => {
  //   totalcash.current = 0;
  //   setloading(true);
  //   for (let i = 0; i < total_payments.current.length; i++) {
  //     total_payments.current[i].payment = 0;
  //     total_payments.current[i].total = 0;
  //   }
  // }, [reload, location.current]);

  const Accounts_render = (account) => {
    let total = 0;
    for (let i = 0; i < journals.length; i++) {
      if (
        journals[i].account == account.id &&
        journals[i].invoice > 0
        // || journals[i].purchasee > 0
      ) {
        if (journals[i].outlet == location.current) {
          if (journals[i].increase) {
            total += parseFloat(journals[i].amount);
          } else {
            total -= parseFloat(journals[i].amount);
          }
        } else if (location.current == "") {
          if (journals[i].increase) {
            total += parseFloat(journals[i].amount);
          } else {
            total -= parseFloat(journals[i].amount);
          }
        }
      }
    }
    totalcash.current += parseFloat(total);
    if (total > 0) {
      return (
        <>
          <Row>
            <Col span={20}>
              <p>{account.name}</p>
            </Col>
            <Col span={4} style={{ textAlign: "right" }}>
              {parseFloat(total).toFixed(2)}
            </Col>
          </Row>
        </>
      );
    }
  };

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
                <Col span={24}>
                  <Card
                    title="Today's cash register"
                    className="summary_card transactions stock"
                    bordered={true}
                    // extra={<> Total: {totalcash.current}</>}
                  >
                    {accounts.map((account) => {
                      return Accounts_render(account);
                    })}
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
  };
};

export default connect(mapStateToProps, {
  getAllAccount,
  getJournalSearchResult,
})(Dashboard);
