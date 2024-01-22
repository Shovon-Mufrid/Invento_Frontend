import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";

import Rendertable from "./Rendertable";
import {
  getWordrobeItem_not_returned,
  getWordrobeItemP_not_returned,
} from "../../../actions/wordrobe";

import { Divider, AutoComplete, Skeleton, Row, Col, Button } from "antd";
import ReactToPrint from "react-to-print";

const SearchStock = ({
  getWordrobeItem_not_returned,
  getWordrobeItemP_not_returned,
  businessprofile,
}) => {
  const componentRef = useRef();
  const [List, setList] = useState();
  const [data, setData] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [reload, setreload] = useState(false);
  const keyward = useRef("");
  const pageno = useRef(1);
  const page_size = useRef(10);
  let total_data = useRef({});
  var formatter = new Intl.NumberFormat("en-IN");

  const onChange = (event) => {
    if (event.keyCode == 13) {
      keyward.current = event.target.value;
      setreload(!reload);
    }
  };
  useEffect(() => {
    getWordrobeItemP_not_returned(
      keyward.current,
      pageno.current,
      page_size.current
    ).then((result) => {
      total_data.current = {
        total_quantity: result.total_quantity,
        total_price: result.total_price,
        current_page_quantity: result.current_page_quantity,
        current_page_price: result.current_page_price,
      };
      setList(result);
      setData(result.results);
      setLoading(false);
    });
  }, [reload]);

  if (Loading) {
    return <Skeleton />;
  } else {
    return (
      <>
        <Row>
          <Col span={21}>
            <h3>Enter barcode or product name for instant Search</h3>
            <AutoComplete
              placeholder="input search text"
              onKeyUp={onChange}
              style={{ width: "100%" }}
            />
          </Col>
          <Col span={2} offset={1}>
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

                <h3 style={{ textAlign: "center" }}>Wordrobe Stock</h3>

                <table className="product_table">
                  <tr>
                    <td>SL.</td>
                    <td>Product</td>
                    <td>Category</td>
                    <td>Color</td>
                    <td>Size</td>
                    <td>Warehouse</td>
                    <td>Quantity</td>
                    <td>Barcode</td>
                  </tr>

                  {data.map((item, index) => {
                    return (
                      <>
                        <tr>
                          <td>{index + 1}</td>
                          <td>{item.title}</td>
                          <td>{item.category ? item.category : ""}</td>
                          <td>{item.Product ? item.Product[0].color : ""}</td>
                          <td>{item.Product ? item.Product[0].size : ""}</td>
                          <td>
                            {item.Warehouse_name ? item.Warehouse_name : ""}
                          </td>
                          <td>{item.quantity}</td>
                          <td>{item.barcode}</td>
                        </tr>
                      </>
                    );
                  })}
                  <tr>
                    <td colSpan={6}>Total: </td>
                    <td>
                      {formatter.format(total_data.current["total_quantity"])}
                    </td>
                    <td colSpan={1}></td>
                  </tr>
                </table>
              </div>
            </div>
          </Col>
        </Row>
        <Divider />
        {console.log(List)}
        <Col span={20}>
          <table style={{ width: "20%" }}>
            <tr>
              <td>
                <b>Quantity :</b>{" "}
              </td>
              <td style={{ textAlign: "right" }}>
                {" "}
                {formatter.format(total_data.current["total_quantity"])}
              </td>
            </tr>
            <tr>
              <td colSpan={7}></td>
            </tr>
          </table>
        </Col>
        <Divider />
        <Rendertable
          List={List}
          pageno={pageno}
          page_size={page_size}
          setreload={setreload}
          reload={reload}
          setloading={setLoading}
          total_data={total_data}
        />
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
  getWordrobeItem_not_returned,
  getWordrobeItemP_not_returned,
})(SearchStock);
