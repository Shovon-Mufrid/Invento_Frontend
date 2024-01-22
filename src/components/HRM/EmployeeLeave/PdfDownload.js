import React, { useEffect, useState, useRef } from "react";
import moment from 'moment';
import {
    Row,
    Col,
} from "antd";
import { connect } from "react-redux";
import dateFormat from "dateformat";

const pdfdownload = ({ data, data1, date, componentRef, businessprofile }) => {
  // console.log(data);
  return (
    <>
    <div style={{ display: "none" }}>
            <div
              className="loan_report_print_fontSize"
              ref={componentRef}
              style={{ padding: "40px" }}
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
                      maxHeight: "120px",
                      right: "0",
                    }}
                  />
                </Col>
              </Row>

              <h3 style={{ textAlign: "center" }}>Leave report</h3>
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
              <table className="leave_table">
                <tr>
                  <td>SL.</td>
                  <td>ID.</td>
                  <td>Name</td>
                  <td>Leave Type</td>
                  <td>Leave Start</td>
                  <td>Leave End</td>
                  <td>Total Days</td>
                  <td>Status</td>
                </tr>

                {data.map((item, index) => {
                  return (
                    <>
                      <tr>
                      <td>{index+1}</td>
                        <td>{item.employeeId}</td>
                        <td>{item.employeeName}</td>
                        <td>{item.leaveTypeName}</td>
                        <td>{item.leaveStart}</td>
                        <td>{item.leaveEnd}</td>
                        <td>{item.leaveDays}</td>
                        <td>{item.leaveStatus}</td>
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
  
  export default connect(mapStateToProps, {
  })(pdfdownload);
  
