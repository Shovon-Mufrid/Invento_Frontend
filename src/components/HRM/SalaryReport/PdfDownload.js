import React, { useEffect, useState, useRef } from "react";
import moment from "moment";
import { Row, Col } from "antd";
import { connect } from "react-redux";
import dateFormat from "dateformat";

const pdfdownload = ({
  data,
  data1,
  from,
  to,
  componentRef,
  businessprofile,
}) => {
  // console.log(data);
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

          <h3 style={{ textAlign: "center" }}>Salary report</h3>
          <Row>
            <Col span={12} style={{ textAlign: "left" }}>
              {from != "" ? (
                <>
                  From : {dateFormat(from, "mmmm, yyyy")}
                  <br></br>
                </>
              ) : (
                ""
              )}
            </Col>
            <Col span={12} style={{ textAlign: "left" }}>
              {to != "" ? (
                <>
                  To : {dateFormat(to, "mmmm, yyyy")}
                  <br></br>
                </>
              ) : (
                ""
              )}
            </Col>
          </Row>
          <br></br>
          <table className="salary_table">
            <tr>
              <td>SL.</td>
              <td>Name</td>
              <td>Department</td>
              <td>Present</td>
              <td>Absent</td>
              <td>Late</td>
              <td>Leave</td>
              <td>Fine</td>
              <td>Loan Adjustment</td>
              <td>Advance Adjustment</td>
              <td>Allowance</td>
              <td>Overtime</td>
              <td>Incentive</td>
              <td>Paid Salary</td>
              <td>Payment Date</td>
            </tr>

            {data.map((item, index) => {
              return (
                <>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{item.employeeName}</td>
                    <td>{item.employeeDepartment}</td>
                    <td>{item.present}</td>
                    <td>{item.absent}</td>
                    <td>{item.late}</td>
                    <td>{item.leave}</td>
                    <td>{item.fine}</td>
                    <td>{item.loan_adjustment}</td>
                    <td>{item.advance_adjustment}</td>
                    <td>{item.dailyAllowanceTotal}</td>
                    <td>{item.overtimeTotal}</td>
                    <td>{item.incentiveTotal}</td>
                    <td>{item.net_salary}</td>
                    <td>{moment(item.paymentDate).format("DD-MM-YYYY")}</td>
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
