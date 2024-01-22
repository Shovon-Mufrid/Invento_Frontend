import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { Drawer, Divider, Col, Row, Button, message, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import { deleteContact } from "../../../../actions/contactAction";
import Edit from "./Edit";
import { getAllPurchaseByContact } from "../../../../actions/purchase";
import { getJournalSearchResult } from "../../../../actions/journalAction";
import ReactToPrint from "react-to-print";
import moment from "moment";

const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);

const ContactDetails = ({
  details,
  deleteContact,
  setUpdatelist,
  getAllPurchaseByContact,
  getJournalSearchResult,
  businessprofile,
}) => {
  const [visible, setVisible] = useState(false);
  const [purchase_fetched, setPurchase_fetched] = useState(false);
  const [purchase_list, setPurchase_list] = useState([]);
  const [journals, setjournals] = useState([]);
  const due = useRef(0);
  const bill = useRef(0);
  const paid = useRef(0);
  const payment = useRef(0);
  const balance = useRef(0);
  const componentRef = useRef();
  var formatter = new Intl.NumberFormat("en-IN");

  const showDrawer = () => {
    setjournals([]);
    setPurchase_fetched(false);
    payment.current = 0;
    balance.current = 0;
    setVisible(true);
    getJournalSearchResult("", "", "", "", "", "", "", details.phone).then(
      (result) => {
        setjournals(result.reverse());
        setPurchase_fetched(true);
      }
    );
    // setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const confirm = () => {
    deleteContact(details.id);
    setVisible(false);
    setUpdatelist(false);
    message.success(details.name + " Has been deleted from your contact list");
  };

  return (
    <>
      <Link to="#" onClick={showDrawer} key={details.id}>
        History
      </Link>

      <Drawer
        width="70%"
        placement="right"
        closable={true}
        onClose={onClose}
        visible={visible}
      >
        <ReactToPrint
          trigger={() => <Button type="primary">Print this out!</Button>}
          content={() => componentRef.current}
        />
        <div ref={componentRef} style={{ padding: "10px" }}>
          <Row
            style={{
              borderBottom: "2px solid lightgray",
              paddingBottom: "5px",
              marginBottom: "20px",
            }}
          >
            <Col span={17} style={{ paddingTop: "10px" }}>
              <small>
                <div
                  style={{ lineHeight: "2.5px" }}
                  dangerouslySetInnerHTML={{
                    __html: businessprofile.address,
                  }}
                ></div>
              </small>
            </Col>

            <Col span={7} style={{ textAlign: "right" }}>
              <img
                src={businessprofile.logo}
                style={{
                  maxHeight: "60px",
                }}
              />
            </Col>
          </Row>

          <Row>
            <Col span={12} style={{ textAlign: "left" }}>
              Name: {details.name}
            </Col>
            <Col span={12} style={{ textAlign: "right" }}>
              Phone: {details.phone}
            </Col>
          </Row>
          <Row>
            <Col span={12} style={{ textAlign: "left" }}>
              Email: {details.email}
            </Col>
            <Col span={12} style={{ textAlign: "right" }}>
              Type: {details.Role}
            </Col>
          </Row>
          <Row>
            <Col span={12} style={{ textAlign: "left" }}>
              Address: {details.address}
            </Col>
          </Row>
          <br></br>
          {details.account_balance < 0 ? (
            <>
              <h3 style={{ color: "green" }}>
                Advance payment:{" "}
                {formatter.format(Math.abs(details.account_balance))} BDT
              </h3>
            </>
          ) : (
            <>
              {details.account_balance == 0 ? (
                <>
                  <h3>
                    Account Balance:{" "}
                    {formatter.format(Math.abs(details.account_balance))} BDT
                  </h3>
                </>
              ) : (
                <h3 style={{ color: "red" }}>
                  Accounts Payable:{" "}
                  {formatter.format(Math.abs(details.account_balance))} BDT
                </h3>
              )}
            </>
          )}

          {purchase_fetched ? (
            <>
              <h3>Transaction History</h3>
              <table className="history_table">
                <tr>
                  {/* <td>SL.</td> */}
                  <td>Date</td>
                  <td>Head</td>
                  <td>Details</td>
                  <td style={{ textAlign: "right" }}>Amount</td>
                  {/* <td style={{ textAlign: "right" }}>Balance</td> */}
                  {/* <td>Due Amount</td> */}
                </tr>

                {journals.map((item, index) => {
                  if (item.Subgroup == "Cash" || item.Subgroup == "Bank") {
                    if (item.increase) {
                      balance.current += parseFloat(item.amount);
                    } else {
                      balance.current -= parseFloat(item.amount);
                    }

                    return (
                      <>
                        <tr>
                          {/* <td>{index + 1}</td> */}
                          <td>{moment(item.created).format("DD-MM-YYYY")}</td>
                          <td>{item.Subgroup}</td>
                          <td>{item.details}</td>
                          <td style={{ textAlign: "right" }}>
                            {item.increase ? (
                              formatter.format(item.amount)
                            ) : (
                              <>( {formatter.format(item.amount)} )</>
                            )}
                          </td>
                          {/* <td style={{ textAlign: "right" }}>
                          {formatter.format(balance.current)}
                        </td> */}
                          {/* <td>{item.due}</td> */}
                        </tr>
                      </>
                    );
                  }
                })}
              </table>
              <Divider />

              <h3>Balance History</h3>
              <table className="history_table">
                <tr>
                  {/* <td>SL.</td> */}
                  <td>Date</td>
                  <td>Head</td>
                  <td>Details</td>
                  <td style={{ textAlign: "right" }}>Amount</td>
                  <td style={{ textAlign: "right" }}>Balance</td>
                  {/* <td>Due Amount</td> */}
                </tr>

                {journals.map((item, index) => {
                  if (
                    (item.print[0].account_code == 100010003 ||
                      item.print[0].account_code == 200010050 ||
                      item.print[0].account_code == 200010011 ||
                      item.print[0].account_code == 100010010) &&
                    item.amount > 0
                  ) {
                    if (item.increase) {
                      payment.current += parseFloat(item.amount);
                    } else {
                      payment.current -= parseFloat(item.amount);
                    }

                    return (
                      <>
                        <tr>
                          {/* <td>{index + 1}</td> */}
                          <td>{moment(item.created).format("DD-MM-YYYY")}</td>
                          <td>{item.Subgroup}</td>
                          <td>{item.details}</td>
                          <td style={{ textAlign: "right" }}>
                            {item.increase ? (
                              formatter.format(item.amount)
                            ) : (
                              <>( {formatter.format(item.amount)} )</>
                            )}
                          </td>
                          <td style={{ textAlign: "right" }}>
                            {formatter.format(payment.current)}
                          </td>
                          {/* <td>{item.due}</td> */}
                        </tr>
                      </>
                    );
                  }
                })}
              </table>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </Drawer>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    businessprofile: state.settings.businessprofile,
  };
};

export default connect(mapStateToProps, {
  deleteContact,
  getAllPurchaseByContact,
  getJournalSearchResult,
})(ContactDetails);
