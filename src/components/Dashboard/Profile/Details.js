import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import {
  Drawer,
  Divider,
  Col,
  Row,
  Button,
  message,
  Popconfirm,
  Descriptions,
} from "antd";
import { Link } from "react-router-dom";
import { Responsive, WidthProvider } from "react-grid-layout";
import GridLayout from "react-grid-layout";
import { deleteDepartment } from "../../../actions/departmentActions";
import { getAllEmployeeAttendenceOfDateRange } from "../../../actions/AttendenceAction";
import { getSpecificUserEmployeeLeave } from "../../../actions/employeeLeaveActions";
import { getAllLeaveType } from "../../../actions/leaveTypeActions";
import Calendarlist from "./Calenderlist";
import Present from "./Present";

const Details = ({
  employee,
  location,
  startDateByYear,
  startDate,
  endDate,
  getAllEmployeeAttendenceOfDateRange,
  getSpecificUserEmployeeLeave,
  getAllLeaveType,
}) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [attendance, setAttendance] = useState([]);
  const [leave, setLeave] = useState([]);
  const [leaveType, setleaveType] = useState([]);
  const present = useRef(0);
  const absent = useRef(0);
  const late = useRef(0);

  const Officelat = 23.7525278;
  const Officelong = 90.3629291;

  const userlet = useRef(0);
  const userlong = useRef(0);
  const distance = useRef(0);

  function calcCrow(lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = toRad(lat2 - lat1);
    var dLon = toRad(lon2 - lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);

    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
  }

  // Converts numeric degrees to radians
  function toRad(Value) {
    return (Value * Math.PI) / 180;
  }

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  function showPosition(position) {
    userlet.current = position.coords.latitude;
    userlong.current = position.coords.longitude;
    distance.current = calcCrow(
      Officelat,
      Officelong,
      userlet.current,
      userlong.current
    );
  }

  useEffect(() => {
    // getLocation();
    getAllEmployeeAttendenceOfDateRange(startDate, endDate, "", employee).then(
      (response) => {
        getSpecificUserEmployeeLeave(
          employee,
          "",
          "",
          "",
          startDateByYear,
          endDate
        ).then((EmployeeLeave) => {
          setAttendance(response);
          setLeave(EmployeeLeave);
          const mergeddata = [...response, ...EmployeeLeave];
          setData(mergeddata);
          present.current = 0;
          absent.current = 0;
          late.current = 0;
          response.map((atd) => {
            if (atd.isAttended) {
              present.current = present.current + 1;
            } else {
              absent.current = absent.current + 1;
            }
            if (atd.isLate) {
              late.current = late.current + 1;
            }
          });
          getAllLeaveType().then((leaveResponse) => {
            setleaveType(leaveResponse);
            setVisible(true);
          });
        });
      }
    );
  }, [loading]);

  const onClose = () => {
    setVisible(false);
  };

  const layout = [
    { i: "calender", x: 0, y: 0, w: 6, h: 6, static: true },
    { i: "attendance", x: 7, y: 0, w: 2, h: 2, static: true },
    { i: "leave", x: 10, y: 0, w: 3, h: 2, static: true },
  ];

  if (!visible) {
    return <h1>Loading.......</h1>;
  } else {
    return (
      <>
        {/* <GridLayout
          className="layout"
          layout={layout}
          cols={12}
          rowHeight={30}
          width={1200}
          autoSize={true}
          compactType="vertical"
          allowOverlap={false}
        >
          <div key="calender">
            <Calendarlist data={data} />
          </div>
          <div key="attendance">
            <Row>
              <Col span={12}>
                <h3>Present :</h3>
              </Col>
              <Col span={12}>{present.current}</Col>
            </Row>
            <Row>
              <Col span={12}>
                <h3>Absent :</h3>
              </Col>
              <Col span={12}>{absent.current}</Col>
            </Row>
            <Row>
              <Col span={12}>
                <h3>Late :</h3>
              </Col>
              <Col span={12}>{late.current}</Col>
            </Row>
          </div>
          <div key="leave">
            {leaveType.map((types) => {
              console.log(types);
              let approved_leave = 0;
              let rejected_leave = 0;
              return (
                <Row>
                  <Col span={12}>
                    <h3>{types.Typename}</h3>
                  </Col>
                  <Col span={6}>{types.initialDays}</Col>
                  <Col span={6}>
                    {leave.map((le) => {
                      console.log(le);
                      if (types.id == le.leaveType.id) {
                        if (le.leaveStatus == "approved") {
                          approved_leave += le.leaveDays;
                        }
                      }
                    })}
                    {approved_leave}
                  </Col>
                </Row>
              );
            })}
          </div>
        </GridLayout> */}
        <Row>
          <Col span={12} md={12} sm={24} xs={24}>
            <Calendarlist data={data} />
          </Col>
          <Col
            span={11}
            offset={1}
            md={11}
            sm={24}
            xs={24}
            style={{
              background: "#f0f2f5",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            <Divider orientation="left" orientationMargin="0">
              Today's report
            </Divider>
            <Row>
              <Col span={24}>
                <Present
                  loading={loading}
                  setLoading={setLoading}
                  distance={distance.current}
                />
              </Col>
            </Row>
            <Divider orientation="left" orientationMargin="0">
              Monthly report
            </Divider>
            <Row
              style={{
                padding: "15px",
              }}
            >
              <Col span={24}>
                <Row>
                  <Col span={12}>
                    <h3>Present :</h3>
                  </Col>
                  <Col span={12}>{present.current}</Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <h3>Absent :</h3>
                  </Col>
                  <Col span={12}>{absent.current}</Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <h3>Late :</h3>
                  </Col>
                  <Col span={12}>{late.current}</Col>
                </Row>
              </Col>
            </Row>
            <Divider orientation="left" orientationMargin="0">
              Yearly report
            </Divider>
            <Row
              style={{
                padding: "15px",
              }}
            >
              <Col span={24}>
                {leaveType.map((types) => {
                  console.log(types);
                  let approved_leave = 0;
                  let rejected_leave = 0;
                  return (
                    <Row>
                      <Col span={12}>
                        <h3>{types.Typename}</h3>
                      </Col>
                      <Col span={6}>{types.initialDays}</Col>
                      <Col span={6}>
                        {leave.map((le) => {
                          console.log(le);
                          if (types.id == le.leaveType.id) {
                            if (le.leaveStatus == "approved") {
                              approved_leave += le.leaveDays;
                            }
                          }
                        })}
                        {approved_leave}
                      </Col>
                    </Row>
                  );
                })}
              </Col>
            </Row>
          </Col>
        </Row>
      </>
    );
  }
};
const mapStateToProps = (state) => {
  return {
    Auth: state.auth,
  };
};

export default connect(mapStateToProps, {
  deleteDepartment,
  getAllEmployeeAttendenceOfDateRange,
  getSpecificUserEmployeeLeave,
  getAllLeaveType,
})(Details);
