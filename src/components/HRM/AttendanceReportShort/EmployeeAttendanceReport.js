import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getSpecificUserEmployeeLeave,
  getAllEmployeeLeave,
} from "../../../actions/employeeLeaveActions";
import {
  getSpecificEmployeeAttendence,
  getAllEmployeeAttendenceOfMonth,
  getAllEmployeeAttendenceOfDateRange,
} from "../../../actions/AttendenceAction";
import { getAllEmployeeByBranch } from "../../../actions/employeeAction";
import Rendertable from "./Rendertable";
import moment, { invalid } from "moment";
import dateFormat from "dateformat";
import { Row, Col, Skeleton } from "antd";

const EmployeeAttendanceList = ({
  getAllEmployeeByBranch,
  employeeAttendancedetails,
  getAllEmployeeAttendenceOfMonth,
  getAllEmployeeAttendenceOfDateRange,
  getAllEmployeeLeave,
  employeeLeave,
  employeeDetails,
  employee,
  location,
  startDate,
  endDate,
  data,
  setData,
  updatelist,
  setUpdatelist,
  componentRef,
  businessprofile,
}) => {
  const [loading, setloading] = useState(true);
  useEffect(() => {
    setloading(true);
    let promises = [];
    promises.push(
      getAllEmployeeAttendenceOfDateRange(startDate, endDate, location)
    );
    promises.push(getAllEmployeeLeave());
    promises.push(getAllEmployeeByBranch(location));
    Promise.all(promises).then((values) => {
      setloading(false);
    });
    //getSpecificUserEmployeeLeave(employee, "approved", month, year);

    //getAllEmployeeAttendenceOfMonth(month, year);

    // getAllEmployee();
    //getSpecificEmployeeAttendence(employee, month, year);
    setDaysInMonth(days(startDate, endDate));

    setUpdatelist(true);
  }, [updatelist, startDate, endDate, employee, location, setUpdatelist]);

  const [combineData, setCombineData] = useState([]);
  const [daysInMonth, setDaysInMonth] = useState(30);
  var days = function (startDate, endDate) {
    var a = moment(startDate);
    var b = moment(endDate);
    let day = b.diff(a, "days") + 1; // =1
    //console.log(day);
    return day;
  };
  //const dateFormat = "YYYY-MM-DD";

  const format24 = "HH:mm";
  useEffect(() => {
    let combine = [];
    getTotalAttendaceCount();
    getTotalLeaveCount();
    if (employee == "" || employee == undefined) {
      combine = [...employeeDetails];
    } else {
      combine = employeeDetails.filter((d) => d.id == employee);
    }
    setCombineData(combine);
    setData(combine);
  }, [
    employeeDetails,
    employeeAttendancedetails,
    employeeLeave,
    startDate,
    endDate,
  ]);

  const getTotalLeaveCount = () => {
    employeeDetails.forEach((elementEmployee) => {
      let leaveCount = 0;

      employeeLeave.forEach((elementLeave) => {
        if (elementLeave["employeeId"] == elementEmployee["id"]) {
          let dates = [];
          let currDate = moment(elementLeave["leaveStart"]);
          let lastDate = moment(elementLeave["leaveEnd"]);
          var start = moment(startDate);
          var end = moment(endDate);
          for (
            var m = moment(currDate);
            m.diff(lastDate, "days") <= 0;
            m.add(1, "days")
          ) {
            if (m.isBetween(start, end, "days", "[]")) {
              dates.push(m.format("YYYY-MM-DD"));
            }
          }
          let len = dates.length;

          leaveCount = leaveCount + len;
        }
      });

      elementEmployee["leave"] = leaveCount;
      let absent = elementEmployee["absent"] - leaveCount;

      elementEmployee["absent"] =
        absent >= 0 && absent != undefined && absent != NaN ? absent : 0;
    });
  };
  const getTotalAttendaceCount = () => {
    employeeDetails.forEach((elementEmployee) => {
      let lateCount = 0;
      let presentCount = 0;
      let overTime = 0;
      // console.log(elementEmployee);
      employeeAttendancedetails.forEach((elementAttendance) => {
        if (
          elementEmployee["id"] === elementAttendance["employeeId"] &&
          elementAttendance["isAttended"]
        ) {
          if (elementAttendance["isLate"]) {
            lateCount = lateCount + 1;
          }
          presentCount = presentCount + 1;
          // console.log(elementAttendance["overTime"]);
          let time = parseFloat(elementAttendance["overTime"]);
          let hr = parseInt(time);
          let min = parseFloat(time - hr) * 100;
          overTime += hr * 60 + min;
          // console.log(hr);
          // console.log(min);
          // console.log(overTime);
        }
      });

      // console.log(overTime);
      let TotaloverTimeHr = Math.floor(overTime / 60);
      let TotaloverTime = parseFloat(
        TotaloverTimeHr + (overTime - TotaloverTimeHr * 60) / 100
      ).toFixed(2);
      elementEmployee["overTime"] = TotaloverTime;
      elementEmployee["late"] = lateCount;
      elementEmployee["present"] = presentCount;
      let absent = daysInMonth - presentCount;
      elementEmployee["absent"] =
        absent >= 0 && absent != undefined && absent != NaN ? absent : 0;
    });
  };

  // //console.log(combineData);
  if (loading) {
    return <Skeleton active />;
  } else {
    return (
      <>
        {
          <Rendertable
            List={combineData}
            //details={employeeDetails}
            startDate={startDate}
            endDate={endDate}
            employee={employee}
            updatelist={updatelist}
            setUpdatelist={setUpdatelist}
          />
        }
      </>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    employeeAttendancedetails:
      state.employeeAttendance.employeeAttendancelistMonth,
    employeeLeave: state.employeeLeave.employeeLeavelist,
    employeeDetails: state.employee.employeelistByBranchShift,
    businessprofile: state.settings.businessprofile,
  };
};

export default connect(mapStateToProps, {
  getSpecificUserEmployeeLeave,
  getSpecificEmployeeAttendence,
  getAllEmployeeAttendenceOfMonth,
  getAllEmployeeAttendenceOfDateRange,
  getAllEmployeeLeave,
  getAllEmployeeByBranch,
})(EmployeeAttendanceList);
