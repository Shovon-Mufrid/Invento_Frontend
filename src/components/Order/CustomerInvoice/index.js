import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import ReactToPrint from "react-to-print";
import {
  getInvoiceItemAno,
  getServicesAno,
  getSpecificCustomerInvoice,
} from "../../../actions/invoiceItem";
import { getInvoiceMeasurementAno } from "../../../actions/measurment";
import { getBusinessProfileAno } from "../../../actions/settings";
import { getSpecificLocationAno } from "../../../actions/warehouseAction";

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
import { result } from "lodash";

const { Option } = Select;

const Quickview = ({
  getInvoiceItemAno,
  getServicesAno,
  getBusinessProfileAno,
  businessprofile,
  getInvoiceMeasurementAno,
  getSpecificCustomerInvoice,
  getSpecificLocationAno,
}) => {
  var formatter = new Intl.NumberFormat("en-IN");
  const componentRef = useRef();
  const [visible, setVisible] = useState(false);
  const [loading, setloading] = useState(true);
  const [branch, setbranch] = useState([]);
  const [data, setdata] = useState([]);
  const [details, setdetails] = useState([]);
  const [measurements, setmeasurements] = useState([]);
  const [services, setservices] = useState([]);
  const count = useRef(0);
  const serialcount = useRef(0);
  const { id } = useParams();

  useEffect(() => {
    getSpecificCustomerInvoice(id).then((result) => {
      let invoiceno = prompt("Please type your invoice no.");
      if (invoiceno == result.invoice_number) {
        setdetails(result);
        getBusinessProfileAno();
        setmeasurements(result.measurement[0]);
        count.current = result.invoice_items.length + result.services.length;
        if (count.current < 10) count.current = 10 - count.current;
        else {
          count.current = 0;
        }
        setdata([...result.invoice_items, ...result.services]);
        setservices(result.services);

        console.log(result);
        getSpecificLocationAno(result.location.id).then((r) => {
          setbranch(r);
          setloading(false);
        });
      } else {
        alert("Wrong invoice number");
      }
    });
  }, []);

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
              {/* {item.details ? (
                <td></td>
              ) : (
                <td> {item.Product[0].Deatils[0].product_code}</td>
              )} */}
              {item.details ? (
                <td></td>
              ) : (
                <td>{formatter.format(item.Product[0].selling_price)}</td>
              )}

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

  if (loading) {
    return <Skeleton active />;
  } else {
    return (
      <>
        <div
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            padding: "1%",
            border: "2px solid gray",
          }}
        >
          <ReactToPrint
            trigger={() => <Button type="primary">Print this out!</Button>}
            content={() => componentRef.current}
          />
          <div style={{ display: "none" }}>
            <div
              className="invoice_print_fontSize"
              ref={componentRef}
              style={{ padding: "10px" }}
            >
              <Row
                className="invoice_print_fontSize"
                style={{
                  borderBottom: "2px solid lightgray",
                  paddingBottom: "5px",
                }}
              >
                <Col
                  span={8}
                  style={{
                    paddingTop: "45px",
                  }}
                >
                  INVOICE NO.{" "}
                  {details.invoice_number ? (
                    <b>{details.invoice_number}</b>
                  ) : (
                    ""
                  )}
                </Col>
                <Col span={8} style={{ textAlign: "center" }}>
                  {renderImage()}
                </Col>
                <Col
                  span={8}
                  style={{
                    textAlign: "right",
                    paddingTop: "35px",
                  }}
                >
                  MUSHAK 6.3
                  {/* <br></br> ORDER NO.{" "}
                  {details.order_number ? <b>{details.order_number}</b> : ""} */}
                </Col>
              </Row>
              {details.contact ? (
                <>
                  <Row>
                    <Col span={16}>
                      <p style={{ display: "inline-block" }}>CLIENT NAME : </p>
                      {details.Contact[0].name ? (
                        <> {details.Contact[0].name}</>
                      ) : (
                        ""
                      )}
                    </Col>
                    <Col span={8} style={{ textAlign: "right" }}>
                      <p style={{ display: "inline-block" }}>CONTACT : </p>
                      {details.Contact[0].phone ? (
                        <> {details.Contact[0].phone}</>
                      ) : (
                        ""
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <p style={{ display: "inline-block" }}>ADDRESS : </p>
                      {details.Contact[0].address ? (
                        <> {details.Contact[0].address}</>
                      ) : (
                        ""
                      )}
                    </Col>
                  </Row>
                </>
              ) : (
                <></>
              )}
              <Row>
                <Col span={24}>
                  <p style={{ display: "inline-block" }}>SHIPPING ADDRESS : </p>
                  {details.shipping_address ? (
                    <> {details.shipping_address}</>
                  ) : (
                    ""
                  )}
                </Col>
              </Row>
              {/* 
          
          {/* <Divider /> */}

              <Row>
                <Col span={18}>
                  <table className="product_table invoice_print_fontSize">
                    <tbody>
                      <tr style={{ fontWeight: "500" }}>
                        <td>NO</td>
                        <td>PRODUCT DETAILS</td>
                        {/* <td>DESIGN CODE</td> */}
                        <td>RATE</td>
                        <td>QTY</td>
                        <td>AMOUNT</td>
                      </tr>
                      {renderitems()}
                      {/* {renderservices()} */}
                      {renderblanktables()}
                    </tbody>
                  </table>
                  <Row>
                    <Col
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
                    </Col>
                    <Col
                      span={9}
                      style={{ textAlign: "right", marginTop: "5px" }}
                    >
                      {details.tax > 0 ? (
                        <>
                          <Row>
                            <Col span={14} style={{ margin: "auto" }}>
                              VAT
                            </Col>
                            <Col span={9} offset={1}>
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
                            <Col span={14} style={{ margin: "auto" }}>
                              DELIVERY CHARGE
                            </Col>
                            <Col span={9} offset={1}>
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
                            <Col span={14} style={{ margin: "auto" }}>
                              DISCOUNT
                            </Col>
                            <Col span={9} offset={1}>
                              <span className="order_span_bill">
                                {formatter.format(details.discount)}
                              </span>
                            </Col>
                          </Row>
                        </>
                      ) : (
                        ""
                      )}
                    </Col>

                    <Col
                      span={9}
                      style={{ textAlign: "right", marginTop: "5px" }}
                    >
                      <Row>
                        <Col span={14} style={{ margin: "auto" }}>
                          TOTAL AMOUNT
                        </Col>
                        <Col span={9} offset={1}>
                          <span className="order_span_bill">
                            {formatter.format(details.bill)}
                          </span>
                        </Col>
                      </Row>

                      <Row>
                        <Col span={14} style={{ margin: "auto" }}>
                          TOTAL PAYMENT
                        </Col>
                        <Col span={9} offset={1}>
                          <span className="order_span_bill">
                            {formatter.format(details.payment)}
                          </span>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={14} style={{ margin: "auto" }}>
                          BALANCE DUE
                        </Col>
                        <Col span={9} offset={1}>
                          <span className="order_span_bill">
                            {formatter.format(details.due)}
                          </span>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
                <Col span={6}>
                  <Row style={{ textAlign: "center" }}>
                    <Col span={24} style={{ marginTop: "5px" }}>
                      SHOWROOM CONTACT
                      <span className="order_span">
                        {branch.contact ? branch.contact : ""}
                      </span>
                    </Col>
                    <Col span={24} style={{ marginTop: "5px" }}>
                      ORDER DATE
                      <span className="order_span">{details.issue_date}</span>
                    </Col>
                    <Col span={24} style={{ marginTop: "5px" }}>
                      DELIVERY DATE
                      <span className="order_span">
                        {details.delivery_date}
                      </span>
                    </Col>
                    <Col span={24} style={{ marginTop: "5px" }}>
                      PROGRAM DATE
                      <span className="order_span">
                        {details.program_date ? details.program_date : "-"}
                      </span>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Divider />
              <Row>
                <Col span={8}>
                  <Row>
                    <Col span={8} style={{ margin: "auto" }}>
                      INVOICE NO.{" "}
                    </Col>
                    <Col span={16}>
                      <span className="order_span_service">
                        {details.invoice_number ? details.invoice_number : ""}
                      </span>
                    </Col>
                  </Row>
                  <br></br>
                  <Row>
                    <Col span={24}>
                      <h3>EXTRA ADDITIONS</h3>
                      <div
                        className="d-div"
                        style={{
                          minHeight: "30vh",
                          border: "2px solid black",
                          padding: "10px",
                        }}
                        dangerouslySetInnerHTML={{ __html: measurements.Note }}
                      ></div>
                    </Col>
                  </Row>
                  <br></br>
                  <h3>ADDRESS</h3>

                  <small>
                    <div
                      className="d-div"
                      dangerouslySetInnerHTML={{
                        __html: branch.address,
                      }}
                    ></div>
                  </small>
                </Col>
                <Col span={15} offset={1}>
                  <Row>
                    <Col span={8} style={{ margin: "auto" }}>
                      DELIVERY DATE
                    </Col>
                    <Col span={16}>
                      <span className="order_span_service">
                        {details.delivery_date}
                      </span>
                    </Col>
                  </Row>
                  <br></br>
                  <h3>MEASUREMENT DETAILS</h3>
                  <Row
                    style={{
                      border: "2px solid black",
                      padding: "10px",
                    }}
                  >
                    <Col
                      span={15}
                      style={{ borderRight: "1px solid lightgray" }}
                    >
                      <h5>TOPS</h5>
                      {measurements.Blouse ? (
                        <Checkbox checked={true} />
                      ) : (
                        <Checkbox checked={false} />
                      )}{" "}
                      Blouse
                      {measurements.Kameez ? (
                        <Checkbox checked={true} />
                      ) : (
                        <Checkbox checked={false} />
                      )}{" "}
                      KAMEEZ
                      {measurements.Gown ? (
                        <Checkbox checked={true} />
                      ) : (
                        <Checkbox checked={false} />
                      )}{" "}
                      GOWN
                      <br></br>
                      <br></br>
                      <Row>
                        <Col span={11}>
                          <table className="invoice_print_fontSize">
                            <tr>
                              <td>CHEST :</td>
                              <td className="td_dotted1">
                                {measurements.Chest ? measurements.Chest : ""}
                              </td>
                            </tr>
                            <tr>
                              <td>WAIST :</td>
                              <td className="td_dotted1">
                                {measurements.Waist ? measurements.Waist : ""}
                              </td>
                            </tr>
                            <tr>
                              <td>HIP :</td>
                              <td className="td_dotted1">
                                {measurements.Hip ? measurements.Hip : ""}
                              </td>
                            </tr>
                            <tr>
                              <td>END :</td>
                              <td className="td_dotted1">
                                {measurements.End ? measurements.End : ""}
                              </td>
                            </tr>
                            <tr>
                              <td>SHOULDER :</td>
                              <td className="td_dotted1">
                                {measurements.Shoulder
                                  ? measurements.Shoulder
                                  : ""}
                              </td>
                            </tr>
                            <tr>
                              <td>ARM HOLE :</td>
                              <td className="td_dotted1">
                                {measurements.Arm_hole
                                  ? measurements.Arm_hole
                                  : ""}
                              </td>
                            </tr>
                            <tr>
                              <td> SLEEVE L. :</td>
                              <td className="td_dotted1">
                                {measurements.Sleeve_l
                                  ? measurements.Sleeve_l
                                  : ""}
                              </td>
                            </tr>
                            <tr>
                              <td> MUSCLE :</td>
                              <td className="td_dotted1">
                                {measurements.Muscle ? measurements.Muscle : ""}
                              </td>
                            </tr>
                          </table>
                        </Col>
                        <Col span={13}>
                          <br></br>
                          <table className="2nd_td_dotted invoice_print_fontSize">
                            <tr>
                              <td>HAND OPENNING :</td>
                              <td className="td_dotted">
                                {measurements.Hand_opening
                                  ? measurements.Hand_opening
                                  : ""}
                              </td>
                            </tr>
                            <tr>
                              <td>LENGTH:</td>
                              <td className="td_dotted">
                                {measurements.Length ? measurements.Length : ""}
                              </td>
                            </tr>
                            <tr>
                              <td>SLIT:</td>
                              <td className="td_dotted">
                                {measurements.Slit ? measurements.Slit : ""}
                              </td>
                            </tr>
                            <tr>
                              <td>NEEK DEEP (F) :</td>
                              <td className="td_dotted">
                                {measurements.Neck_deep_f
                                  ? measurements.Neck_deep_f
                                  : ""}
                              </td>
                            </tr>
                            <tr>
                              <td>NEEK DEEP (B) :</td>
                              <td className="td_dotted">
                                {measurements.Neck_deep_b
                                  ? measurements.Neck_deep_b
                                  : ""}
                              </td>
                            </tr>
                            <tr>
                              <td>HALF BODY</td>
                              <td className="td_dotted">
                                {measurements.Half_body
                                  ? measurements.Half_body
                                  : ""}
                              </td>
                            </tr>
                          </table>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={8} offset={1}>
                      <h5>Bottom</h5>
                      {measurements.Skirt ? (
                        <Checkbox checked={true} />
                      ) : (
                        <Checkbox checked={false} />
                      )}{" "}
                      SKIRT
                      {measurements.Paladzo ? (
                        <Checkbox checked={true} />
                      ) : (
                        <Checkbox checked={false} />
                      )}{" "}
                      PALADZO
                      <br></br>
                      {measurements.Pant ? (
                        <Checkbox checked={true} />
                      ) : (
                        <Checkbox checked={false} />
                      )}{" "}
                      PANT
                      {measurements.Gharara ? (
                        <Checkbox checked={true} />
                      ) : (
                        <Checkbox checked={false} />
                      )}{" "}
                      GHARARA
                      <br></br>
                      <br></br>
                      <table className="2nd_td_dotted invoice_print_fontSize">
                        <tr>
                          <td>LENGTH :</td>
                          <td className="td_dotted">
                            {measurements.Length_bottom
                              ? measurements.Length_bottom
                              : ""}
                          </td>
                        </tr>
                        <tr>
                          <td>WAIST :</td>
                          <td className="td_dotted">
                            {measurements.Waist_bottom
                              ? measurements.Waist_bottom
                              : ""}
                          </td>
                        </tr>
                        <tr>
                          <td>HIP :</td>
                          <td className="td_dotted">
                            {measurements.Hip_bottom
                              ? measurements.Hip_bottom
                              : ""}
                          </td>
                        </tr>
                        <tr>
                          <td>THIGH :</td>
                          <td className="td_dotted">
                            {measurements.Thigh ? measurements.Thigh : ""}
                          </td>
                        </tr>
                        <tr>
                          <td>KNEE :</td>
                          <td className="td_dotted">
                            {measurements.Knee ? measurements.Knee : ""}
                          </td>
                        </tr>
                        <tr>
                          <td>LEG OPENNING :</td>
                          <td className="td_dotted">
                            {measurements.Leg_openning
                              ? measurements.Leg_openning
                              : ""}
                          </td>
                        </tr>
                      </table>
                    </Col>
                  </Row>
                  <br></br>
                  <h3>TERMS & CONDITIONS</h3>
                  <small>
                    <div
                      className="d-div"
                      dangerouslySetInnerHTML={{
                        __html: businessprofile.invoice_terms,
                      }}
                    ></div>
                  </small>
                  <br></br>

                  <Row style={{ minHeight: "80px" }}>
                    <Col span={12} style={{ textAlign: "center" }}>
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
                    <Col span={12} style={{ textAlign: "center" }}>
                      <h3
                        style={{
                          marginLeft: "80px",
                          borderTop: "2px solid black",
                          width: "70%",
                        }}
                      >
                        SIGNATURE
                      </h3>
                    </Col>
                    <Col span={12} style={{ textAlign: "center" }}>
                      <h3
                        style={{
                          marginLeft: "40px",

                          marginBottom: "-10px",
                          padding: "0px",
                          borderTop: "2px solid black",
                          width: "70%",
                        }}
                      >
                        CLIENT SIGNATURE
                      </h3>
                      <small>(WITH DATE)</small>
                    </Col>
                  </Row>
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
            <Col
              span={8}
              style={{
                paddingTop: "35px",
              }}
            >
              INVOICE NO.{" "}
              {details.invoice_number ? <b>{details.invoice_number}</b> : ""}
            </Col>
            <Col span={8} style={{ textAlign: "center" }}>
              {renderImage()}
            </Col>
            <Col span={8} style={{ textAlign: "right", paddingTop: "15px" }}>
              MUSHAK 6.3
              {/* <br></br> ORDER NO.{" "}
              {details.order_number ? <b>{details.order_number}</b> : ""} */}
            </Col>
          </Row>
          {details.contact ? (
            <>
              <Row>
                <Col span={16}>
                  <p style={{ display: "inline-block" }}>CLIENT NAME : </p>
                  {details.Contact[0].name ? (
                    <> {details.Contact[0].name}</>
                  ) : (
                    ""
                  )}
                </Col>
                <Col span={8} style={{ textAlign: "right" }}>
                  <p style={{ display: "inline-block" }}>CONTACT : </p>
                  {details.Contact[0].phone ? (
                    <> {details.Contact[0].phone}</>
                  ) : (
                    ""
                  )}
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <p style={{ display: "inline-block" }}>ADDRESS : </p>
                  {details.Contact[0].address ? (
                    <> {details.Contact[0].address}</>
                  ) : (
                    ""
                  )}
                </Col>
              </Row>
            </>
          ) : (
            <></>
          )}
          <Row>
            <Col span={24}>
              <p style={{ display: "inline-block" }}>SHIPPING ADDRESS : </p>
              {details.shipping_address ? <> {details.shipping_address}</> : ""}
            </Col>
          </Row>
          {/* 
          
          {/* <Divider /> */}
          <br></br>

          <Row>
            <Col sm={24} md={24} lg={18} xl={18}>
              <table className="product_table">
                <tbody>
                  <tr style={{ fontWeight: "500" }}>
                    <td>NO</td>
                    <td>PRODUCT DETAILS</td>
                    {/* <td>DESIGN CODE</td> */}
                    <td>RATE</td>
                    <td>QTY</td>
                    <td>AMOUNT</td>
                  </tr>
                  {renderitems()}
                  {/* {renderservices()} */}
                  {renderblanktables()}
                </tbody>
              </table>
              <Row>
                <Col
                  sm={24}
                  md={6}
                  lg={6}
                  xl={6}
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
                </Col>
                <Col
                  sm={24}
                  md={9}
                  lg={9}
                  xl={9}
                  style={{ textAlign: "right", marginTop: "5px" }}
                >
                  {details.tax > 0 ? (
                    <>
                      <Row>
                        <Col span={14} style={{ margin: "auto" }}>
                          VAT
                        </Col>
                        <Col span={9} offset={1}>
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
                        <Col span={14} style={{ margin: "auto" }}>
                          DELIVERY CHARGE
                        </Col>
                        <Col span={9} offset={1}>
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
                        <Col span={14} style={{ margin: "auto" }}>
                          DISCOUNT
                        </Col>
                        <Col span={9} offset={1}>
                          <span className="order_span_bill">
                            {formatter.format(details.discount)}
                          </span>
                        </Col>
                      </Row>
                    </>
                  ) : (
                    ""
                  )}
                </Col>

                <Col
                  sm={24}
                  md={9}
                  lg={9}
                  xl={9}
                  style={{ textAlign: "right", marginTop: "5px" }}
                >
                  <Row>
                    <Col span={14} style={{ margin: "auto" }}>
                      TOTAL AMOUNT
                    </Col>
                    <Col span={9} offset={1}>
                      <span className="order_span_bill">
                        {formatter.format(details.bill)}
                      </span>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={14} style={{ margin: "auto" }}>
                      TOTAL PAYMENT
                    </Col>
                    <Col span={9} offset={1}>
                      <span className="order_span_bill">
                        {formatter.format(details.payment)}
                      </span>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={14} style={{ margin: "auto" }}>
                      BALANCE DUE
                    </Col>
                    <Col span={9} offset={1}>
                      <span className="order_span_bill">
                        {formatter.format(details.due)}
                      </span>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col sm={24} md={6} lg={6} xl={6}>
              <Row style={{ textAlign: "center" }}>
                <Col span={24} style={{ marginTop: "5px" }}>
                  SHOWROOM CONTACT
                  <span className="order_span">
                    {branch.contact ? branch.contact : ""}
                  </span>
                </Col>
                <Col span={24} style={{ marginTop: "5px" }}>
                  ORDER DATE
                  <span className="order_span">{details.issue_date}</span>
                </Col>
                <Col span={24} style={{ marginTop: "5px" }}>
                  DELIVERY DATE
                  <span className="order_span">{details.delivery_date}</span>
                </Col>
                <Col span={24} style={{ marginTop: "5px" }}>
                  PROGRAM DATE
                  <span className="order_span">
                    {details.program_date ? details.program_date : "-"}
                  </span>
                </Col>
              </Row>
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col sm={24} md={8} lg={8} xl={8}>
              <Row>
                <Col span={8} style={{ margin: "auto" }}>
                  INVOICE NO.{" "}
                </Col>
                <Col span={16}>
                  <span className="order_span_service">
                    {details.invoice_number ? details.invoice_number : ""}
                  </span>
                </Col>
              </Row>
              <br></br>
              <Row>
                <Col span={24}>
                  <h3>EXTRA ADDITIONS</h3>
                  <div
                    style={{
                      minHeight: "50vh",
                      border: "2px solid black",
                      padding: "10px",
                    }}
                    dangerouslySetInnerHTML={{ __html: measurements.Note }}
                  ></div>
                </Col>
              </Row>
              <br></br>
              <h3>ADDRESS</h3>
              <br></br>
              <div
                className="d-div"
                dangerouslySetInnerHTML={{
                  __html: branch.address,
                }}
              ></div>
            </Col>
            <Col
              sm={24}
              md={16}
              lg={16}
              xl={16}
              style={{ paddingLeft: "10px" }}
            >
              <Row>
                <Col span={8} style={{ margin: "auto" }}>
                  DELIVERY DATE
                </Col>
                <Col span={16}>
                  <span className="order_span_service">
                    {details.delivery_date}
                  </span>
                </Col>
              </Row>
              <br></br>
              <h3>MEASUREMENT DETAILS</h3>
              <Row
                style={{
                  border: "2px solid black",
                  padding: "10px",
                }}
              >
                <Col span={15} style={{ borderRight: "1px solid lightgray" }}>
                  <h5>TOPS</h5>
                  {measurements.Blouse ? (
                    <Checkbox checked={true} disabled />
                  ) : (
                    <Checkbox checked={false} disabled />
                  )}{" "}
                  Blouse
                  {measurements.Kameez ? (
                    <Checkbox checked={true} disabled />
                  ) : (
                    <Checkbox checked={false} disabled />
                  )}{" "}
                  KAMEEZ
                  {measurements.Gown ? (
                    <Checkbox checked={true} disabled />
                  ) : (
                    <Checkbox checked={false} disabled />
                  )}{" "}
                  GOWN
                  <br></br>
                  <br></br>
                  <Row>
                    <Col span={11}>
                      <table>
                        <tr>
                          <td>CHEST :</td>
                          <td className="td_dotted1">
                            {measurements.Chest ? measurements.Chest : ""}
                          </td>
                        </tr>
                        <tr>
                          <td>WAIST :</td>
                          <td className="td_dotted1">
                            {measurements.Waist ? measurements.Waist : ""}
                          </td>
                        </tr>
                        <tr>
                          <td>HIP :</td>
                          <td className="td_dotted1">
                            {measurements.Hip ? measurements.Hip : ""}
                          </td>
                        </tr>
                        <tr>
                          <td>END :</td>
                          <td className="td_dotted1">
                            {measurements.End ? measurements.End : ""}
                          </td>
                        </tr>
                        <tr>
                          <td>SHOULDER :</td>
                          <td className="td_dotted1">
                            {measurements.Shoulder ? measurements.Shoulder : ""}
                          </td>
                        </tr>
                        <tr>
                          <td>ARM HOLE :</td>
                          <td className="td_dotted1">
                            {measurements.Arm_hole ? measurements.Arm_hole : ""}
                          </td>
                        </tr>
                        <tr>
                          <td> SLEEVE L. :</td>
                          <td className="td_dotted1">
                            {measurements.Sleeve_l ? measurements.Sleeve_l : ""}
                          </td>
                        </tr>
                        <tr>
                          <td> MUSCLE :</td>
                          <td className="td_dotted1">
                            {measurements.Muscle ? measurements.Muscle : ""}
                          </td>
                        </tr>
                      </table>
                    </Col>
                    <Col span={13}>
                      <br></br>
                      <table className="2nd_td_dotted">
                        <tr>
                          <td>HAND OPENNING :</td>
                          <td className="td_dotted">
                            {measurements.Hand_opening
                              ? measurements.Hand_opening
                              : ""}
                          </td>
                        </tr>
                        <tr>
                          <td>LENGTH:</td>
                          <td className="td_dotted">
                            {measurements.Length ? measurements.Length : ""}
                          </td>
                        </tr>
                        <tr>
                          <td>SLIT:</td>
                          <td className="td_dotted">
                            {measurements.Slit ? measurements.Slit : ""}
                          </td>
                        </tr>
                        <tr>
                          <td>NEEK DEEP (F) :</td>
                          <td className="td_dotted">
                            {measurements.Neck_deep_f
                              ? measurements.Neck_deep_f
                              : ""}
                          </td>
                        </tr>
                        <tr>
                          <td>NEEK DEEP (B) :</td>
                          <td className="td_dotted">
                            {measurements.Neck_deep_b
                              ? measurements.Neck_deep_b
                              : ""}
                          </td>
                        </tr>
                        <tr>
                          <td>HALF BODY</td>
                          <td className="td_dotted">
                            {measurements.Half_body
                              ? measurements.Half_body
                              : ""}
                          </td>
                        </tr>
                      </table>
                    </Col>
                  </Row>
                </Col>
                <Col span={8} offset={1}>
                  <h5>BOTTOM</h5>
                  {measurements.Skirt ? (
                    <Checkbox checked={true} disabled />
                  ) : (
                    <Checkbox checked={false} disabled />
                  )}{" "}
                  SKIRT
                  {measurements.Paladzo ? (
                    <Checkbox checked={true} disabled />
                  ) : (
                    <Checkbox checked={false} disabled />
                  )}{" "}
                  PALADZO
                  <br></br>
                  {measurements.Pant ? (
                    <Checkbox checked={true} disabled />
                  ) : (
                    <Checkbox checked={false} disabled />
                  )}{" "}
                  PANT
                  {measurements.Gharara ? (
                    <Checkbox checked={true} disabled />
                  ) : (
                    <Checkbox checked={false} disabled />
                  )}{" "}
                  GHARARA
                  <br></br>
                  <br></br>
                  <table className="2nd_td_dotted">
                    <tr>
                      <td>LENGTH :</td>
                      <td className="td_dotted">
                        {measurements.Length_bottom
                          ? measurements.Length_bottom
                          : ""}
                      </td>
                    </tr>
                    <tr>
                      <td>WAIST :</td>
                      <td className="td_dotted">
                        {measurements.Waist_bottom
                          ? measurements.Waist_bottom
                          : ""}
                      </td>
                    </tr>
                    <tr>
                      <td>HIP :</td>
                      <td className="td_dotted">
                        {measurements.Hip_bottom ? measurements.Hip_bottom : ""}
                      </td>
                    </tr>
                    <tr>
                      <td>THIGH :</td>
                      <td className="td_dotted">
                        {measurements.Thigh ? measurements.Thigh : ""}
                      </td>
                    </tr>
                    <tr>
                      <td>KNEE :</td>
                      <td className="td_dotted">
                        {measurements.Knee ? measurements.Knee : ""}
                      </td>
                    </tr>
                    <tr>
                      <td>LEG OPENNING :</td>
                      <td className="td_dotted">
                        {measurements.Leg_openning
                          ? measurements.Leg_openning
                          : ""}
                      </td>
                    </tr>
                  </table>
                </Col>
              </Row>
              <br></br>
              <h3>TERMS & CONDITIONS</h3>
              <div
                className="d-div"
                dangerouslySetInnerHTML={{
                  __html: businessprofile.invoice_terms,
                }}
              ></div>
              <br></br>
              <Row style={{ minHeight: "80px" }}>
                <Col span={12} style={{ textAlign: "center" }}>
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
                <Col span={12} style={{ textAlign: "center" }}>
                  <h3
                    style={{
                      marginLeft: "40px",
                      borderTop: "2px solid black",
                      width: "70%",
                    }}
                  >
                    SIGNATURE
                  </h3>
                </Col>
                <Col span={12} style={{ textAlign: "center" }}>
                  <h3
                    style={{
                      marginLeft: "40px",

                      marginBottom: "-10px",
                      padding: "0px",
                      borderTop: "2px solid black",
                      width: "70%",
                    }}
                  >
                    CLIENT SIGNATURE
                  </h3>
                  <small>(WITH DATE)</small>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    businessprofile: state.settings.businessprofile,
  };
};

export default connect(mapStateToProps, {
  getInvoiceItemAno,
  getServicesAno,
  getBusinessProfileAno,
  getInvoiceMeasurementAno,
  getSpecificCustomerInvoice,
  getSpecificLocationAno,
})(Quickview);
