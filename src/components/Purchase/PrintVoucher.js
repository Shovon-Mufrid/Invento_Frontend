import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import ReactToPrint from "react-to-print";
import { getPurchase } from "../../actions/purchase";
import { getBusinessProfile } from "../../actions/settings";
import { getSpecificLocation } from "../../actions/warehouseAction";
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
  getBusinessProfile,
  businessprofile,
  getSpecificLocation,
  getPurchase,
  Auth,
}) => {
  var formatter = new Intl.NumberFormat("en-IN");
  const componentRef = useRef();
  const [visible, setVisible] = useState(false);
  const [loading, setloading] = useState(true);
  const [data, setdata] = useState([]);
  const [branch, setbranch] = useState([]);
  const count = useRef(0);
  const serialcount = useRef(0);

  const showDrawer = () => {
    getSpecificLocation(details.location).then((result) => {
      setbranch(result);
    });
    getPurchase(details.id).then((e) => {
      if (e.length < 5) {
        count.current = 5 - e.length;
      }
      console.log(e);

      // getBusinessProfile();
      setdata(e);
      setloading(false);
    });
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
    if (loading) {
      return <Skeleton active />;
    } else {
      return data.map((item, index) => {
        // console.log(item);
        serialcount.current = index + 1;
        return (
          <>
            <tr>
              <td>{index + 1}</td>
              {item.Details ? (
                <td style={{ textAlign: "center" }}>{item.Details}</td>
              ) : (
                ""
              )}
              <td style={{ textAlign: "center" }}>
                {" "}
                {formatter.format(item.quantity)}
              </td>
              <td style={{ textAlign: "center" }}>
                {" "}
                {formatter.format(item.quantity * item.price)}
              </td>
            </tr>
          </>
        );
      });
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
          Voucher
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
              <h2 style={{ textAlign: "center" }}>PAYMENT VOUCHER</h2>
              <br></br>
              <Row>
                <Col span={12}>
                  <h3>RECEIVER INFORMATION</h3>

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
                  <Row>
                    <Col span={14}>VOUCHER NO :</Col>
                    <Col span={10}>
                      {details.purchase_number ? (
                        <b>{details.purchase_number}</b>
                      ) : (
                        ""
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col span={14}>CREATED BY :</Col>
                    <Col span={10}>
                      {details.Employee ? details.Employee[0].name : ""}
                    </Col>
                  </Row>
                  <Row>
                    <Col span={14}>ISSUED DATE :</Col>
                    <Col span={10}>
                      {details.created_at
                        ? dateFormat(details.created_at, "yyyy-mm-dd")
                        : ""}
                    </Col>
                  </Row>
                  <Row>
                    <Col span={14}>REFERENCE :</Col>
                    <Col span={10}>
                      {details.reference ? details.reference : ""}
                    </Col>
                  </Row>
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
                        <td>QUANTITY</td>
                        <td>PRICE (BDT)</td>
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
                      <br></br>
                      <Row>
                        <Col span={18} style={{ margin: "auto" }}>
                          DISCOUNT
                        </Col>
                        <Col span={5} offset={1}>
                          <span
                            className="order_span_bill"
                            style={{ border: "1px solid" }}
                          >
                            {formatter.format(details.discount)}
                          </span>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={18} style={{ margin: "auto" }}>
                          TOTAL AMOUNT
                        </Col>
                        <Col span={5} offset={1}>
                          <span
                            className="order_span_bill"
                            style={{ border: "1px solid" }}
                          >
                            {formatter.format(details.bill)}
                          </span>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={18} style={{ margin: "auto" }}>
                          PAYMENT
                        </Col>
                        <Col span={5} offset={1}>
                          <span
                            className="order_span_bill"
                            style={{ border: "1px solid" }}
                          >
                            {formatter.format(details.payment)}
                          </span>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={18} style={{ margin: "auto" }}>
                          DUE
                        </Col>
                        <Col span={5} offset={1}>
                          <span
                            className="order_span_bill"
                            style={{ border: "1px solid" }}
                          >
                            {formatter.format(details.due)}
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
                <Col span={12} style={{ textAlign: "left" }}>
                  <img
                    src={businessprofile.signature}
                    style={{
                      maxHeight: "60px",
                      left: "0",
                    }}
                  />
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
                      marginBottom: "0px",
                      padding: "0px",
                      borderTop: "2px solid black",
                      // width: "50%",
                      display: "inline-block",
                    }}
                  >
                    RECEIVER SIGNATURE
                  </h3>
                  <br></br>
                  <small>(WITH DATE)</small>
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
          <h2 style={{ textAlign: "center" }}>PAYMENT VOUCHER</h2>
          <br></br>
          <Row>
            <Col span={12}>
              <h3>RECEIVER INFORMATION</h3>

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
              <Row>
                <Col span={14}>VOUCHER NO :</Col>
                <Col span={10}>
                  {details.purchase_number ? (
                    <b>{details.purchase_number}</b>
                  ) : (
                    ""
                  )}
                </Col>
              </Row>
              <Row>
                <Col span={14}>CREATED BY :</Col>
                <Col span={10}>
                  {details.Employee ? details.Employee[0].name : ""}
                </Col>
              </Row>
              <Row>
                <Col span={14}>ISSUED DATE :</Col>
                <Col span={10}>
                  {details.created_at
                    ? dateFormat(details.created_at, "yyyy-mm-dd")
                    : ""}
                </Col>
              </Row>
              <Row>
                <Col span={14}>REFERENCE :</Col>
                <Col span={10}>
                  {details.reference ? details.reference : ""}
                </Col>
              </Row>
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

                    <td>QUANTITY</td>
                    <td>PRICE (BDT)</td>
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
                  <br></br>
                  <Row>
                    <Col span={14} style={{ margin: "auto" }}>
                      DISCOUNT
                    </Col>
                    <Col span={8} offset={1}>
                      <span
                        className="order_span_bill"
                        style={{ border: "1px solid" }}
                      >
                        {formatter.format(details.discount)}
                      </span>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={14} style={{ margin: "auto" }}>
                      TOTAL AMOUNT
                    </Col>
                    <Col span={8} offset={1}>
                      <span
                        className="order_span_bill"
                        style={{ border: "1px solid" }}
                      >
                        {formatter.format(details.bill)}
                      </span>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={14} style={{ margin: "auto" }}>
                      PAYMENT
                    </Col>
                    <Col span={8} offset={1}>
                      <span
                        className="order_span_bill"
                        style={{ border: "1px solid" }}
                      >
                        {formatter.format(details.payment)}
                      </span>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={14} style={{ margin: "auto" }}>
                      DUE
                    </Col>
                    <Col span={8} offset={1}>
                      <span
                        className="order_span_bill"
                        style={{ border: "1px solid" }}
                      >
                        {formatter.format(details.due)}
                      </span>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
          <br></br>
          <br></br>
          <Row style={{ minHeight: "80px" }}>
            <Col span={12} style={{ textAlign: "left" }}>
              <img
                src={businessprofile.signature}
                style={{
                  maxHeight: "80px",
                  left: "0",
                }}
              />
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
                  marginBottom: "-10px",
                  padding: "0px",
                  borderTop: "2px solid black",
                  // width: "50%",
                  display: "inline-block",
                }}
              >
                RECEIVER SIGNATURE
              </h3>
              <br></br>
              <small>(WITH DATE)</small>
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
    Auth: state.auth,
  };
};

export default connect(mapStateToProps, {
  getBusinessProfile,
  getSpecificLocation,
  getPurchase,
})(Quickview);
