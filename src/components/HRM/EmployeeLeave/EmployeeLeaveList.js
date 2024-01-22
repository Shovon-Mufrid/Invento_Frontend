import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAllEmployeeLeave } from "../../../actions/employeeLeaveActions";
import { getAllLeaveType } from "../../../actions/leaveTypeActions";
import { getAllEmployee } from '../../../actions/employeeAction';
import Rendertable from "./Rendertable";

const EmployeeLeaveList = ({
  getAllEmployeeLeave,
  getAllLeaveType,
  getAllEmployee,
  employeeLeavelist,
  updatelist,
  setUpdatelist,
  setData,
}) => {
  useEffect(() => {
    getAllEmployeeLeave();
    getAllLeaveType();
    getAllEmployee();

    setUpdatelist(true);
  }, [getAllEmployeeLeave, updatelist, setUpdatelist]);

  // console.log(employeeLeavelist);
  useEffect(() => {
    setData(employeeLeavelist);
  }, [employeeLeavelist, setData]);
  
  return (
    <>
      {
        <Rendertable
          List={employeeLeavelist}
          updatelist={updatelist}
          setUpdatelist={setUpdatelist}
        />
      }
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    employeeLeavelist: state.employeeLeave.employeeLeavelist,
  };
};

export default connect(mapStateToProps, {
  getAllEmployeeLeave,
  getAllLeaveType,
  getAllEmployee,
})(EmployeeLeaveList);
