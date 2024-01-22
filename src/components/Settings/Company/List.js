import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAllCompany } from "../../../actions/companyAction";
import Rendertable from "./Rendertable";

const DepartmentList = ({ getAllCompany, List, updatelist, setUpdatelist }) => {
  useEffect(() => {
    getAllCompany();
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
    List: state.company.Companylist,
  };
};

export default connect(mapStateToProps, {
  getAllCompany,
})(DepartmentList);
