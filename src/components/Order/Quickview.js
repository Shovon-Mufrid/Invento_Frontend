import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import ReactToPrint from "react-to-print";
import {
  getInvoiceItem,
  getServices,
  getSpecificInvoice,
} from "../../actions/invoiceItem";
import { getInvoiceMeasurement } from "../../actions/measurment";
import { getBusinessProfile } from "../../actions/settings";
import { getSpecificLocation } from "../../actions/warehouseAction";

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
  getInvoiceItem,
  getServices,
  getBusinessProfile,
  businessprofile,
  getInvoiceMeasurement,
  getSpecificLocation,
  getSpecificInvoice,
}) => {
  var formatter = new Intl.NumberFormat("en-IN");
  const componentRef = useRef();
  const [visible, setVisible] = useState(false);
  const [loading, setloading] = useState(true);
  const [data, setdata] = useState([]);
  const [measurements, setmeasurements] = useState([]);
  const [branch, setbranch] = useState([]);
  const [services, setservices] = useState([]);
  const count = useRef(0);
  const serialcount = useRef(0);

  const showDrawer = () => {
    getSpecificInvoice(details.id).then((result) => {
      console.log(result);
    });
    getSpecificLocation(details.location).then((result) => {
      setbranch(result);
    });
    getInvoiceItem(details.id).then((e) => {
      getBusinessProfile();
      getServices(details.id).then((service) => {
        getInvoiceMeasurement(details.id).then((result) => {
          if (result.length > 0) {
            setmeasurements(result[0]);
          } else {
            setmeasurements(false);
          }
          count.current = e.length + service.length;
          if (count.current < 10) count.current = 10 - count.current;
          else {
            count.current = 0;
          }
          setdata([...e, ...service]);

          setloading(false);
          setservices(service);
        });
      });
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
              {item.details ? (
                <td>
                  {" "}
                  <div
                    className="d-div"
                    dangerouslySetInnerHTML={{ __html: item.details }}
                  ></div>
                </td>
              ) : (
                <td> {item.Details}</td>
              )}

              <td>{formatter.format(item.price)}</td>

              <td style={{ textAlign: "center", margin: "auto" }}>
                {item.quantity}
              </td>
              <td style={{ textAlign: "center", margin: "auto" }}>
                {formatter.format(item.price * item.quantity)}
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
          width="40%"
          onClose={onClose}
          visible={visible}
          placement="right"
          bodyStyle={{ margin: 0 }}
        >
          <ReactToPrint
            trigger={() => <button>Print this out!</button>}
            content={() => componentRef.current}
          />
          <div style={{ display: "none" }}>
            <div ref={componentRef} style={{ padding: "10px" }}>
              <Row
                className="invoice_print_fontSize"
                style={{
                  // borderBottom: "2px solid lightgray",
                  marginTop: "10px",

                  paddingBottom: "5px",
                }}
              >
                <Col
                  span={24}
                  style={{ textAlign: "center", fontSize: "12px" }}
                >
                  {/* {renderImage()} */}
                  <b>{branch.CompanyName}</b>
                  {/* <br></br>
                  {branch.name}
                  <br></br>
                  {branch.address}
                  {console.log(branch)} */}
                </Col>
                <Col span={24}>
                  MUSHAK 6.3<br></br>
                  INVOICE N0.{" "}
                  {details.invoice_number ? (
                    <b>{details.invoice_number}</b>
                  ) : (
                    ""
                  )}{" "}
                  {/*<br></br> ORDER NO.{" "}
                  {details.order_number ? <b>{details.order_number}</b> : ""} */}
                  <br></br>
                  {branch.contact ? (
                    <>
                      SHOWROOM CONTACT : <b>{branch.contact}</b> <br></br>
                    </>
                  ) : (
                    ""
                  )}
                  {details.issue_date ? (
                    <>
                      ISSUE DATE : {details.issue_date}
                      <br></br>
                    </>
                  ) : (
                    ""
                  )}
                  {details.delivery_date ? (
                    <>
                      DELIVERY DATE : {details.delivery_date}
                      <br></br>
                    </>
                  ) : (
                    ""
                  )}
                  {details.program_date ? (
                    <>PROGRAM DATE : {details.program_date}</>
                  ) : (
                    ""
                  )}
                </Col>
                {details.contact ? (
                  <>
                    <Row>
                      <Col span={24}>
                        {details.Contact[0].name ? (
                          <>CLIENT NAME : {details.Contact[0].name}</>
                        ) : (
                          ""
                        )}
                      </Col>
                      <Col span={24}>
                        {details.Contact[0].phone ? (
                          <>CONTACT : {details.Contact[0].phone}</>
                        ) : (
                          ""
                        )}
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        {details.Contact[0].address ? (
                          <>ADDRESS : {details.Contact[0].address}</>
                        ) : (
                          ""
                        )}
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        {details.shipping_address ? (
                          <>SHIPPING ADDRESS : {details.shipping_address}</>
                        ) : (
                          ""
                        )}
                      </Col>
                    </Row>
                  </>
                ) : (
                  <></>
                )}
              </Row>
              <br></br>
              <Row>
                <Col span={24}>
                  <table className="product_table invoice_print_fontSize">
                    <tbody>
                      <tr style={{ fontWeight: "500" }}>
                        <td>SL</td>
                        <td>PRODUCT DETAILS</td>
                        {/* <td>DESIGN CODE</td> */}
                        <td>RATE</td>
                        <td>QTY</td>
                        <td>AMOUNT</td>
                      </tr>
                      {renderitems()}
                      {/* {renderservices()} */}
                      {/* {renderblanktables()} */}
                    </tbody>
                  </table>
                  <Row>
                    <Col
                      span={24}
                      className="invoice_print_fontSize"
                      style={{
                        textAlign: "right",
                        marginTop: "5px",
                      }}
                    >
                      {details.tax > 0 ? (
                        <>
                          <Row>
                            <Col span={18} style={{ margin: "auto" }}>
                              VAT (Inclusive)
                            </Col>
                            <Col span={5} offset={1}>
                              <span className="order_span_bill ">
                                {formatter.format(details.tax)}
                              </span>
                            </Col>
                          </Row>
                        </>
                      ) : (
                        ""
                      )}
                      {details.delivery_charge > 0 ? (
                        <>
                          <Row>
                            <Col span={18} style={{ margin: "auto" }}>
                              DELIVERY CHARGE
                            </Col>
                            <Col span={5} offset={1}>
                              <span className="order_span_bill">
                                {formatter.format(details.delivery_charge)}
                              </span>
                            </Col>
                          </Row>
                        </>
                      ) : (
                        ""
                      )}
                      {details.discount > 0 ? (
                        <>
                          <Row>
                            <Col span={18} style={{ margin: "auto" }}>
                              DISCOUNT
                            </Col>
                            <Col span={5} offset={1}>
                              <span className="order_span_bill">
                                {formatter.format(details.discount)}
                              </span>
                            </Col>
                          </Row>
                        </>
                      ) : (
                        ""
                      )}

                      <Row>
                        <Col span={18} style={{ margin: "auto" }}>
                          TOTAL AMOUNT
                        </Col>
                        <Col span={5} offset={1}>
                          <span className="order_span_bill">
                            {formatter.format(details.bill)}
                          </span>
                        </Col>
                      </Row>

                      <Row>
                        <Col span={18} style={{ margin: "auto" }}>
                          TOTAL PAYMENT
                        </Col>
                        <Col span={5} offset={1}>
                          <span className="order_span_bill">
                            {formatter.format(details.payment)}
                          </span>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={18} style={{ margin: "auto" }}>
                          BALANCE DUE
                        </Col>
                        <Col span={5} offset={1}>
                          <span className="order_span_bill">
                            {formatter.format(details.due)}
                          </span>
                        </Col>
                      </Row>
                    </Col>
                    {/* <Col
                      span={6}
                      style={{ textAlign: "left", marginTop: "5px" }}
                    >
                      <h3
                        style={{
                          borderBottom: "2px solid gray",
                          display: "inline-block",
                        }}
                      >
                        PAYMENT METHOD
                      </h3>
                      <br></br>
                      {details.Payment_method}
                      <br></br>
                      {details.Account_no ? (
                        <>
                          <small>Account no. {details.Account_no}</small>
                        </>
                      ) : (
                        ""
                      )}
                    </Col> */}
                  </Row>
                </Col>
              </Row>
              <br></br>
              <span
                className="invoice_print_fontSize"
                style={{ marginTop: "10px" }}
              >
                Powered by theicthub.com
              </span>
            </div>
          </div>
          <div>
            <div style={{ padding: "10px" }}>
              <Row
                // className="invoice_print_fontSize"
                style={{
                  // borderBottom: "2px solid lightgray",
                  marginTop: "10px",
                  paddingBottom: "5px",
                }}
              >
                <Col span={24} style={{ textAlign: "center" }}>
                  {/* {renderImage()} */}
                  <b>{branch.CompanyName}</b>
                  {/* <br></br>
                  {branch.name}
                  <br></br>
                  {branch.address}
                  {console.log(branch)} */}
                </Col>
                <Col span={24}>
                  MUSHAK 6.3<br></br>
                  INVOICE N0.{" "}
                  {details.invoice_number ? (
                    <b>{details.invoice_number}</b>
                  ) : (
                    ""
                  )}{" "}
                  {/*<br></br> ORDER NO.{" "}
                  {details.order_number ? <b>{details.order_number}</b> : ""} */}
                  <br></br>
                  {branch.contact ? (
                    <>
                      SHOWROOM CONTACT : <b>{branch.contact}</b> <br></br>
                    </>
                  ) : (
                    ""
                  )}
                  {details.issue_date ? (
                    <>
                      ISSUE DATE : {details.issue_date}
                      <br></br>
                    </>
                  ) : (
                    ""
                  )}
                  {details.delivery_date ? (
                    <>
                      DELIVERY DATE : {details.delivery_date}
                      <br></br>
                    </>
                  ) : (
                    ""
                  )}
                  {details.program_date ? (
                    <>PROGRAM DATE : {details.program_date}</>
                  ) : (
                    ""
                  )}
                </Col>
                {details.contact ? (
                  <>
                    <Row>
                      <Col span={24}>
                        {details.Contact[0].name ? (
                          <>CLIENT NAME : {details.Contact[0].name}</>
                        ) : (
                          ""
                        )}
                      </Col>
                      <Col span={24}>
                        {details.Contact[0].phone ? (
                          <>CONTACT : {details.Contact[0].phone}</>
                        ) : (
                          ""
                        )}
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        {details.Contact[0].address ? (
                          <>ADDRESS : {details.Contact[0].address}</>
                        ) : (
                          ""
                        )}
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        {details.shipping_address ? (
                          <>SHIPPING ADDRESS : {details.shipping_address}</>
                        ) : (
                          ""
                        )}
                      </Col>
                    </Row>
                  </>
                ) : (
                  <></>
                )}
              </Row>
              <br></br>
              <Row>
                <Col span={24}>
                  <table className="product_table ">
                    <tbody>
                      <tr style={{ fontWeight: "500" }}>
                        <td>SL</td>
                        <td>PRODUCT DETAILS</td>
                        {/* <td>DESIGN CODE</td> */}
                        <td>RATE</td>
                        <td>QTY</td>
                        <td>AMOUNT</td>
                      </tr>
                      {renderitems()}
                      {/* {renderservices()} */}
                      {/* {renderblanktables()} */}
                    </tbody>
                  </table>
                  <Row>
                    <Col
                      span={24}
                      style={{
                        textAlign: "right",
                        marginTop: "5px",
                      }}
                    >
                      {details.tax > 0 ? (
                        <>
                          <Row>
                            <Col span={18} style={{ margin: "auto" }}>
                              VAT (Inclusive)
                            </Col>
                            <Col span={5} offset={1}>
                              <span className="order_span_bill">
                                {formatter.format(details.tax)}
                              </span>
                            </Col>
                          </Row>
                        </>
                      ) : (
                        ""
                      )}
                      {details.delivery_charge > 0 ? (
                        <>
                          <Row>
                            <Col span={18} style={{ margin: "auto" }}>
                              DELIVERY CHARGE
                            </Col>
                            <Col span={5} offset={1}>
                              <span className="order_span_bill">
                                {formatter.format(details.delivery_charge)}
                              </span>
                            </Col>
                          </Row>
                        </>
                      ) : (
                        ""
                      )}
                      {details.discount > 0 ? (
                        <>
                          <Row>
                            <Col span={18} style={{ margin: "auto" }}>
                              DISCOUNT
                            </Col>
                            <Col span={5} offset={1}>
                              <span className="order_span_bill">
                                {formatter.format(details.discount)}
                              </span>
                            </Col>
                          </Row>
                        </>
                      ) : (
                        ""
                      )}

                      <Row>
                        <Col span={18} style={{ margin: "auto" }}>
                          TOTAL AMOUNT
                        </Col>
                        <Col span={5} offset={1}>
                          <span className="order_span_bill">
                            {formatter.format(details.bill)}
                          </span>
                        </Col>
                      </Row>

                      <Row>
                        <Col span={18} style={{ margin: "auto" }}>
                          TOTAL PAYMENT
                        </Col>
                        <Col span={5} offset={1}>
                          <span className="order_span_bill">
                            {formatter.format(details.payment)}
                          </span>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={18} style={{ margin: "auto" }}>
                          BALANCE DUE
                        </Col>
                        <Col span={5} offset={1}>
                          <span className="order_span_bill">
                            {formatter.format(details.due)}
                          </span>
                        </Col>
                      </Row>
                    </Col>
                    {/* <Col
                      span={6}
                      style={{ textAlign: "left", marginTop: "5px" }}
                    >
                      <h3
                        style={{
                          borderBottom: "2px solid gray",
                          display: "inline-block",
                        }}
                      >
                        PAYMENT METHOD
                      </h3>
                      <br></br>
                      {details.Payment_method}
                      <br></br>
                      {details.Account_no ? (
                        <>
                          <small>Account no. {details.Account_no}</small>
                        </>
                      ) : (
                        ""
                      )}
                    </Col> */}
                  </Row>
                </Col>
              </Row>
            </div>
          </div>
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
  getInvoiceItem,
  getServices,
  getBusinessProfile,
  getInvoiceMeasurement,
  getSpecificLocation,
  getSpecificInvoice,
})(Quickview);
