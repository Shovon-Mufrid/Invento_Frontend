import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import ReactToPrint from "react-to-print";
import { getServices } from "../../../actions/invoiceItem";
import { getSpecificpettycashTransfer } from "../../../actions/accounting/pettycashTransfer";
import { getBusinessProfile } from "../../../actions/settings";
import { getSpecificLocation } from "../../../actions/warehouseAction";
import dateFormat from "dateformat";

import {
  Form,
  Input,
  InputNumber,
  Checkbox,
  Button,
  Col,
  Row,
  Select,
  message,
  TreeSelect,
  Space,
  Divider,
  Drawer,
  Image,
  Skeleton,
} from "antd";

const { Option } = Select;

const Quickview = ({
  details,
  getServices,
  getBusinessProfile,
  businessprofile,
  getSpecificLocation,
  getSpecificpettycashTransfer,
}) => {
  var formatter = new Intl.NumberFormat("en-IN");
  console.log(details);
  const componentRef = useRef();
  const [visible, setVisible] = useState(false);
  const [loading, setloading] = useState(true);
  const [data, setdata] = useState([]);
  const [branch, setbranch] = useState([]);
  const count = useRef(5);
  const serialcount = useRef(0);
  const total_amount = useRef(0);

  const showDrawer = () => {
    serialcount.current = 0;
    count.current = 5;
    total_amount.current = 0;
    getSpecificLocation(details.location).then((result) => {
      setbranch(result);
    });
    // getSpecificpettycashTransfer(details.id).then((e) => {
    //   count.current = 5 - e.length;
    //   getBusinessProfile();
    //   setdata(e);
    //   setloading(false);
    // });
    setloading(false);
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  const renderImage = () => {
    if (loading) {
      return <Skeleton active />;
    } else {
      return (
        <img
          src={branch.logo}
          style={{
            maxHeight: "60px",
            // right: "0",
          }}
        />
      );
    }
  };
  const renderitems = () => {
    serialcount.current = 0;
    count.current = 5;
    total_amount.current = 0;
    if (details.cash_amount > 0) {
      total_amount.current =
        parseFloat(total_amount.current) + parseFloat(details.cash_amount);
    }
    if (details.pett_cash_amount > 0) {
      total_amount.current =
        parseFloat(total_amount.current) + parseFloat(details.pett_cash_amount);
    }

    if (loading) {
      return <Skeleton active />;
    } else {
      return (
        <>
          {details.cash_amount > 0 ? (
            <tr>
              <td>{(serialcount.current += 1)}</td>
              {details.add_cash ? (
                <td style={{ textAlign: "center" }}>
                  Cash Received from main accounts
                </td>
              ) : (
                <td style={{ textAlign: "center" }}>
                  Collected cash from {details.Location_name}
                </td>
              )}
              <td style={{ textAlign: "center" }}>
                {" "}
                {formatter.format(details.cash_amount)}
              </td>
            </tr>
          ) : (
            ""
          )}
          {details.pett_cash_amount > 0 ? (
            <tr>
              <td>{(serialcount.current += 1)}</td>
              {details.add_cash ? (
                <td style={{ textAlign: "center" }}>
                  Petty Cash Received from main accounts
                </td>
              ) : (
                <td style={{ textAlign: "center" }}>
                  Collected petty cash from {details.Location_name}
                </td>
              )}
              <td style={{ textAlign: "center" }}>
                {" "}
                {formatter.format(details.pett_cash_amount)}
              </td>
            </tr>
          ) : (
            ""
          )}
        </>
      );
    }
  };

  const renderblanktables = () => {
    if (loading) {
      return "";
    } else {
      let indexcount = 0;
      return Array.apply(null, Array(count.current)).map(() => {
        indexcount = indexcount + 1;
        return (
          <tr>
            <td>{serialcount.current + indexcount}</td>
            {/* <td></td> */}
            <td></td>
            <td></td>
          </tr>
        );
      });
    }
  };

  return (
    <>
      <>
        <a href="#" onClick={showDrawer} style={{ margin: 4 }}>
          Quick View
        </a>
        <Drawer
          width="850"
          onClose={onClose}
          visible={visible}
          placement="right"
          // bodyStyle={{ paddingBottom: 80 }}
        >
          <ReactToPrint
            trigger={() => <button>Print this out!</button>}
            content={() => componentRef.current}
          />
          <div style={{ display: "none" }}>
            <div
              className="invoice_print_fontSize"
              ref={componentRef}
              style={{ padding: "10px" }}
            >
              <Row
                style={{
                  borderBottom: "2px solid lightgray",
                  paddingBottom: "5px",
                }}
              >
                <Col span={16} style={{ textAlign: "left" }}>
                  <div
                    className="d-div"
                    dangerouslySetInnerHTML={{ __html: branch.address }}
                  ></div>
                </Col>
                <Col span={8} style={{ textAlign: "right" }}>
                  {renderImage()}
                </Col>
              </Row>
              <br></br>
              <h2 style={{ textAlign: "center" }}>CASH VOUCHER</h2>
              <br></br>
              <Row>
                <Col span={12}>
                  {/* <h3>RECEIVER INFORMATION</h3>

                  {details.Contact ? (
                    <>
                      {details.Contact[0].name}
                      <br></br>
                      {details.Contact[0].address}
                      <br></br>
                      {details.Contact[0].phone}
                      <br></br>
                    </>
                  ) : (
                    ""
                  )}
                  {details.Invoice ? (
                    <>
                      {details.Invoice[0].Contact[0].name}
                      <br></br>
                      {details.Invoice[0].Contact[0].address}
                      <br></br>
                      {details.Invoice[0].Contact[0].phone}
                      <br></br>
                    </>
                  ) : (
                    ""
                  )}
                  {details.purchasee ? (
                    <>
                      {details.Purchasee[0].Contact[0].name}
                      <br></br>
                      {details.Purchasee[0].Contact[0].address}
                      <br></br>
                      {details.Purchasee[0].Contact[0].phone}
                      <br></br>
                    </>
                  ) : (
                    ""
                  )}
                  {details.narration ? (
                    <>{details.narration != "null" ? details.narration : ""}</>
                  ) : (
                    ""
                  )} */}
                  {/* {details.Employee ? (
                    <>
                      {details.Employee[0].name}
                      <br></br>
                      {details.Employee[0].email}
                      <br></br>
                    </>
                  ) : (
                    ""
                  )} */}
                </Col>

                <Col span={12} style={{ textAlign: "right" }}>
                  {/* <Row>
                    <Col span={14}>VOUCHER NO :</Col>
                    <Col span={10}>
                      {details.voucher_number ? (
                        <b>{details.voucher_number}</b>
                      ) : (
                        ""
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col span={14}>CREATED BY :</Col>
                    <Col span={10}>
                      {details.Employee[0] ? details.Employee[0].name : ""}
                    </Col>
                  </Row> */}
                  <Row>
                    <Col span={14}>ISSUED DATE :</Col>
                    <Col span={10}>
                      {details.created
                        ? dateFormat(details.created, "yyyy-mm-dd")
                        : ""}
                    </Col>
                  </Row>
                  {/* <Row>
                    <Col span={14}>REFERENCE :</Col>
                    <Col span={10}>
                      {details.referance ? details.referance : ""}
                    </Col>
                  </Row> */}
                </Col>
              </Row>
              <br></br>
              <Row>
                <Col span={24}>
                  <table className="product_table invoice_print_fontSize">
                    <tbody>
                      <tr style={{ fontWeight: "500" }}>
                        <td>SL</td>
                        <td style={{ width: "70%" }}>
                          PARTICULAR'S DESCRIPTION
                        </td>

                        <td>AMOUNT (BDT)</td>
                      </tr>
                      {renderitems()}

                      {renderblanktables()}
                    </tbody>
                  </table>
                  <Row>
                    <Col span={8} style={{ textAlign: "left" }}>
                      <br></br>
                      <h3
                        style={{
                          borderBottom: "2px solid gray",
                          display: "inline-block",
                        }}
                      >
                        TRANSACTION METHOD
                      </h3>
                      <br></br>
                      {details.Account[0] ? details.Account[0].name : ""}

                      {details.Account[0].account_no ? (
                        <>
                          <br></br>
                          Account no. {details.Account[0].account_no}
                        </>
                      ) : (
                        ""
                      )}
                      {details.Account[0].details ? (
                        <>
                          <br></br>
                          {details.Account[0].details}
                        </>
                      ) : (
                        ""
                      )}
                      {details.Account[0].address ? (
                        <>
                          <br></br>
                          Location : {details.Account[0].address}
                        </>
                      ) : (
                        ""
                      )}
                    </Col>

                    <Col
                      span={16}
                      style={{ textAlign: "right", marginTop: "5px" }}
                    >
                      <Row>
                        <Col span={14} style={{ margin: "auto" }}>
                          TOTAL AMOUNT
                        </Col>
                        <Col span={9} offset={1}>
                          <span
                            className="order_span_bill"
                            style={{ border: "1px solid" }}
                          >
                            {formatter.format(total_amount.current)}
                          </span>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <br></br>
              <br></br>
              <Row style={{ minHeight: "60px" }}>
                <Col span={8} style={{ textAlign: "left" }}>
                  {/* <img
                    src={businessprofile.signature}
                    style={{
                      maxHeight: "60px",
                      left: "0",
                    }}
                  /> */}
                </Col>
                <Col span={8} style={{ textAlign: "center" }}></Col>
                <Col span={8} style={{ textAlign: "center" }}></Col>
              </Row>
              <Row>
                <Col span={8} style={{ textAlign: "left" }}>
                  <h3
                    style={{
                      borderTop: "2px solid black",
                      display: "inline-block",
                    }}
                  >
                    RECEIVED BY
                  </h3>
                </Col>
                <Col span={8} style={{ textAlign: "center" }}>
                  <h3
                    style={{
                      borderTop: "2px solid black",
                      display: "inline-block",
                    }}
                  >
                    AUTHORIZER
                  </h3>
                </Col>
                <Col span={8} style={{ textAlign: "right" }}>
                  <h3
                    style={{
                      marginBottom: "-10px",
                      padding: "0px",
                      borderTop: "2px solid black",
                      // width: "50%",
                      display: "inline-block",
                    }}
                  >
                    PAID BY
                  </h3>
                </Col>
              </Row>
            </div>
          </div>
          <Row
            style={{
              borderBottom: "2px solid lightgray",
              paddingBottom: "5px",
            }}
          >
            <Col span={16} style={{ textAlign: "left" }}>
              <div
                className="d-div"
                dangerouslySetInnerHTML={{ __html: branch.address }}
              ></div>
            </Col>
            <Col span={8} style={{ textAlign: "right" }}>
              {renderImage()}
            </Col>
          </Row>
          <br></br>
          <h2 style={{ textAlign: "center" }}>CASH VOUCHER</h2>
          <br></br>
          <Row>
            <Col span={12}>
              {/* <h3>RECEIVER INFORMATION</h3>

              {details.Contact ? (
                <>
                  {details.Contact[0].name}
                  <br></br>
                  {details.Contact[0].address}
                  <br></br>
                  {details.Contact[0].phone}
                  <br></br>
                </>
              ) : (
                ""
              )}
              {details.Invoice ? (
                <>
                  {details.Invoice[0].Contact[0].name}
                  <br></br>
                  {details.Invoice[0].Contact[0].address}
                  <br></br>
                  {details.Invoice[0].Contact[0].phone}
                  <br></br>
                </>
              ) : (
                ""
              )}
              {details.purchasee ? (
                <>
                  {details.Purchasee[0].Contact[0].name}
                  <br></br>
                  {details.Purchasee[0].Contact[0].address}
                  <br></br>
                  {details.Purchasee[0].Contact[0].phone}
                  <br></br>
                </>
              ) : (
                ""
              )}
              {details.narration ? (
                <>{details.narration != "null" ? details.narration : ""}</>
              ) : (
                ""
              )} */}
              {/* {details.Employee ? (
                <>
                  {details.Employee[0].name}
                  <br></br>
                  {details.Employee[0].email}
                  <br></br>
                </>
              ) : (
                ""
              )} */}
            </Col>

            <Col span={12} style={{ textAlign: "right" }}>
              {/* <Row>
                <Col span={14}>VOUCHER NO :</Col>
                <Col span={10}>
                  {details.voucher_number ? (
                    <b>{details.voucher_number}</b>
                  ) : (
                    ""
                  )}
                </Col>
              </Row> */}
              {/* <Row>
                <Col span={14}>CREATED BY :</Col>
                <Col span={10}>
                  {details.Employee[0] ? details.Employee[0].name : ""}
                </Col>
              </Row> */}
              <Row>
                <Col span={14}>ISSUED DATE :</Col>
                <Col span={10}>
                  {details.created
                    ? dateFormat(details.created, "yyyy-mm-dd")
                    : ""}
                </Col>
              </Row>
              {/* <Row>
                <Col span={14}>REFERENCE :</Col>
                <Col span={10}>
                  {details.referance ? details.referance : ""}
                </Col>
              </Row> */}
            </Col>
          </Row>
          <br></br>
          <Row>
            <Col span={24}>
              <table className="product_table">
                <tbody>
                  <tr style={{ fontWeight: "500" }}>
                    <td>SL</td>
                    <td style={{ width: "70%" }}>PARTICULAR'S DESCRIPTION</td>

                    <td>AMOUNT (BDT)</td>
                  </tr>
                  {renderitems()}

                  {renderblanktables()}
                </tbody>
              </table>
              <Row>
                <Col span={8} style={{ textAlign: "left" }}>
                  <br></br>
                  <h3
                    style={{
                      borderBottom: "2px solid gray",
                      display: "inline-block",
                    }}
                  >
                    TRANSACTION METHOD
                  </h3>
                  <br></br>
                  {details.Account[0] ? details.Account[0].name : ""}

                  {details.Account[0].account_no ? (
                    <>
                      <br></br>
                      Account no. {details.Account[0].account_no}
                    </>
                  ) : (
                    ""
                  )}
                  {details.Account[0].details ? (
                    <>
                      <br></br>
                      {details.Account[0].details}
                    </>
                  ) : (
                    ""
                  )}
                  {details.Account[0].address ? (
                    <>
                      <br></br>
                      Location : {details.Account[0].address}
                    </>
                  ) : (
                    ""
                  )}
                </Col>

                <Col span={16} style={{ textAlign: "right", marginTop: "5px" }}>
                  <Row>
                    <Col span={14} style={{ margin: "auto" }}>
                      TOTAL AMOUNT
                    </Col>
                    <Col span={9} offset={1}>
                      <span
                        className="order_span_bill"
                        style={{ border: "1px solid" }}
                      >
                        {formatter.format(total_amount.current)}
                      </span>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
          <br></br>
          <br></br>
          <Row style={{ minHeight: "60px" }}>
            <Col span={8} style={{ textAlign: "left" }}>
              {/* <img
                    src={businessprofile.signature}
                    style={{
                      maxHeight: "60px",
                      left: "0",
                    }}
                  /> */}
            </Col>
            <Col span={8} style={{ textAlign: "center" }}></Col>
            <Col span={8} style={{ textAlign: "center" }}></Col>
          </Row>
          <Row>
            <Col span={8} style={{ textAlign: "left" }}>
              <h3
                style={{
                  borderTop: "2px solid black",
                  display: "inline-block",
                }}
              >
                RECEIVED BY
              </h3>
            </Col>
            <Col span={8} style={{ textAlign: "center" }}>
              <h3
                style={{
                  borderTop: "2px solid black",
                  display: "inline-block",
                }}
              >
                AUTHORIZER
              </h3>
            </Col>
            <Col span={8} style={{ textAlign: "right" }}>
              <h3
                style={{
                  marginBottom: "-10px",
                  padding: "0px",
                  borderTop: "2px solid black",
                  // width: "50%",
                  display: "inline-block",
                }}
              >
                PAID BY
              </h3>
            </Col>
          </Row>
        </Drawer>
      </>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    businessprofile: state.settings.businessprofile,
  };
};

export default connect(mapStateToProps, {
  getBusinessProfile,
  getSpecificLocation,
  getSpecificpettycashTransfer,
})(Quickview);
