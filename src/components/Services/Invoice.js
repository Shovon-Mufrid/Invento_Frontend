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
  id,
  getInvoiceItem,
  getServices,
  getBusinessProfile,
  businessprofile,
  getInvoiceMeasurement,
  getSpecificLocation,
  getSpecificInvoice,
}) => {
  var formatter = new Intl.NumberFormat("en-IN", {
    maximumSignificantDigits: 3,
  });
  const componentRef = useRef();
  const [visible, setVisible] = useState(false);
  const [loading, setloading] = useState(true);
  const [data, setdata] = useState([]);
  const [measurements, setmeasurements] = useState([]);
  const [details, setdetails] = useState([]);
  const [branch, setbranch] = useState([]);
  const [services, setservices] = useState([]);
  const count = useRef(0);
  const serialcount = useRef(0);

  const showDrawer = () => {
    getSpecificInvoice(id).then((r) => {
      setdetails(r);
      getSpecificLocation(r.location).then((result) => {
        setbranch(result);
      });
    });

    getInvoiceItem(id).then((e) => {
      getBusinessProfile();
      getServices(id).then((service) => {
        getInvoiceMeasurement(id).then((result) => {
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
                <td>
                  {" "}
                  {item.Details}
                  <small>
                    {"  ("}
                    {item.Product[0].color ? item.Product[0].color + " / " : ""}
                    {item.Product[0].size ? +item.Product[0].size : ""}
                    {")"}
                  </small>
                </td>
              )}
              {item.details ? (
                <td></td>
              ) : (
                <td> {item.Product[0].Deatils[0].product_code}</td>
              )}

              <td style={{ textAlign: "center", margin: "auto" }}>
                {item.quantity}
              </td>
            </tr>
          </>
        );
      });
    }
  };

  const renderData = () => {
    if (loading) {
      return <Skeleton active />;
    } else {
      return (
        <>
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
                {/* <Col
                  span={8}
                  style={{ textAlign: "right", paddingTop: "105px" }}
                >
                  ORDER NO.{" "}
                  {details.order_number ? <b>{details.order_number}</b> : ""}
                </Col> */}
              </Row>
              <br></br>
              <Row>
                <Col span={18}>
                  <table className="product_table invoice_print_fontSize">
                    <tbody>
                      <tr style={{ fontWeight: "500" }}>
                        <td>NO</td>
                        <td>PRODUCT DETAILS</td>
                        <td>DESIGN CODE</td>

                        <td>QTY</td>
                      </tr>
                      {renderitems()}
                    </tbody>
                  </table>
                </Col>
                <Col span={6}>
                  <Row style={{ textAlign: "center" }}>
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
                </Col>
                <Col span={15} offset={1}>
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
            <Col span={8} style={{ textAlign: "right", paddingTop: "35px" }}>
              ORDER NO.{" "}
              {details.order_number ? <b>{details.order_number}</b> : ""}
            </Col>
          </Row>
          <br></br>
          <Row>
            <Col span={18}>
              <table className="product_table">
                <tbody>
                  <tr style={{ fontWeight: "500" }}>
                    <td>NO</td>
                    <td>PRODUCT DETAILS</td>
                    <td>DESIGN CODE</td>

                    <td>QTY</td>
                  </tr>
                  {renderitems()}
                </tbody>
              </table>
            </Col>
            <Col span={6}>
              <Row style={{ textAlign: "center" }}>
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
            <Col span={8}>
              <Row>
                <Col span={24}>
                  <h3>EXTRA ADDITIONS</h3>
                  <div
                    style={{
                      minHeight: "40vh",
                      border: "2px solid black",
                      padding: "10px",
                    }}
                    dangerouslySetInnerHTML={{ __html: measurements.Note }}
                  ></div>
                </Col>
              </Row>
            </Col>
            <Col span={16} style={{ paddingLeft: "10px" }}>
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
                  <h5>Bottom</h5>
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
            </Col>
          </Row>
        </>
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
          width="850"
          onClose={onClose}
          visible={visible}
          placement="right"
          // bodyStyle={{ paddingBottom: 80 }}
        >
          {renderData()}
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
