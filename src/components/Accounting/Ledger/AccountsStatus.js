import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";

import ReactToPrint from "react-to-print";

import moment from "moment";
import { getAllAccount } from "../../../actions/accountsAction";
import { getAllLocation } from "../../../actions/warehouseAction";
import { getJournalSearchResult } from "../../../actions/journalAction";
import { getallaccountstatus } from "../../../actions/accounting/AccountsByDate";

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
  Spin,
  Collapse,
} from "antd";
const { Panel } = Collapse;
const { Content } = Layout;
const { RangePicker } = DatePicker;
const { Option } = Select;

const AccountsStatus = ({
  getJournalSearchResult,
  getAllAccount,
  getallaccountstatus,
  getAllLocation,
  locationlist,
}) => {
  const componentRef = useRef();
  const [accounts, setAccounts] = useState([]);
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);
  const [reload, setreload] = useState(true);
  const [dataFetched, setDateFetched] = useState(false);
  var currentdate = new Date();
  var today =
    currentdate.getFullYear() +
    "-" +
    (currentdate.getMonth() + 1) +
    "-" +
    currentdate.getDate() +
    "T23:59:59";
  var accountsstart = "";
  // if (currentdate.getMonth() + 1 > 7) {
  //   accountsstart =
  //     currentdate.getFullYear() + "-07-" + currentdate.getDate() + "T00:00:01";
  // } else {
  //   accountsstart =
  //     currentdate.getFullYear() -
  //     1 +
  //     "-07-" +
  //     currentdate.getDate() +
  //     "T00:00:01";
  // }
  accountsstart = 2022 + "-01-01T00:00:01";
  // if fiscal year is acrivated
  const openingDate = useRef(accountsstart);
  const start = useRef("");
  const end = useRef(today);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const totalBranch = useRef(0);
  const totalcash = useRef(0);

  const totaldebit = useRef(0);
  const totalcredit = useRef(0);
  const endingBalance = useRef(0);

  const openingcredit = useRef(0);
  const openingdebit = useRef(0);
  const openingbalance = useRef(0);

  useEffect(() => {
    getAllLocation();
    getAllAccount().then((result) => {
      let account = [];
      for (let i = 0; i < result.length; i++) {
        account.push(result[i]);
      }
      setAccounts(account);
      setDateFetched(true);
    });
  }, []);

  useEffect(() => {
    setloading(true);
    if (openingDate.current != "" && end.current != "") {
      getallaccountstatus(openingDate.current, end.current).then((result) => {
        endingBalance.current = 0;
        openingbalance.current = 0;
        totaldebit.current = 0;
        totalcredit.current = 0;
        openingdebit.current = 0;
        openingcredit.current = 0;
        setdata(result);
        setloading(false);
      });
    }
  }, [reload]);

  const SwitchablePicker = () => {
    return (
      <Row>
        <Col flex="auto" style={{ display: 'flex', marginBottom: '10px' }}>
          <h3 style={{marginRight: '10px' }}>Date :</h3>
          <RangePicker
            style={{ width: "80%" }}
            onChange={(value) => {
              if (value) {
                // openingDate.current = value.format("YYYY") + "-07-01T00:00:00";
                openingDate.current =
                  value[0].format("YYYY-MM-DD") + "T00:00:00";
                end.current = value[1].format("YYYY-MM-DD") + "T23:59:59";
                // setStartTime(value.format("YYYY-MM-DD") + "T00:00:00");
                // setEndTime(value.format("YYYY-MM-DD") + "T23:59:59");
                setreload(!reload);
              }
            }}
          />
        </Col>

        <Col flex="auto" style={{ display: 'flex', marginBottom: '10px' }}>
          {/* <h3>.</h3> */}

          <ReactToPrint
            trigger={() => (
              <Button
                type="primary"
                // style={{ width: "100%" }}
              >
                Print Report
              </Button>
            )}
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
            {openingDate.current != "" && end.current != "" ? (
              <Spin spinning={loading}>
                <div ref={componentRef}>
                  {/* <h3
                    style={{
                      width: "100%",
                      textAlign: "center",
                      padding: "10px",
                      background: "lightgray",
                    }}
                  >
                    Date :{" "}
                    {openingDate.current.getDate() +
                      "-" +
                      (openingDate.current.getMonth() + 1) +
                      "-" +
                      openingDate.current.getFullYear() +
                      " " +
                      openingDate.current.getHours() +
                      ":" +
                      openingDate.current.getMinutes()}
                  </h3> */}
                  <table className="account_table">
                    <tr style={{ background: "lightgray" }}>
                      <th
                        colSpan={4}
                        style={{ padding: "10px", textAlign: "center" }}
                      >
                        CASH
                      </th>
                    </tr>
                    <tr style={{ background: "#f0f0f0" }}>
                      <th
                        style={{
                          textAlign: "left",
                          padding: "10px",
                          width: "40%",
                        }}
                      >
                        Account Name
                      </th>
                      {/* <th>Location</th> */}
                      <th>Account Number</th>
                      <th style={{ textAlign: "right", padding: "10px" }}>
                        Amount
                      </th>
                    </tr>
                    {RenderMethod("Cash")}
                  </table>
                  <br></br>
                  <table className="account_table">
                    <tr style={{ background: "lightgray" }}>
                      <th
                        colSpan={4}
                        style={{ padding: "10px", textAlign: "center" }}
                      >
                        BANK
                      </th>
                    </tr>
                    <tr style={{ background: "#f0f0f0" }}>
                      <th
                        style={{
                          textAlign: "left",
                          padding: "10px",
                          width: "40%",
                        }}
                      >
                        Account Name
                      </th>
                      {/* <th>Location</th> */}
                      <th>Account Number</th>
                      <th style={{ textAlign: "right", padding: "10px" }}>
                        Amount
                      </th>
                    </tr>
                    {RenderMethod("Bank")}
                  </table>
                  <br></br>
                  <table className="account_table">
                    <tr style={{ background: "lightgray" }}>
                      <th
                        colSpan={4}
                        style={{ padding: "10px", textAlign: "center" }}
                      >
                        Mobile Banking
                      </th>
                    </tr>
                    <tr style={{ background: "#f0f0f0" }}>
                      <th
                        style={{
                          textAlign: "left",
                          padding: "10px",
                          width: "40%",
                        }}
                      >
                        Account Name
                      </th>
                      {/* <th>Location</th> */}
                      <th>Account Number</th>
                      <th style={{ textAlign: "right", padding: "10px" }}>
                        Amount
                      </th>
                    </tr>
                    {RenderMethod("Mobile banking")}
                  </table>

                  <Row style={{ minHeight: "60px", marginTop: "40px" }}>
                    <Col span={12} style={{ textAlign: "left" }}></Col>
                    <Col span={12} style={{ textAlign: "center" }}></Col>
                  </Row>
                  <Row>
                    <Col span={12} style={{ textAlign: "left" }}>
                      <h3
                        style={{
                          borderTop: "2px solid black",
                          display: "inline-block",
                        }}
                      >
                        ACCOUNT SIGNATURE
                      </h3>
                    </Col>
                    <Col span={12} style={{ textAlign: "right" }}>
                      <h3
                        style={{
                          borderTop: "2px solid black",
                          display: "inline-block",
                        }}
                      >
                        AUTHORIZER SIGNATURE
                      </h3>
                    </Col>
                  </Row>
                </div>
              </Spin>
            ) : (
              "Please select a date"
            )}
          </Col>
        </Row>
      </>
    );
  };

  const RenderMethod = (type) => {
    let typetotal = 0;
    if (type == "Cash") {
      totalBranch.current = 0;
      for (let i = 0; i < locationlist.length; i++) {
        totalBranch.current += parseFloat(locationlist[i].cash);
      }
      // console.log(totalBranch.current);
      return (
        <>
          {accounts.map((account) => {
            if (type == account.type) {
              let accountTotal = 0;
              data.map((item) => {
                let accounts = item && item.data["accounts"];
                accounts.map((status) => {
                  if (status.id == account.id) {
                    typetotal += parseFloat(status.amount);
                    accountTotal += parseFloat(status.amount);
                    console.log(status);
                  }
                });
              });
              return (
                <>
                  <tr>
                    <td style={{ textAlign: "left" }}>{account.name}</td>
                    {/* <td>All</td> */}
                    <td>{account.account_no}</td>
                    <td style={{ textAlign: "right" }}>
                      {parseFloat(typetotal - totalBranch.current).toFixed(2)}
                      {/* {parseFloat(typetotal).toFixed(2)} */}
                    </td>
                  </tr>
                </>
              );
            }
          })}
          {locationlist.map((location) => {
            if (location.cash > 0) {
              return (
                <>
                  <tr>
                    <td style={{ textAlign: "left" }}>{location.name}</td>
                    {/* <td>All</td> */}
                    <td></td>
                    <td style={{ textAlign: "right" }}>
                      {parseFloat(location.cash).toFixed(2)}
                    </td>
                  </tr>
                </>
              );
            }
          })}
          <tr>
            <td style={{ textAlign: "left" }} colSpan={2}>
              <b>Total</b>
            </td>

            <td style={{ textAlign: "right" }}>
              <b>{parseFloat(typetotal).toFixed(2)}</b>
            </td>
          </tr>
        </>
      );
    } else {
      return (
        <>
          {accounts.map((account) => {
            if (type == account.type) {
              let accountTotal = 0;
              data.map((item) => {
                let accounts = item && item.data["accounts"];
                accounts.map((status) => {
                  if (status.id == account.id) {
                    typetotal += parseFloat(status.amount);
                    accountTotal += parseFloat(status.amount);
                    console.log(status);
                  }
                });
              });
              return (
                <>
                  <tr>
                    <td style={{ textAlign: "left" }}>{account.name}</td>
                    {/* <td>All</td> */}
                    <td>{account.account_no}</td>
                    <td style={{ textAlign: "right" }}>
                      {parseFloat(accountTotal).toFixed(2)}
                    </td>
                  </tr>
                </>
              );
            }
          })}

          <tr>
            <td style={{ textAlign: "left" }} colSpan={2}>
              <b>Total</b>
            </td>

            <td style={{ textAlign: "right" }}>
              <b>{parseFloat(typetotal).toFixed(2)}</b>
            </td>
          </tr>
        </>
      );
    }
  };

  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Cash & Bank Ledger</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background main-frame">{Rendercontent()}</div>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    businessprofile: state.settings.businessprofile,
    locationlist: state.warehouse.locationlist,
  };
};

export default connect(mapStateToProps, {
  getAllAccount,
  getAllLocation,
  getJournalSearchResult,
  getallaccountstatus,
})(AccountsStatus);
