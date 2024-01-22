import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAllEmployeeByBranch } from "../../../actions/employeeAction";
import Rendertable from "./Rendertable";
import { getAllLocation } from "../../../actions/warehouseAction";
import { getAllUserRole } from "../../../actions/userRoleAction";

const EmployeeList = ({
  getAllEmployeeByBranch,
  employeeList,
  getAllLocation,
  updatelist,
  setUpdatelist,
  setData,
  getAllUserRole,
  loading,
  location,
}) => {
  useEffect(() => {
    getAllEmployeeByBranch(location).then((e) => {
      loading.current = false;
    });
    getAllLocation();
    getAllUserRole();
  }, [updatelist, setUpdatelist]);

  useEffect(() => {
    setData(employeeList);
  }, [employeeList]);

  return (
    <>
      {
        <Rendertable
          loading={loading}
          List={employeeList}
          updatelist={updatelist}
          setUpdatelist={setUpdatelist}
        />
      }
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    employeeList: state.employee.employeelistByBranchShift,
  };
};

export default connect(mapStateToProps, {
  getAllEmployeeByBranch,
  getAllLocation,
  getAllUserRole,
})(EmployeeList);
