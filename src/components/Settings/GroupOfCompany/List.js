import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAllGroupOfCompany } from "../../../actions/groupofcompanyAction";
import Rendertable from "./Rendertable";

const DepartmentList = ({
  getAllGroupOfCompany,
  List,
  updatelist,
  setUpdatelist,
}) => {
  useEffect(() => {
    getAllGroupOfCompany();
    setUpdatelist(true);
  }, [updatelist]);

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
    List: state.groupofcompany.GroupOfCompanylist,
  };
};

export default connect(mapStateToProps, {
  getAllGroupOfCompany,
})(DepartmentList);
