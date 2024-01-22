import React, { Component, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";

import { getAllAccount } from "../../../actions/accountsAction";
import {
  getJournalSearchResult,
  getJournalSearchResultwithinvoice,
} from "../../../actions/journalAction";

import moment from "moment";

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
  Spin,
} from "antd";
const { Content } = Layout;
const { Option } = Select;

const CashRegister = ({
  getJournalSearchResult,
  getJournalSearchResultwithinvoice,
  getAllAccount,
  Auth,
  location,
  // loading,
  // setloading,
  reload,
  setreload,
  start,
  end,
  collectionType,
  total_data,
}) => {
  var inovicecount = 0;
  var currentdate = new Date();
  const [loading, setloading] = useState(true);
  const [List, setList] = useState([]);
  let total_payments = useRef([]);
  var formatter = new Intl.NumberFormat("en-IN");
  const cash = useRef(0);
  const bank = useRef(0);
  const mobile = useRef(0);
  const [accounts, setaccounts] = useState([]);
  const [journals, setjournals] = useState([]);
  const [outletlist, setoutletlist] = useState([]);
  const totalcash = useRef(0);
  const totalpetty = useRef(0);

  const current_due_collection = useRef(0);

  const now = moment();
  const isBetween = now.isBetween(start.current, end.current);
  console.log(isBetween);

  useEffect(() => {
    setloading(true);
    getAllAccount().then((result) => {
      setaccounts(result);
    });
    if (start.current != "" && end.current != "") {
      getJournalSearchResultwithinvoice(
        "",
        start.current,
        end.current,
        "",
        "1000"
      ).then((result) => {
        totalcash.current = 0;
        current_due_collection.current = 0;
        setjournals(result);
        setloading(false);
      });
    } else {
      setloading(false);
    }
  }, [reload]);

  const Accounts_render_previous_due = (account) => {
    let total = 0;

    for (let i = 0; i < journals.length; i++) {
      if (
        journals[i].account == account.id &&
        journals[i].invoice > 0 &&
        journals[i].Group == "Assets" &&
        journals[i].details.includes("Sell with invoice no:") &&
        moment(journals[i].invoiceDate).format("DD-MM-YYYY") !=
          moment(journals[i].created).format("DD-MM-YYYY") &&
        !moment(journals[i].invoiceDate, "YYYY-MM-DDTHH:mm:ss").isBetween(
          moment(start.current),
          moment(end.current)
        )
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
    // totalcash.current += parseFloat(total);
    if (total > 0) {
      return (
        <>
          <tr>
            <td>
              <b>{account.name} :</b>{" "}
            </td>
            <td style={{ textAlign: "right" }}>
              {formatter.format(parseFloat(total).toFixed(2))}
            </td>
          </tr>
        </>
      );
    }
  };

  const Accounts_render_due = (account) => {
    let total = 0;

    for (let i = 0; i < journals.length; i++) {
      if (
        journals[i].account == account.id &&
        journals[i].invoice > 0 &&
        journals[i].Group == "Assets" &&
        journals[i].details.includes("Sell with invoice no:") &&
        moment(journals[i].invoiceDate).format("DD-MM-YYYY") !=
          moment(journals[i].created).format("DD-MM-YYYY") &&
        moment(journals[i].invoiceDate, "YYYY-MM-DDTHH:mm:ss").isBetween(
          moment(start.current),
          moment(end.current)
        )
      ) {
        // console.log(journals[i]);
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
    current_due_collection.current += parseFloat(total);
    if (total > 0) {
      return (
        <>
          <tr>
            <td>
              <b>{account.name} :</b>{" "}
            </td>
            <td style={{ textAlign: "right" }}>
              {formatter.format(parseFloat(total).toFixed(2))}
            </td>
          </tr>
        </>
      );
    }
  };

  const Accounts_render_current = (account) => {
    let total = 0;
    let coount = 0;
    // console.log("------------------------");
    for (let i = 0; i < journals.length; i++) {
      if (
        journals[i].account == account.id &&
        journals[i].invoice > 0 &&
        journals[i].Group == "Assets" &&
        journals[i].details.includes("Sell with invoice no:") &&
        moment(journals[i].invoiceDate).format("DD-MM-YYYY") ==
          moment(journals[i].created).format("DD-MM-YYYY")
      ) {
        // console.log(journals[i]);
        coount++;
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
          <tr>
            <td>
              <b>{account.name} :</b>{" "}
            </td>
            <td style={{ textAlign: "right" }}>
              {formatter.format(parseFloat(total).toFixed(2))}
            </td>
          </tr>
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
            <Col span={7}>
              <h3>Collection</h3>
              {/* <p>{start.current}</p>
              <p>{end.current}</p> */}
              <table style={{ width: "100%" }}>
                {accounts.map((account) => {
                  return Accounts_render_current(account);
                })}
              </table>
            </Col>
            <Col span={7} offset={1}>
              <h3>Current Due collection</h3>
              <table style={{ width: "100%" }}>
                {accounts.map((account) => {
                  return Accounts_render_due(account);
                })}
              </table>
              <Divider />
              <h3>Previous Due collection</h3>
              <table style={{ width: "100%" }}>
                {accounts.map((account) => {
                  return Accounts_render_previous_due(account);
                })}
              </table>
            </Col>

            <Col span={7} offset={2}>
              <table style={{ width: "100%" }}>
                <tr>
                  <td>
                    <b>Invoices :</b>{" "}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    {formatter.format(total_data.current["total_invoices"])}
                  </td>
                </tr>

                <tr>
                  <td>
                    <b>Bill :</b>{" "}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    {formatter.format(total_data.current["total_sales"])}
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Discount :</b>{" "}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    {formatter.format(total_data.current["total_discount"])}
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Payment :</b>{" "}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    {formatter.format(
                      parseFloat(
                        totalcash.current + current_due_collection.current
                      ).toFixed(2)
                    )}
                  </td>
                </tr>

                {/* <tr>
                  <td>
                    <b>Due :</b>{" "}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    {formatter.format(
                      total_data.current["total_sales"] - totalcash.current
                    )}
                  </td>
                </tr> */}
              </table>
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
  getJournalSearchResultwithinvoice,
})(CashRegister);
