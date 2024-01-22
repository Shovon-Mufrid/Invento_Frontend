import React, { useEffect, useState, useRef } from "react";
import moment from "moment";
import { Row, Col } from "antd";
import { connect } from "react-redux";
import dateFormat from "dateformat";

const pdfdownload = ({ data, data1, componentRef, businessprofile }) => {
  const { REACT_APP_API_URL } = process.env;
  return (
    <>
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
            <Col span={8} style={{ paddingTop: "10px" }}>
              <small>
                <div
                  style={{ lineHeight: "2.5px" }}
                  dangerouslySetInnerHTML={{
                    __html: businessprofile.address,
                  }}
                ></div>
              </small>
            </Col>

            <Col span={16} style={{ textAlign: "right" }}>
              <img
                src={businessprofile.logo}
                style={{
                  maxHeight: "60px",
                  // right: "0",
                }}
              />
            </Col>
          </Row>

          <h3 style={{ textAlign: "center" }}>Stock Alert report</h3>
          <br></br>
          <table className="product_table invoice_print_fontSize">
            <tr>
              <td>SL.</td>
              <td>Image</td>
              <td>Barcode</td>
              <td>Product</td>
              <td>Category</td>
              <td>Color</td>
              <td>Size</td>
              <td>Quantity</td>
              <td>Price</td>
              <td>Warehouse</td>
            </tr>
            {data.map((item, index) => {
              return (
                <>
                  <tr>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        style={{ height: "30px", width: "30px", margin: "5px" }}
                        src={
                          item.image != ""
                            ? `${REACT_APP_API_URL}${item.image[0].photo}`
                            : ""
                        }
                      />
                    </td>
                    <td>{item.barcode}</td>
                    <td>{item.title}</td>
                    <td>{item.category}</td>
                    <td>{item.color}</td>
                    <td>{item.size}</td>
                    <td>{item.quantity}</td>
                    <td>{item.selling_price}</td>
                    <td>{item.Warehouse_name}</td>
                  </tr>
                </>
              );
            })}
          </table>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    businessprofile: state.settings.businessprofile,
  };
};

export default connect(mapStateToProps, {})(pdfdownload);
