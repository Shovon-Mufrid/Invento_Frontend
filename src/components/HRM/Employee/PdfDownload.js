import React, { useEffect, useState, useRef } from "react";
import moment from "moment";
import { Row, Col } from "antd";
import { connect } from "react-redux";
import dateFormat from "dateformat";

const pdfdownload = ({ data, details, componentRef, businessprofile }) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <>
      <div style={{ display: "none" }}>
        <div
          className="salary_report_print_fontSize"
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
                }}
              />
            </Col>
          </Row>

          <h3 style={{ textAlign: "center" }}>Employee History</h3>
          <Row>
            <Col span={12} style={{ textAlign: "left" }}>
              Name: {details.name}
            </Col>
            <Col span={12} style={{ textAlign: "left" }}>
              Phone: {details.phone}
            </Col>
          </Row>
          <Row>
            <Col span={12} style={{ textAlign: "left" }}>
              Email: {details.email}
            </Col>
            <Col span={12} style={{ textAlign: "left" }}>
              Type: {details.user_roleName}
            </Col>
          </Row>
          <Row>
            <Col span={12} style={{ textAlign: "left" }}>
              Address: {details.address}
            </Col>
            <Col span={12} style={{ textAlign: "left" }}>
              Branch: {details.branchName}
            </Col>
          </Row>
          <br></br>
          <table className="salary_table">
            <tr>
              <td>SL.</td>
              <td>Date</td>
              <td>Payment Month</td>
              <td>Leave</td>
              <td>Present</td>
              <td>Absent</td>
              <td>Late</td>
              <td>Total Overtime</td>
              <td>Total Incentive</td>
              <td>Total Allowance</td>
              <td>Fine</td>
              <td>Loan Adjustment</td>
              <td>Advance Adjustment</td>
              <td>Total Paid</td>
            </tr>
            {data.map((item, index) => {
              return (
                <>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{moment(item.paymentDate).format("DD-MM-YYYY")}</td>
                    <td>
                      {monthNames[item.salaryMonth - 1]}, {item.salaryYear}
                    </td>
                    <td>{item.leave}</td>
                    <td>{item.present}</td>
                    <td>{item.absent}</td>
                    <td>{item.late}</td>
                    <td>{item.overtimeTotal}</td>
                    <td>{item.incentiveTotal}</td>
                    <td>{item.dailyAllowanceTotal}</td>
                    <td>{item.fine}</td>
                    <td>{item.loan_adjustment}</td>
                    <td>{item.advance_adjustment}</td>
                    <td>{item.net_salary}</td>
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
