import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAllEmployeeLoan } from "../../../actions/loanManagementAction";
import Rendertable from "./Rendertable";

const EmployeeLeaveList = ({
  getAllEmployeeLoan,
  employeeLoanlist,
  updatelist,
  setUpdatelist,
  setData,
}) => {
  useEffect(() => {
    getAllEmployeeLoan();
    setUpdatelist(true);
  }, [getAllEmployeeLoan, updatelist, setUpdatelist]);

  useEffect(() => {
    setData(employeeLoanlist);
  }, [employeeLoanlist]);
  
  // console.log(employeeLoanlist);
  
  return (
    <>
      {
        <Rendertable
          List={employeeLoanlist}
          updatelist={updatelist}
          setUpdatelist={setUpdatelist}
        />
      }
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    employeeLoanlist: state.employeeLoan.employeeLoanlist,
  };
};

export default connect(mapStateToProps, {
  getAllEmployeeLoan,
})(EmployeeLeaveList);
