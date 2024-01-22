import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAllDepartment } from "../../../actions/departmentActions";
import Rendertable from "./Rendertable";

const DepartmentList = ({
  getAllDepartment,
  List,
  updatelist,
  setUpdatelist,
}) => {
  useEffect(() => {
    getAllDepartment();
    setUpdatelist(true);
  }, [getAllDepartment, updatelist, setUpdatelist]);

  return (
    <>
      {
        <Rendertable
          List={List}
          updatelist={updatelist}
          setUpdatelist={setUpdatelist}
        />
      }
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    List: state.department.departmentlist,
  };
};

export default connect(mapStateToProps, {
  getAllDepartment,
})(DepartmentList);
