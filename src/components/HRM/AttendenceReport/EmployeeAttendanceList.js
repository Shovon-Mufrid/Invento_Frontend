import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getSpecificEmployeeAttendence,
  createAttendence,
  getAllEmployeeAttendenceOfMonth,
} from "../../../actions/AttendenceAction";
import { getAllEmployee } from "../../../actions/employeeAction";

import Rendertable from "./Rendertable";
import moment, { invalid } from "moment";
import { Row, Col, Skeleton } from "antd";

const EmployeeAttendanceList = ({
  getSpecificEmployeeAttendence,
  getAllEmployeeAttendenceOfMonth,
  getAllEmployee,
  createAttendence,
  employeeAttendancelist,
  employeeAttendancelistMonth,
  employee,
  month,
  year,
  updatelist,
  setUpdatelist,
}) => {
  const [loading, setloading] = useState(true);

  useEffect(() => {
    setloading(true);
    let promises = [];
    if (employee == "all") {
      promises.push(getAllEmployeeAttendenceOfMonth(month, year));
    } else if (employee != undefined) {
      promises.push(getSpecificEmployeeAttendence(employee, month, year));
    }
    promises.push(getAllEmployee());
    Promise.all(promises).then((values) => {
      setloading(false);
    });
    setUpdatelist(true);
  }, [
    getSpecificEmployeeAttendence,
    updatelist,
    year,
    month,
    employee,
    setUpdatelist,
  ]);

  // console.log(employeeAttendancelist);
  if (loading) {
    return <Skeleton active />;
  } else if (employee === "all") {
    return (
      <>
        <Rendertable
          List={employeeAttendancelistMonth}
          create={createAttendence}
          year={year}
          month={month}
          employee={employee}
          updatelist={updatelist}
          setUpdatelist={setUpdatelist}
        />
      </>
    );
  } else if (employee != undefined) {
    return (
      <>
        <Rendertable
          List={employeeAttendancelist}
          create={createAttendence}
          year={year}
          month={month}
          employee={employee}
          updatelist={updatelist}
          setUpdatelist={setUpdatelist}
        />
      </>
    );
  } else {
    return <>Please select an employe</>;
  }
};

const mapStateToProps = (state) => {
  return {
    employeeAttendancelist: state.employeeAttendance.employeeAttendancedetails,
    employeeAttendancelistMonth:
      state.employeeAttendance.employeeAttendancelistMonth,
  };
};

export default connect(mapStateToProps, {
  getSpecificEmployeeAttendence,
  getAllEmployee,
  createAttendence,
  getAllEmployeeAttendenceOfMonth,
})(EmployeeAttendanceList);
