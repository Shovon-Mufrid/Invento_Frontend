import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import {
  getSpecificEmployeeAttendence,
  createAttendence,
} from "../../../actions/AttendenceAction";
import moment, { invalid } from "moment";
import { ConsoleSqlOutlined } from "@ant-design/icons";
import { Button, message, Skeleton, Spin, Row, Col, Divider } from "antd";

const EmployeeAttendanceList = ({
  getSpecificEmployeeAttendence,
  createAttendence,
  date,
  auth,
  loading,
  setLoading,
  distance,
}) => {
  var currentdate = new Date();
  const dateFormat = "YYYY-MM-DD";
  const [entry, setentry] = useState(false);
  const [exit, setexit] = useState(false);
  const [attendance, setattendance] = useState();
  const [showdata, setshowdata] = useState(false);

  var date =
    currentdate.getFullYear() +
    "-" +
    (currentdate.getMonth() + 1) +
    "-" +
    currentdate.getDate();
  var time =
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds();

  const tConvert = (time) => {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? " AM" : " PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(""); // return adjusted time or original string
  };

  useEffect(() => {
    getSpecificEmployeeAttendence(auth.profile.id, "", "", date, date).then(
      (e) => {
        if (e.length > 0) {
          setattendance(e[0]);
          setentry(true);
          if (e[0].exitTime) {
            setexit(true);
          }
          setshowdata(true);
        } else {
          setshowdata(true);
        }
      }
    );
  }, [loading]);

  const presententry = () => {
    const obj = {
      attendanceDate: date,
      defaultEntryTime: auth.profile.defaultEntryTime,
      defaultExitTime: auth.profile.defaultExitTime,
      defaultShift: auth.profile.defaultShift,
      employee: auth.profile.id,
      id: auth.profile.id,
      entryTime: time,
      isAttended: true,
      note: "",
      shift: auth.profile.defaultShift,
    };
    createAttendence(obj).then((e) => {
      setLoading(!loading);
      message.success("Entry complete");
    });
  };

  const presentexit = () => {
    const obj = {
      attendanceDate: date,
      defaultEntryTime: auth.profile.defaultEntryTime,
      defaultExitTime: auth.profile.defaultExitTime,
      defaultShift: auth.profile.defaultShift,
      employee: auth.profile.id,
      id: auth.profile.id,
      exitTime: time,
      isAttended: true,
      note: "",
      shift: auth.profile.defaultShift,
    };
    createAttendence(obj).then((e) => {
      setLoading(!loading);
      message.success("Exit Entry complete");
    });
  };

  if (showdata) {
    return (
      <>
        <Row
          style={{
            padding: "15px",
            borderRadius: "5px",
          }}
        >
          <Col span={24}>
            {distance < 2 ? (
              <>
                {entry ? (
                  exit ? (
                    ""
                  ) : (
                    <div className="exitButton" onClick={() => presentexit()}>
                      Lets Relax
                    </div>
                  )
                ) : (
                  <div className="entryButton" onClick={() => presententry()}>
                    I'm in
                  </div>
                )}
                {exit ? "" : <br></br>}
              </>
            ) : (
              ""
            )}
          </Col>
          <Col span={24}>
            <Row>
              {attendance ? (
                <>
                  <Col span={12}>
                    <h3>Entry time :</h3>
                  </Col>
                  <Col span={12}>
                    <h3>{tConvert(attendance.entryTime)}</h3>
                  </Col>
                </>
              ) : (
                "You are absent today"
              )}
              {entry && exit ? (
                <>
                  <Col span={12}>
                    <h3>Exit time :</h3>
                  </Col>
                  <Col span={12}>
                    <h3> {tConvert(attendance.exitTime)}</h3>
                  </Col>
                </>
              ) : (
                ""
              )}
              {attendance && attendance.isLate ? (
                <>
                  <Col span={12}>
                    <h3>Late :</h3>
                  </Col>{" "}
                  <Col span={12}>
                    <h3>{attendance.lateTime} Hours</h3>
                  </Col>
                </>
              ) : (
                ""
              )}
            </Row>
          </Col>
        </Row>
      </>
    );
  } else {
    return <>loading.......</>;
  }
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, {
  getSpecificEmployeeAttendence,
  createAttendence,
})(EmployeeAttendanceList);
