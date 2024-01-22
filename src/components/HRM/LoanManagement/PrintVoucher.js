import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import ReactToPrint from "react-to-print";

import { getBusinessProfile } from "../../../actions/settings";
import { getSpecificLocation } from "../../../actions/warehouseAction";
import dateFormat from "dateformat";

import { Col, Row, Select, Drawer, Skeleton } from "antd";

const { Option } = Select;

const Quickview = ({
  details,
  getBusinessProfile,
  businessprofile,
  getSpecificLocation,
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
    getSpecificLocation(Auth.profile.branch.id).then((result) => {
        setbranch(result);
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
            width: "100%",
            right: "0",
          }}
        />
      );
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
              style={{ padding: "40px" }}
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

                  {details.employeeName ? (
                    <>
                      {details.employeeName}
                      {details.employeeRole != "" ? (
                        <>
                          <br></br>
                          {details.employeeRole}, {details.employeeBranch}
                        </>
                      ) : (
                        ""
                      )}
                      {details.employeeAddress != "" ? (
                        <>
                          <br></br>
                          {details.employeeAddress}
                        </>
                      ) : (
                        ""
                      )}
                      {details.employeePhone != "" ? (
                        <>
                          <br></br>
                          Phone: {details.employeePhone}
                        </>
                      ) : (
                        ""
                      )}

                      <br></br>
                    </>
                  ) : (
                    ""
                  )}
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
                  <Row>
                    <Col span={14}>CREATED BY :</Col>
                    <Col span={10}>
                      {Auth.profile.name ? Auth.profile.name : ""}
                    </Col>
                  </Row>
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
                      <tr>
                        <td>1</td>
                        <td style={{ width: "70%", height: "5vh" }}>
                          {details.loanType == "advance" ? (
                            <>Advance payment</>
                          ) : (
                            <>EMI payment</>
                          )}
                        </td>

                        <td>{formatter.format(details.loanAmount)}</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td style={{ width: "70%" }}></td>

                        <td></td>
                      </tr>
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
                      {details.payment ? details.payment : ""}
                      {/* {details.Account[0] ? details.Account[0].name : ""}

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
                      )} */}
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
                            {formatter.format(details.loanAmount)}
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
                      maxHeight: "120px",
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

              {details.employeeName ? (
                <>
                  {details.employeeName}
                  {details.employeeRole != "" ? (
                    <>
                      <br></br>
                      {details.employeeRole}, {details.employeeBranch}
                    </>
                  ) : (
                    ""
                  )}
                  {details.employeeAddress != "" ? (
                    <>
                      <br></br>
                      {details.employeeAddress}
                    </>
                  ) : (
                    ""
                  )}
                  {details.employeePhone != "" ? (
                    <>
                      <br></br>
                      Phone: {details.employeePhone}
                    </>
                  ) : (
                    ""
                  )}

                  <br></br>
                </>
              ) : (
                ""
              )}
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
              <Row>
                <Col span={14}>CREATED BY :</Col>
                <Col span={10}>
                  {Auth.profile.name ? Auth.profile.name : ""}
                </Col>
              </Row>
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
                  <tr>
                    <td>1</td>
                    <td style={{ width: "70%", height: "16vh" }}>
                      {details.loanType == "advance" ? (
                        <>Advance payment</>
                      ) : (
                        <>EMI payment</>
                      )}
                    </td>

                    <td>{formatter.format(details.loanAmount)}</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td style={{ width: "70%" }}></td>

                    <td></td>
                  </tr>
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
                  {details.payment ? details.payment : ""}
                  {/* {details.payment ? details.payment : ""}

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
                  )} */}
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
                        {formatter.format(details.loanAmount)}
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
    Auth: state.auth,
    businessprofile: state.settings.businessprofile,
  };
};

export default connect(mapStateToProps, {
  getBusinessProfile,
  getSpecificLocation,
})(Quickview);
