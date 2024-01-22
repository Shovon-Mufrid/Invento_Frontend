import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAllEmployeeSalary } from "../../../actions/employeeSalaryActions";
import Rendertable from "./Rendertable";

const EmployeeSalaryList = ({
  getAllEmployeeSalary,
  AllemployeeSalarylist,
  updatelist,
  setUpdatelist,
}) => {
  useEffect(() => {
    getAllEmployeeSalary();
    setUpdatelist(true);
  }, [getAllEmployeeSalary, updatelist, setUpdatelist]);

  // console.log(AllemployeeSalarylist);
  
  return (
    <>
      {
        <Rendertable
          List={AllemployeeSalarylist}
          updatelist={updatelist}
          setUpdatelist={setUpdatelist}
        />
      }
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    AllemployeeSalarylist: state.employeeSalary.employeeSalarylist,
  };
};

export default connect(mapStateToProps, {
  getAllEmployeeSalary,
})(EmployeeSalaryList);
