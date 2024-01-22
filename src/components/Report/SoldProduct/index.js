import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";

import { getSoldProducts } from "../../../actions/invoiceItem";
import { getAllLocation } from "../../../actions/warehouseAction";
import ReactToPrint from "react-to-print";
import dateFormat from "dateformat";
import Excelldownload from "./Excelldownload";

import {
  Divider,
  AutoComplete,
  Row,
  Col,
  Select,
  Skeleton,
  Button,
  Layout,
  Breadcrumb,
  DatePicker,
  Spin,
} from "antd";
const { RangePicker } = DatePicker;
const { Content } = Layout;
const { Option } = Select;

const SoldPorduct = ({
  getSoldProducts,
  getAllLocation,
  businessprofile,
  Auth,
}) => {
  var formatter = new Intl.NumberFormat("en-IN");
  const componentRef = useRef();
  const [data, setData] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setloading] = useState(false);
  const [initial, setinitial] = useState(false);
  const [reload, setreload] = useState(false);
  const location = useRef("");
  const start = useRef("");
  const end = useRef("");
  const keyward = useRef("");
  const total_quantity = useRef(0);

  const onChange = (event) => {
    if (event.keyCode == 13) {
      keyward.current = event.target.value;
      setreload(!reload);
    }
  };

  useEffect(() => {
    total_quantity.current = 0;
    if (start.current != "" && end.current != "") {
      setloading(true);
      getAllLocation().then((res) => {
        setLocations(res);
        getSoldProducts(
          keyward.current,
          start.current,
          end.current,
          location.current
        ).then((result) => {
          total_quantity.current = 0;
          setData(result);
          setloading(false);
        });
      });
    } else {
      setinitial(true);
      getAllLocation().then((res) => {
        setLocations(res);
        setinitial(false);
      });
    }
  }, [reload]);

  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Report</Breadcrumb.Item>
        <Breadcrumb.Item>Sold Products Report</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background main-frame">
        <Spin spinning={initial}>
          <Row wrap={false}>
            <Col flex="auto">
              <h3>Search by</h3>
              <AutoComplete
                placeholder="product name, barcode, invoice number, order
                    number, contact name, contact no."
                onKeyUp={onChange}
                style={{ width: "100%" }}
              />
            </Col>
            <Col flex="auto">
              <h3>Issue date :</h3>

              <RangePicker
                style={{ width: "100%" }}
                picker="date"
                onChange={(value) => {
                  if (value) {
                    start.current = value[0].format("YYYY-MM-DD") + "T00:00:00";
                    end.current = value[1].format("YYYY-MM-DD") + "T23:59:59";
                    setreload(!reload);
                  }
                }}
              />
            </Col>
            <Col flex="auto">
              <h3>Choose warehouse / outlet</h3>
              <Select
                placeholder="Please select a outlet / warehouse"
                style={{ width: "100%" }}
                // defaultValue={Auth.profile.branch.id}
                disabled={
                  Auth.superuser ||
                  Auth.profile.user_role.id == 10 ||
                  Auth.profile.user_role.id == 36 ||
                  Auth.profile.user_role.id == 38
                    ? false
                    : true
                }
                onChange={(e) => {
                  location.current = e;
                  setloading(true);
                  setreload(!reload);
                }}
              >
                <Option value="">All</Option>
                {locations.map((outlet) => {
                  return <Option value={outlet.id}>{outlet.name}</Option>;
                })}
              </Select>
            </Col>
            <Col flex="auto">
              <h3>.</h3>
              <Excelldownload data={data} />
            </Col>
            <Col flex="auto">
              <h3>.</h3>
              <ReactToPrint
                trigger={() => (
                  <Button style={{ width: "100%" }} type="primary">
                    Print
                  </Button>
                )}
                content={() => componentRef.current}
              />
            </Col>
          </Row>
        </Spin>
        <Divider />
        <Spin spinning={loading}>
          <div
            // className="invoice_print_fontSize"
            ref={componentRef}
            style={{ padding: "10px" }}
          >
            <h2 style={{ textAlign: "center" }}>Sold Porducts Report</h2>

            <Row>
              <Col span={12} style={{ textAlign: "left" }}>
                {start.current != "" ? (
                  <>
                    From : {dateFormat(start.current, "mmmm dS, yyyy")}
                    <br></br>
                  </>
                ) : (
                  ""
                )}

                {end.current != "" ? (
                  <>
                    To : {dateFormat(end.current, "mmmm dS, yyyy")}
                    <br></br>
                  </>
                ) : (
                  ""
                )}
              </Col>
              <Col span={12} style={{ textAlign: "right" }}>
                {locations.map((outlet) => {
                  if (outlet.id == location.current)
                    return <>Outlet : {outlet.name}</>;
                })}
              </Col>
            </Row>
            <br></br>

            <table className="attendacne_table">
              <tr style={{ background: "#FAFAFA" }}>
                <th>SL.</th>
                <th>Date</th>
                <th>Invoice</th>
                <th>Customer</th>
                <th>Contact</th>
                <th>Product</th>
                <th>Category</th>
                <th>Sub category</th>

                <th>Color</th>
                <th>Size</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Amount</th>
              </tr>

              {data.map((item, index) => {
                let product = item.Details.split("--");
                total_quantity.current += parseInt(item.quantity);
                let product_details = "";
                let color = "";
                let size = "";
                if (product.length > 1) {
                  product_details = product[1].split("/");
                  color = product_details[0];
                  size = product_details.length > 1 ? product_details[1] : "";
                }
                return (
                  <>
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item.issue_date}</td>

                      <td>{item.Invoice_no}</td>
                      <td>{item.Customer}</td>
                      <td>{item.Contact}</td>
                      {/* <td>{item.Details}</td> */}
                      <td>{product[0]}</td>

                      <td>
                        {/* {item.hasOwnProperty("Product")
                                ? item?.Product[0]?.ProductDetails
                                    ?.parent_category
                                : ""} */}
                        {item.parent_category}
                      </td>
                      <td>
                        {/* {item.hasOwnProperty("Product")
                                ? item?.Product[0]?.ProductDetails
                                    ?.main_category
                                : ""} */}
                        {item.main_category}
                      </td>
                      <td>{color}</td>
                      <td>{size}</td>
                      <td>{item.quantity}</td>
                      <td>{item.price}</td>
                      <td>{item.quantity * item.price}</td>
                    </tr>
                  </>
                );
              })}
              <tr>
                <td colSpan={10}>Total</td>
                <td>{total_quantity.current / 2}</td>
                <td colSpan={2}></td>
              </tr>
            </table>
          </div>
        </Spin>
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    // List: state.ProductDetails.productdetails,
    businessprofile: state.settings.businessprofile,
    Auth: state.auth,
  };
};

export default connect(mapStateToProps, {
  getSoldProducts,
  getAllLocation,
})(SoldPorduct);
