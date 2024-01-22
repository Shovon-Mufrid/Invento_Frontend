import React, { Component, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";


import { getProductSearchResult } from "../../../actions/productDetails";
import { Layout, Row, Col, Space, Select, Divider, Skeleton, Card } from "antd";
const { Content } = Layout;
const { Option } = Select;

const Dashboard = ({ getProductSearchResult, Auth, location }) => {
  var currentdate = new Date();
  const [loading, setloading] = useState(true);
  const [reload, setreload] = useState(false);
  const [List, setList] = useState([]);
  var datetime =
    currentdate.getFullYear() +
    "-" +
    (currentdate.getMonth() + 1) +
    "-" +
    currentdate.getDate() +
    "T00:00:00Z";
  var monthstart =
    currentdate.getFullYear() +
    "-" +
    (currentdate.getMonth() - 1) +
    "-" +
    "1" +
    "T00:00:00Z";
  // const location = useRef(Auth.profile.branch.id);
  const [invoice, setinvoice] = useState([]);
  const [monthlyinvoice, setmonthlyinvoice] = useState([]);
  let total_invoice = useRef(0);
  let total_sales = useRef(0);
  let total_payments = useRef([]);

  let total_payment = useRef(0);
  let total_due = useRef(0);
  let total_tax = useRef(0);
  let total_costing = useRef(0);

  const [outletlist, setoutletlist] = useState([]);

  useEffect(() => {
    setloading(true);
    getProductSearchResult("", location.current, 20000).then((result) => {
      console.log(result);
      const arr = [];
      for (const item of result.results) {
        if (item.quantity <= item.Deatils[0].stock_alart_amount) {
          arr.push(item);
        }
      }
      setList(arr);
      setloading(false);
    });

    setloading(false);
  }, []);

  useEffect(() => {
    setloading(true);
    getProductSearchResult("", location.current, 20000).then((result) => {
      const arr = [];
      for (const item of result.results) {
        if (item.quantity <= item.Deatils[0].stock_alart_amount) {
          arr.push(item);
        }
      }
      setList(arr);
      setloading(false);
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
                    title="Low stock"
                    className="summary_card transactions stock"
                    bordered={true}
                    extra={<> Total : {List.length}</>}
                  >
                    {List.map((item, index) => {
                      if (index < 10) {
                        return (
                          <Row>
                            <Col span={20}>
                              <p>{item.title}</p>
                            </Col>
                            <Col span={4} style={{ textAlign: "right" }}>
                              <p>{item.quantity}</p>
                            </Col>
                          </Row>
                        );
                      }
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
    allnotificationList: state.notifications.allnotificationList,
  };
};

export default connect(mapStateToProps, {
  getProductSearchResult,
})(Dashboard);
