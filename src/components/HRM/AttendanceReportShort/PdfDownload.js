import React, { useEffect, useState, useRef } from "react";
import moment from "moment";
import { Row, Col } from "antd";
import { connect } from "react-redux";
import dateFormat from "dateformat";

const pdfdownload = ({
  data,
  data1,
  startDate,
  endDate,
  componentRef,
  businessprofile,
}) => {
  // console.log(data);
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
                  right: "5",
                }}
              />
            </Col>
          </Row>

          <h3 style={{ textAlign: "center" }}>Attendance report</h3>
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
          <br></br>
          <table className="attendance_table">
            <tr>
              <td>SL.</td>
              <td>Photo</td>
              <td>Name</td>
              <td>Department</td>
              <td>Present</td>
              <td>Absent</td>
              <td>Late</td>
              <td>Leave</td>
              <td>Over Time</td>
            </tr>

            {data.map((item, index) => {
              return (
                <>
                  <tr>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        style={{ height: "30px", width: "30px", margin: "5px" }}
                        alt={item.photo}
                        src={item.photo}
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.employeeDepartment}</td>
                    <td>{item.present}</td>
                    <td>{item.absent}</td>
                    <td>{item.late}</td>
                    <td>{item.leave}</td>
                    <td>{item.overTime}</td>
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
