import React, { useEffect, useState, useRef } from "react";
import moment from "moment";
import { Row, Col } from "antd";
import { connect } from "react-redux";
import dateFormat from "dateformat";

const pdfdownload = ({
  data,
  data1,
  totalQuantity,
  totalPrice,
  categoryName,
  startDate,
  endDate,
  componentRef,
  businessprofile,
}) => {
  var formatter = new Intl.NumberFormat("en-IN");

  const rendertotalamount = (product) => {
    console.log(product);
    let total = 0;
    for (let i = 0; i < product.variations.length; i++) {
      total +=
        product.variations[i].selling_price * product.variations[i].quantity;
    }
    if (total > 0) {
      return (
        <tr>
          {/* <td>{index + 1}</td> */}
          <td>{product.variations[0].ProductDetails.parent_category}</td>
          <td>{product.variations[0].ProductDetails.main_category}</td>
          <td>{product.variations[0].ProductDetails.category_name}</td>
          <td>{product.title}</td>

          <td style={{ textAlign: "right" }}>{product.quantity}</td>
          <td style={{ textAlign: "right" }}>
            {formatter.format(parseFloat(total).toFixed(2))}
          </td>
        </tr>
      );
    }
  };

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

          <h3 style={{ textAlign: "center" }}>Stock Valuation report</h3>
          <Row>
            <Col span={12} style={{ textAlign: "left" }}>
              {startDate != "" ? (
                <>
                  From : {dateFormat(startDate, "mmmm dS, yyyy")}
                  <br></br>
                </>
              ) : (
                ""
              )}

              {endDate != "" ? (
                <>
                  To : {dateFormat(endDate, "mmmm dS, yyyy")}
                  <br></br>
                </>
              ) : (
                ""
              )}
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ textAlign: "center" }}>
              {categoryName.current != "" ? (
                <>
                  Category: {categoryName.current}
                  <br></br>
                </>
              ) : (
                ""
              )}
            </Col>
          </Row>
          <br></br>
          <table className="product_table invoice_print_fontSize">
            <tr>
              <td>Type</td>
              <td>Category</td>
              <td>Sub Category</td>
              <td>Product Name</td>
              <td style={{ textAlign: "right" }}>Total Quantity</td>
              <td style={{ textAlign: "right" }}>Total Amount</td>
            </tr>

            {data.map((item, index) => {
              return <>{rendertotalamount(item)}</>;
            })}
            <tr>
              <td colSpan={4}>Total</td>
              <td style={{ textAlign: "right" }}>{totalQuantity.current}</td>
              <td style={{ textAlign: "right" }}>
                {formatter.format(parseFloat(totalPrice.current).toFixed(2))}
              </td>
            </tr>
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
