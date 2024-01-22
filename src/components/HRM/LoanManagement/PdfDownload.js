import React, { useEffect, useState, useRef } from "react";
import moment from "moment";
import { Row, Col } from "antd";
import { connect } from "react-redux";
import dateFormat from "dateformat";

const pdfdownload = ({ data, data1, date, componentRef, businessprofile }) => {
  return (
    <>
      <div style={{ display: "none" }}>
        <div
          className="loan_report_print_fontSize"
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
                  right: "15",
                }}
              />
            </Col>
          </Row>

          <h3 style={{ textAlign: "center" }}>Loan report</h3>
          <Row>
            <Col span={12} style={{ textAlign: "left" }}>
              {date != "" ? (
                <>
                  Date : {dateFormat(date, "mmmm dS, yyyy")}
                  <br></br>
                </>
              ) : (
                ""
              )}
            </Col>
          </Row>
          <br></br>
          <table className="loan_table">
            <tr>
              <td>SL.</td>
              <td>Name</td>
              <td>Loan Amount</td>
              <td>Loan Type</td>
              <td>Payable Months</td>
              <td>Paid Months</td>
              <td>Payable Per Month</td>
              <td>Note</td>
              <td>Status</td>
              <td>Paid</td>
              <td>Due</td>
              <td>Payment Status</td>
            </tr>

            {data.map((item, index) => {
              return (
                <>
                  <tr>
                    <td>{item.employeeId}</td>
                    <td>{item.employeeName}</td>
                    <td>{item.loanAmount}</td>
                    <td>{item.loanType}</td>
                    <td>{item.loanPayableMonths}</td>
                    <td>{item.total_payment_count}</td>
                    <td>{item.loanPayableAmount}</td>
                    <td>{item.note}</td>
                    <td>{item.loanStatus}</td>
                    <td>{item.total_paid}</td>
                    <td>{item.total_due_payment}</td>
                    <td>{item.loanPaymentStatus}</td>
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
