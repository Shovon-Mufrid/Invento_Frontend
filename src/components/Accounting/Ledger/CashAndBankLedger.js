import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";

import ReactToPrint from "react-to-print";

import moment from "moment";
import { getAllAccount } from "../../../actions/accountsAction";
import { getAlljournalvoucheritemsByAccount } from "../../../actions/accounting/JournalVoucheritems";
import { getAllreceivevoucheritemsByAccount } from "../../../actions/accounting/ReceiveVoucheritems";
import { getAllpaymentvoucheritemByAccount } from "../../../actions/accounting/paymentVoucheritems";
import { getAllInvoicesByAccount } from "../../../actions/invoiceItem";
import { getAllPayslipByAccount } from "../../../actions/PaySlipAction";
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
  Spin,
} from "antd";
const { Content } = Layout;
const { RangePicker } = DatePicker;
const { Option } = Select;

const CashAndBankLedger = ({
  getJournalSearchResult,
  getAllAccount,
  getAlljournalvoucheritemsByAccount,
  getAllreceivevoucheritemsByAccount,
  getAllpaymentvoucheritemByAccount,
  getAllInvoicesByAccount,
  getAllPayslipByAccount,
  businessprofile,
}) => {
  const componentRef = useRef();
  const [accounts, setAccounts] = useState([]);
  const accountNo = useRef();
  const [journalsVoucher, setJournalsVoucher] = useState([]);
  const [receiveVoucher, setReceiveVoucher] = useState([]);
  const [paymentVoucher, setPaymentVoucher] = useState([]);
  const [journals, setJournals] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [payslips, setPayslips] = useState([]);
  const [type, setType] = useState("date");
  const [loading, setloading] = useState(true);
  const [reload, setreload] = useState(true);
  const [dataFetched, setDateFetched] = useState(false);
  const openingDate = useRef("");
  const start = useRef("");
  const end = useRef("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const totaldebit = useRef(0);
  const totalcredit = useRef(0);
  const endingBalance = useRef(0);

  const openingcredit = useRef(0);
  const openingdebit = useRef(0);
  const openingbalance = useRef(0);

  useEffect(() => {
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
    if (
      accountNo.current > 0 &&
      openingDate.current != "" &&
      end.current != ""
    ) {
      getJournalSearchResult(
        "",
        openingDate.current,
        end.current,
        accountNo.current
      ).then((result) => {
        let res = [];
        endingBalance.current = 0;
        openingbalance.current = 0;
        totaldebit.current = 0;
        totalcredit.current = 0;
        openingdebit.current = 0;
        openingcredit.current = 0;

        for (let i = 0; i < result.length; i++) {
          if (result[i].Subgroup == "Cash" || result[i].Subgroup == "Bank") {
            if (
              new Date(start.current).getTime() -
                new Date(result[i].created).getTime() >
              -1
            ) {
              console.log("opening");
              if (result[i].type == "Debit") {
                openingdebit.current += parseInt(result[i].amount);
                totaldebit.current += parseInt(result[i].amount);
              } else {
                openingcredit.current += parseInt(result[i].amount);
                totalcredit.current += parseInt(result[i].amount);
              }
            } else {
              console.log("closing");
              if (result[i].type == "Debit") {
                totaldebit.current += parseInt(result[i].amount);
              } else {
                totalcredit.current += parseInt(result[i].amount);
              }
            }
            res.push(result[i]);
          }
        }
        res.reverse();
        setJournals(res);
        endingBalance.current = totaldebit.current - totalcredit.current;
        openingbalance.current = openingdebit.current - openingcredit.current;
        setloading(false);
      });
    }
  }, [reload]);

  const SwitchablePicker = () => {
    return (
      <Row>
        <Col flex="auto">
          Date:
          <RangePicker
            picker={type}
            style={{ width: "100%" }}
            onChange={(value) => {
              if (value) {
                console.log(value[0].format("MM"));
                if (value[0].format("MM") > 7) {
                  openingDate.current =
                    value[0].format("YYYY") + "-07-01T00:00:00";
                  // alert(openingDate.current);
                } else {
                  openingDate.current =
                    value[0].format("YYYY") - 1 + "-07-01T00:00:00";
                  // alert(openingDate.current);
                }

                start.current = value[0].format("YYYY-MM-DD") + "T00:00:00";
                end.current = value[1].format("YYYY-MM-DD") + "T23:59:59";
                setStartTime(value[0].format("YYYY-MM-DD") + "T00:00:00");
                setEndTime(value[1].format("YYYY-MM-DD") + "T23:59:59");
                setreload(!reload);
              }
            }}
          />
        </Col>
        <Col flex="auto">
          Account:
          {dataFetched ? (
            <>
              <Select
                placeholder="select a Account"
                style={{ width: "100%" }}
                onChange={(e) => {
                  accountNo.current = e;
                  setreload(!reload);
                }}
              >
                {accounts.map((account) => {
                  return <Option value={account.id}>{account.name}</Option>;
                })}
              </Select>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </Col>
        <Col flex="auto">
          .{/* <Excelldownload data={data} data1={data1} /> */}
          <ReactToPrint
            trigger={() => (
              <Button type="primary" style={{ width: "100%" }}>
                Print Ledger
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
            {accountNo.current > 0 &&
            openingDate.current != "" &&
            end.current != "" ? (
              <Spin spinning={loading}>
                <div ref={componentRef} style={{ padding: "20px" }}>
                  <table className="history_table">
                    <tr>
                      <td>Date</td>
                      <td>Particular</td>
                      <td>Narration</td>
                      <td>Amount</td>
                    </tr>

                    <tr>
                      <td>-</td>
                      <td>-</td>
                      <td>
                        <b>Opening Balance</b>
                      </td>
                      <td>
                        <b>{openingbalance.current}</b>
                      </td>
                    </tr>

                    {journals.map((item, index) => {
                      if (
                        new Date(start.current).getTime() -
                          new Date(item.created).getTime() <
                        0
                      ) {
                        return (
                          <>
                            <tr>
                              <td>
                                {moment(item.created).format("DD-MM-YYYY")}
                              </td>
                              <td>{item.Subgroup}</td>
                              <td>{item.details}</td>
                              <td>
                                {item.type == "Credit"
                                  ? "(" + item.amount + ")"
                                  : item.amount}
                              </td>
                            </tr>
                          </>
                        );
                      }
                    })}

                    <tr>
                      <td colSpan={3}>
                        <b>Total</b>
                      </td>
                      <td>
                        <b>
                          {endingBalance.current < 0
                            ? "(" + endingBalance.current * -1 + ")"
                            : endingBalance.current}
                        </b>
                      </td>
                    </tr>
                  </table>
                  <Row style={{ minHeight: "60px", marginTop: "40px" }}>
                    <Col span={12} style={{ textAlign: "left" }}>
                      {/* <img
                        src={businessprofile.signature}
                        style={{
                          maxHeight: "60px",
                          left: "0",
                        }}
                      /> */}
                    </Col>
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
              "Please select an account and date"
            )}
          </Col>
        </Row>
      </>
    );
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
  };
};

export default connect(mapStateToProps, {
  getJournalSearchResult,
  getAllAccount,
  getAlljournalvoucheritemsByAccount,
  getAllreceivevoucheritemsByAccount,
  getAllpaymentvoucheritemByAccount,
  getAllInvoicesByAccount,
  getAllPayslipByAccount,
})(CashAndBankLedger);
