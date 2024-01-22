import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getSpecificUserEmployeeSalaryPayslipRange, getAllEmployeeSalaryPayslipRange } from "../../../actions/PaySlipAction";
import Rendertable from "./Rendertable";

const EmployeeAttendanceList = ({
  getAllEmployeeSalaryPayslipRange,
  getSpecificUserEmployeeSalaryPayslipRange,
  employeePaysliplist,
  employeeSalarylist,
  employeeDetails,
  employee,
  from,
  to,
  setData,
  updatelist,
  setUpdatelist,
}) => {
  

  useEffect(() => {
    getAllEmployeeSalaryPayslipRange(from, to);
    if(employee != undefined)
    {
      getSpecificUserEmployeeSalaryPayslipRange(employee, from, to);
    }
    setUpdatelist(true);
  }, [updatelist, from, to, employee, setUpdatelist]);
  
  const [combineData, setCombineData] = useState([]);
  useEffect(() => {
    let combine = []
    if(employee == '' || employee == undefined)
    {
      combine = [
        ...employeePaysliplist,
      ];
    }
    else
    {
      combine = [
        ...employeeSalarylist,
      ];
    }

    setCombineData(combine);
    setData(combine);
  }, [employeeSalarylist, employeeDetails, from, to, employeePaysliplist]);

  return (
    <>
      {
        <Rendertable
          List={combineData}
          from={from}
          to={to}
          employee={employee}
          updatelist={updatelist}
          setUpdatelist={setUpdatelist}
        />
      }
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    employeeSalarylist: state.employeePayslip.employeePayslipdetails,
    employeePaysliplist: state.employeePayslip.employeePaysliplist,
  };
};

export default connect(mapStateToProps, {
  getSpecificUserEmployeeSalaryPayslipRange,
  getAllEmployeeSalaryPayslipRange,
})(EmployeeAttendanceList);
