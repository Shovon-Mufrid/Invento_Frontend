import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import {
  getAllEmployeeAttendenceOfDate,
  createAttendence,
} from "../../../actions/AttendenceAction";
import {
  getAllEmployee,
  getAllEmployeeByBranch,
  getAllEmployeeByBranchShift,
} from "../../../actions/employeeAction";
import Rendertable from "./Rendertable";
import moment, { invalid } from "moment";
import { ConsoleSqlOutlined } from "@ant-design/icons";
import { Skeleton, Spin } from "antd";

const EmployeeAttendanceList = ({
  getAllEmployeeAttendenceOfDate,
  createAttendence,
  employeeAttendancelist,
  getAllEmployeeByBranch,
  getAllEmployeeByBranchShift,
  employeeList,
  date,
  shift,
  branch,
  updatelist,
  setUpdatelist,
  loading,
  setData,
}) => {
  let data = { ...date };
  const [dataload, setdataload] = useState(false);
  const dateFormat = "YYYY-MM-DD";
  const timeformat = "h:mm a";
  const format = "h:mm a";
  let attendanceDate = moment(data, dateFormat);
  const employeeData = [];

  if (!attendanceDate.isValid()) {
    data = new Date();
    attendanceDate = moment(data, dateFormat);
  }
  attendanceDate.format(dateFormat);
  useEffect(() => {
    // loading.current = true;
    // console.log("start");
    getAllEmployeeAttendenceOfDate(attendanceDate, shift, branch).then(
      (res) => {
        getAllEmployeeByBranchShift(branch, shift).then((e) => {
          setUpdatelist(true);

          // console.log("end");
          // console.log(loading.current);
        });
      }
    );
  }, [updatelist, date, shift, branch, setUpdatelist]);
  loading.current = true;
  employeeList.forEach((employee) => {
    employeeData.push({ ...employee });
  });

  employeeData.forEach((employee) => {
    employeeAttendancelist.forEach((attendance) => {
      let req_format = attendanceDate.format("YYYY-MM-DD");
      if (
        employee["id"] === attendance["employeeId"] &&
        attendance["attendanceDate"] == req_format &&
        attendance["shift"] == shift
      ) {
        // console.log("emoloyee matched");
        employee["attendanceDate"] = attendance["attendanceDate"];
        employee["isAttended"] = attendance["isAttended"];
        employee["entryTime"] = attendance["entryTime"];
        employee["exitTime"] = attendance["exitTime"];
        employee["note"] = attendance["note"];
        employee["overTime"] = attendance["overTime"];
        employee["lateTime"] = attendance["lateTime"];
        employee["shift"] = attendance["shift"];
      }
    });
  });
  employeeData.forEach((employee) => {
    // console.log("No data");
    if (employee["attendanceDate"] === undefined) {
      employee["attendanceDate"] = date;
    }
    if (employee["shift"] === undefined) {
      employee["shift"] = shift;
    }
    if (employee["isAttended"] === undefined) {
      employee["isAttended"] = false;
    }
    if (employee["entryTime"] === undefined) {
      employee["entryTime"] = employee["defaultEntryTime"];
    }
    if (employee["exitTime"] === undefined) {
      employee["exitTime"] = employee["defaultExitTime"];
    }
    if (employee["note"] === undefined || employee["note"] === null) {
      employee["note"] = "";
    }
    if (employee["overTime"] === undefined || employee["overTime"] === null) {
      employee["overTime"] = 0.0;
    }
    if (employee["lateTime"] === undefined || employee["lateTime"] === null) {
      employee["lateTime"] = 0.0;
    }
  });

  useEffect(() => {
    setData(employeeData);
    loading.current = false;
  }, [employeeData, setData]);

  return (
    <>
      <Rendertable
        List={employeeAttendancelist}
        employees={employeeData}
        create={createAttendence}
        date={attendanceDate}
        shift={shift}
        updatelist={updatelist}
        setUpdatelist={setUpdatelist}
        loading={loading}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    employeeAttendancelist: state.employeeAttendance.employeeAttendancelist,
    employeeList: state.employee.employeelistByBranchShift,
  };
};

export default connect(mapStateToProps, {
  getAllEmployeeAttendenceOfDate,
  createAttendence,
  getAllEmployeeByBranch,
  getAllEmployeeByBranchShift,
})(EmployeeAttendanceList);
