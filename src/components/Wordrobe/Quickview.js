import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import ReactToPrint from "react-to-print";
import Barcode from "react-barcode";
import html2canvas from "html2canvas";
import { getWordrobeItem } from "../../actions/wordrobe";
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
  getWordrobeItem,
  businessprofile,
  getBusinessProfile,
  getSpecificLocation,
}) => {
  var formatter = new Intl.NumberFormat("en-IN", {
    maximumSignificantDigits: 3,
  });
  const componentRef = useRef();
  const [visible, setVisible] = useState(false);
  const [loading, setloading] = useState(true);
  const [branch, setbranch] = useState([]);
  const [data, setdata] = useState([]);
  const count = useRef(0);
  const serialcount = useRef(0);
  const totalitems = useRef(0);
  const totalamount = useRef(0);
  const showDrawer = () => {
    getBusinessProfile();
    getSpecificLocation(details.location).then((result) => {
      setbranch(result);
    });
    getWordrobeItem(details.id).then((service) => {
      count.current = service.length;
      if (count.current < 10) count.current = 10 - count.current;
      else {
        count.current = 0;
      }
      setdata(service);
      setloading(false);
    });
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const renderitems = () => {
    if (loading) {
      return <Skeleton active />;
    } else {
      totalitems.current = 0;
      totalamount.current = 0;
      return data.map((item, index) => {
        // console.log(item);
        totalitems.current += item.quantity;
        totalamount.current += item.quantity * item.price;
        serialcount.current = index + 1;
        return (
          <>
            <tr>
              <td>{index + 1}</td>

              <td>{item.Details}</td>

              {item.details ? (
                <td></td>
              ) : (
                <td> {item.Product[0].Deatils[0].product_code}</td>
              )}
              {item.details ? (
                <td></td>
              ) : (
                <td>{formatter.format(item.price)}</td>
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
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        );
      });
    }
  };

  const rendertotalitems = () => {
    if (loading) {
      return "";
    } else {
      return (
        <tr>
          <td>Total</td>
          <td></td>
          <td></td>
          <td></td>
          <td>{totalitems.current}</td>
          <td>{formatter.format(totalamount.current)}</td>
        </tr>
      );
    }
  };

  return (
    <>
      <>
        <a href="#" onClick={showDrawer} style={{ margin: 4 }}>
          Quick View
        </a>
        <Drawer
          // title="Invoice"
          width="850"
          onClose={onClose}
          visible={visible}
          // bodyStyle={{ paddingBottom: 80 }}
        >
          <ReactToPrint
            trigger={() => <button>Print this out!</button>}
            content={() => componentRef.current}
          />
          <div style={{ display: "none" }}>
            <div
              ref={componentRef}
              className="wordrobe_print_fontSize"
              style={{ padding: "10px" }}
            >
              <Row
                style={{
                  borderBottom: "2px solid lightgray",
                  paddingBottom: "5px",
                }}
              >
                <Col span={15}>
                  <small>
                    <div
                      className="d-div"
                      dangerouslySetInnerHTML={{
                        __html: branch.address,
                      }}
                    ></div>
                  </small>
                </Col>

                <Col span={9} style={{ textAlign: "right" }}>
                  <img
                    src={branch.logo}
                    style={{
                      maxHeight: "60px",
                      // right: "0",
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col
                  span={24}
                  style={{ textAlign: "left", paddingTop: "10px" }}
                >
                  <h2 style={{ textAlign: "center" }}>
                    Wardrobe Sponsorship Form
                  </h2>
                  <p>
                    ANZARA FASHION involves in selling exclusive women wear in
                    retail basis. We provided wardrobe sponsorship various
                    events and photoshoots purpose with not monetary exchange.
                    Fill up the following section:
                  </p>
                </Col>
              </Row>

              <Row>
                <Col span={24}>
                  <Row>
                    <Col span={11}>
                      <Row>
                        <Col span={13}>Order No.</Col>
                        <Col span={11}>
                          <span className="sponsorship_order_span">
                            {details.wordrobe_number
                              ? details.wordrobe_number
                              : "-"}
                          </span>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={5} offset={1}>
                      <Row>
                        <Col span={10}>Issue date:</Col>
                        <Col span={13}>
                          <span className="sponsorship_order_span">
                            {details.issue_date ? details.issue_date : "-"}
                          </span>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={6} offset={1}>
                      <Row>
                        <Col span={11}>Delivery date:</Col>
                        <Col span={13}>
                          <span className="sponsorship_order_span">
                            {details.delivery_date
                              ? details.delivery_date
                              : "-"}
                          </span>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
                {details.contact ? (
                  <>
                    <Col span={16} style={{ marginTop: "5px" }}>
                      <Row>
                        <Col span={9}>Company / Individual name:</Col>
                        <Col span={15}>
                          <span className="sponsorship_order_span">
                            {details.Contact[0].name
                              ? details.Contact[0].name
                              : "-"}
                          </span>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={7} offset={1} style={{ marginTop: "5px" }}>
                      <Row>
                        <Col span={6}>Contact:</Col>
                        <Col span={18}>
                          <span className="sponsorship_order_span">
                            {details.Contact[0].phone
                              ? details.Contact[0].phone
                              : "-"}
                          </span>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={24} style={{ marginTop: "5px" }}>
                      <Row>
                        <Col span={6}> Registered Address:</Col>
                        <Col span={18}>
                          <span className="sponsorship_order_span">
                            {details.Contact[0].address
                              ? details.Contact[0].address
                              : "-"}
                          </span>
                        </Col>
                      </Row>
                    </Col>
                  </>
                ) : (
                  <></>
                )}
                <Col span={24} style={{ marginTop: "5px" }}>
                  <Row>
                    <Col span={6}> Facebook Link:</Col>
                    <Col span={18}>
                      <span className="sponsorship_order_span">
                        {details.company_profile_link
                          ? details.company_profile_link
                          : "-"}
                      </span>
                    </Col>
                  </Row>
                </Col>
                <Col span={24} style={{ marginTop: "5px" }}>
                  <Row>
                    <Col span={6}> Photographer name / FB link:</Col>
                    <Col span={18}>
                      <span className="sponsorship_order_span">
                        {details.photographer_name
                          ? details.photographer_name
                          : "-"}
                      </span>
                    </Col>
                  </Row>
                </Col>
                <Col span={24} style={{ marginTop: "5px" }}>
                  <Row>
                    <Col span={6}> Model name / FB link:</Col>
                    <Col span={18}>
                      <span className="sponsorship_order_span">
                        {details.model_name ? details.model_name : "-"}
                      </span>
                    </Col>
                  </Row>
                </Col>
                <Col span={24} style={{ marginTop: "5px" }}>
                  <Row>
                    <Col span={6}>Makeup Artist name / FB link:</Col>
                    <Col span={18}>
                      <span className="sponsorship_order_span">
                        {details.makeup_artist_name
                          ? details.makeup_artist_name
                          : "-"}
                      </span>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row>
                <Col
                  span={24}
                  style={{
                    textAlign: "left",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                  }}
                >
                  <h2 style={{ textAlign: "center" }}>Terms & Conditions</h2>
                  <small>
                    <div
                      className="d-div"
                      dangerouslySetInnerHTML={{
                        __html: businessprofile.wordrobe_terms,
                      }}
                    ></div>
                  </small>
                </Col>
              </Row>

              <h2 style={{ textAlign: "center" }}>Wardrobe Details & Price</h2>
              <Row style={{ marginTop: 10 }}>
                <table className="product_table invoice_print_fontSize">
                  <tbody>
                    <tr style={{ fontWeight: "500" }}>
                      <td>NO</td>
                      <td>PRODUCT DETAILS</td>
                      <td>DESIGN CODE</td>
                      <td>RATE</td>
                      <td>QTY</td>
                      <td>AMOUNT</td>
                    </tr>
                    {renderitems()}
                    {/* {renderservices()} */}
                    {renderblanktables()}
                    {rendertotalitems()}
                  </tbody>
                </table>
              </Row>

              <Row style={{ minHeight: "60px", marginTop: "40px" }}>
                <Col span={12} style={{ textAlign: "center" }}></Col>
                <Col span={12} style={{ textAlign: "center" }}>
                  <img
                    src={businessprofile.signature}
                    style={{
                      maxHeight: "60px",
                      left: "0",
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={12} style={{ textAlign: "center" }}>
                  <h4
                    style={{
                      padding: "0px",
                      width: "100%",
                    }}
                  >
                    <span
                      style={{
                        borderTop: "2px solid black",
                      }}
                    >
                      Sponsee's Signature & Date
                    </span>
                  </h4>
                </Col>
                <Col span={12} style={{ textAlign: "center" }}>
                  <h4
                    style={{
                      padding: "0px",

                      width: "100%",
                    }}
                  >
                    <span
                      style={{
                        borderTop: "2px solid black",
                      }}
                    >
                      {" "}
                      Md. Abirul Islam Chowdhury{" "}
                    </span>
                    <br></br> Managing Partner <br></br>
                    ANZARA FASHION
                  </h4>
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
            <Col span={17} style={{ paddingTop: "10px" }}>
              <div
                className="d-div"
                dangerouslySetInnerHTML={{
                  __html: branch.address,
                }}
              ></div>
            </Col>

            <Col span={7} style={{ textAlign: "right" }}>
              <img
                src={branch.logo}
                style={{
                  maxHeight: "60px",
                  right: "0",
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ textAlign: "left", paddingTop: "10px" }}>
              <h2 style={{ textAlign: "center" }}>Wardrobe Sponsorship Form</h2>
              <p>
                ANZARA FASHION involves in selling exclusive women wear in
                retail basis. We provided wardrobe sponsorship various events
                and photoshoots purpose with not monetary exchange. Fill up the
                following section:
              </p>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Row>
                <Col span={11}>
                  <Row>
                    <Col span={13}>Order No.</Col>
                    <Col span={11}>
                      <span className="sponsorship_order_span">
                        {details.wordrobe_number
                          ? details.wordrobe_number
                          : "-"}
                      </span>
                    </Col>
                  </Row>
                </Col>
                <Col span={5} offset={1}>
                  <Row>
                    <Col span={10}>Issue date:</Col>
                    <Col span={13}>
                      <span className="sponsorship_order_span">
                        {details.issue_date ? details.issue_date : "-"}
                      </span>
                    </Col>
                  </Row>
                </Col>
                <Col span={6} offset={1}>
                  <Row>
                    <Col span={11}>Delivery date:</Col>
                    <Col span={13}>
                      <span className="sponsorship_order_span">
                        {details.delivery_date ? details.delivery_date : "-"}
                      </span>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            {details.contact ? (
              <>
                <Col span={16} style={{ marginTop: "5px" }}>
                  <Row>
                    <Col span={9}>Company / Individual name:</Col>
                    <Col span={15}>
                      <span className="sponsorship_order_span">
                        {details.Contact[0].name
                          ? details.Contact[0].name
                          : "-"}
                      </span>
                    </Col>
                  </Row>
                </Col>
                <Col span={7} offset={1} style={{ marginTop: "5px" }}>
                  <Row>
                    <Col span={6}>Contact:</Col>
                    <Col span={18}>
                      <span className="sponsorship_order_span">
                        {details.Contact[0].phone
                          ? details.Contact[0].phone
                          : "-"}
                      </span>
                    </Col>
                  </Row>
                </Col>
                <Col span={24} style={{ marginTop: "5px" }}>
                  <Row>
                    <Col span={6}> Registered Address:</Col>
                    <Col span={18}>
                      <span className="sponsorship_order_span">
                        {details.Contact[0].address
                          ? details.Contact[0].address
                          : "-"}
                      </span>
                    </Col>
                  </Row>
                </Col>
              </>
            ) : (
              <></>
            )}
            <Col span={24} style={{ marginTop: "5px" }}>
              <Row>
                <Col span={6}> Facebook Link:</Col>
                <Col span={18}>
                  <span className="sponsorship_order_span">
                    {details.company_profile_link
                      ? details.company_profile_link
                      : "-"}
                  </span>
                </Col>
              </Row>
            </Col>
            <Col span={24} style={{ marginTop: "5px" }}>
              <Row>
                <Col span={6}> Photographer name / FB link:</Col>
                <Col span={18}>
                  <span className="sponsorship_order_span">
                    {details.photographer_name
                      ? details.photographer_name
                      : "-"}
                  </span>
                </Col>
              </Row>
            </Col>
            <Col span={24} style={{ marginTop: "5px" }}>
              <Row>
                <Col span={6}> Model name / FB link:</Col>
                <Col span={18}>
                  <span className="sponsorship_order_span">
                    {details.model_name ? details.model_name : "-"}
                  </span>
                </Col>
              </Row>
            </Col>
            <Col span={24} style={{ marginTop: "5px" }}>
              <Row>
                <Col span={6}>Makeup Artist name / FB link:</Col>
                <Col span={18}>
                  <span className="sponsorship_order_span">
                    {details.makeup_artist_name
                      ? details.makeup_artist_name
                      : "-"}
                  </span>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row>
            <Col span={24} style={{ textAlign: "left", paddingTop: "10px" }}>
              <h2 style={{ textAlign: "center" }}>Terms & Conditions</h2>
              <div
                className="d-div"
                dangerouslySetInnerHTML={{
                  __html: businessprofile.wordrobe_terms,
                }}
              ></div>
            </Col>
          </Row>

          <h2 style={{ textAlign: "center" }}>Wardrobe Details & Price</h2>
          <Row style={{ marginTop: 10 }}>
            <table className="product_table">
              <tbody>
                <tr style={{ fontWeight: "500" }}>
                  <td>NO</td>
                  <td>PRODUCT DETAILS</td>
                  <td>DESIGN CODE</td>
                  <td>RATE</td>
                  <td>QTY</td>
                  <td>AMOUNT</td>
                </tr>
                {renderitems()}
                {/* {renderservices()} */}
                {renderblanktables()}
                {rendertotalitems()}
              </tbody>
            </table>
          </Row>

          <Row style={{ minHeight: "80px" }}>
            <Col span={12} style={{ textAlign: "center" }}></Col>
            <Col span={12} style={{ textAlign: "center" }}>
              <img
                src={businessprofile.signature}
                style={{
                  maxHeight: "80px",
                  left: "0",
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col span={12} style={{ textAlign: "center" }}>
              <h4
                style={{
                  marginLeft: "40px",
                  marginBottom: "-10px",
                  padding: "0px",
                  borderTop: "2px solid black",
                  width: "70%",
                }}
              >
                Sponsee's Signature & Date
              </h4>
            </Col>
            <Col span={12} style={{ textAlign: "center" }}>
              <h4
                style={{
                  marginLeft: "80px",
                  borderTop: "2px solid black",
                  width: "70%",
                }}
              >
                Md. Abirul Islam Chowdhury<br></br> Managing Partner <br></br>
                ANZARA FASHION
              </h4>
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
  getSpecificLocation,
  getWordrobeItem,
  getBusinessProfile,
  getSpecificLocation,
})(Quickview);
