import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAllOfficeType } from "../../../actions/officetypeAction";
import Rendertable from "./Rendertable";

const DepartmentList = ({
  getAllOfficeType,
  List,
  updatelist,
  setUpdatelist,
}) => {
  useEffect(() => {
    getAllOfficeType();
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
    List: state.officetype.OfficeTypelist,
  };
};

export default connect(mapStateToProps, {
  getAllOfficeType,
})(DepartmentList);
