import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";

import Rendertable from "./Rendertable";
import { getProductSearchResultforsales } from "../../../actions/productDetails";
import { getAllLocation } from "../../../actions/warehouseAction";
import Excelldownload from "./Excelldownload";
import ReactToPrint from "react-to-print";

import {
  Divider,
  AutoComplete,
  Row,
  Col,
  Select,
  Skeleton,
  Button,
} from "antd";
const { Option } = Select;

const SearchStock = ({
  getProductSearchResultforsales,
  getAllLocation,
  businessprofile,
}) => {
  var formatter = new Intl.NumberFormat("en-IN");
  const componentRef = useRef();
  const [List, setList] = useState([]);
  const [data, setData] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setloading] = useState(true);
  const [reload, setreload] = useState(false);
  const location = useRef("");
  const keyward = useRef("");
  const pageno = useRef(1);
  const page_size = useRef(10);
  let total_data = useRef({});

  const onChange = (event) => {
    if (event.keyCode == 13) {
      keyward.current = event.target.value;
      setreload(!reload);
    }
  };

  useEffect(() => {
    getAllLocation().then((result) => {
      setLocations(result);
    });
    getProductSearchResultforsales(
      keyward.current,
      location.current,
      pageno.current,
      page_size.current
    ).then((result) => {
      total_data.current = {
        total_purchase_price: result.total_purchase_price,
        total_selling_price: result.total_selling_price,
        total_quantity: result.total_quantity,
        current_purchase_price: result.current_purchase_price,
        current_selling_price: result.current_selling_price,
        current_quantity: result.current_quantity,
      };
      setList(result);
      setData(result.results);
      setloading(false);
    });
  }, [reload]);

  const renderdata = () => {
    if (loading) {
      return <Skeleton active />;
    } else {
      return (
        <Rendertable
          List={List}
          pageno={pageno}
          page_size={page_size}
          setreload={setreload}
          reload={reload}
          setloading={setloading}
          total_data={total_data}
        />
      );
    }
  };

  return (
    <>
      <Row>
        <Col span={10}>
          <h3>Enter barcode or product code for instant Search</h3>
          <AutoComplete
            placeholder="input search text"
            onKeyUp={onChange}
            style={{ width: "100%" }}
          />
        </Col>
        <Col span={6} offset={1}>
          <h3>Choose warehouse / outlet</h3>
          <Select
            placeholder="Please select a outlet / warehouse"
            style={{ width: "100%" }}
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
        <Col span={4} offset={1}>
          <h3>Export</h3>
          <Excelldownload data={data} />
        </Col>
        <Col span={2}>
          <h3>.</h3>
          <ReactToPrint
            trigger={() => <Button type="primary">Print</Button>}
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
                      // right: "0",
                    }}
                  />
                </Col>
              </Row>

              <h3 style={{ textAlign: "center" }}>Stock report</h3>
              <Row>
                <Col span={12} style={{ textAlign: "left" }}></Col>
                <Col span={12} style={{ textAlign: "right" }}>
                  {locations.map((outlet) => {
                    if (outlet.id == location.current)
                      return <>Outlet : {outlet.name}</>;
                  })}
                </Col>
              </Row>
              <table className="product_table invoice_print_fontSize">
                <tr>
                  <td>SL.</td>
                  <td>Barcode</td>
                  <td>Product</td>
                  <td>Category</td>
                  <td>Color</td>
                  <td>Size</td>
                  <td>Warehouse</td>
                  <td>Quantity</td>
                  <td>Purchase Price</td>
                  <td>Selling Price</td>
                </tr>

                {data.map((item, index) => {
                  return (
                    <>
                      <tr>
                        <td>{index + 1}</td>
                        <td>{item.barcode}</td>
                        <td>{item.title}</td>
                        <td>{item.category}</td>
                        <td>{item.color}</td>
                        <td>{item.size}</td>
                        <td>{item.Warehouse_name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.purchase_price}</td>
                        <td>{item.selling_price}</td>
                      </tr>
                    </>
                  );
                })}
                {/* <tr>
                  <td colSpan={7}>Total For Page: </td>
                  <td>{total_data.current['current_quantity']}</td>
                  <td>{total_data.current['current_purchase_price']}</td>
                  <td>{total_data.current['current_selling_price']}</td>
                </tr> */}
                <tr>
                  <td colSpan={7}>Total: </td>
                  <td>{total_data.current["total_quantity"]}</td>
                  <td>{total_data.current["total_purchase_price"]}</td>
                  <td>{total_data.current["total_selling_price"]}</td>
                </tr>
              </table>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Divider />
        <Col span={20}>
          <table style={{ width: "20%" }}>
            <tr>
              <td>
                <b>Total Quantity :</b>{" "}
              </td>
              <td style={{ textAlign: "right" }}>
                {" "}
                {formatter.format(total_data.current["total_quantity"])}
              </td>
            </tr>
          </table>
        </Col>
      </Row>

      <Divider />
      {renderdata()}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    // List: state.ProductDetails.productdetails,
    businessprofile: state.settings.businessprofile,
  };
};

export default connect(mapStateToProps, {
  getProductSearchResultforsales,
  getAllLocation,
})(SearchStock);
