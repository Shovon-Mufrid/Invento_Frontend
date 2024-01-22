import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Tree } from "antd";
import {
  getAllOfficeLocation,
  updateCategory,
} from "../../../actions/officelocationAction";
// import Rendertable from "./Rendertable";

const CategoryList = ({
  getAllOfficeLocation,
  List,
  updatelist,
  setUpdatelist,
  setcategorylist,
  setselectedCategory,
}) => {
  useEffect(() => {
    getAllOfficeLocation();
    setUpdatelist(true);
    setcategorylist(List);
    setselectedCategory([]);
  }, [updatelist]);

  const onSelect = (selectedKeys, info) => {
    setselectedCategory(info.node);
  };

  const onCheck = (checkedKeys, info) => {
    console.log("onCheck", checkedKeys, info);
  };

  return (
    <>
      <Tree onSelect={onSelect} onCheck={onCheck} treeData={List} />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    List: state.officelocation.OfficeLocationlist,
  };
};

export default connect(mapStateToProps, {
  getAllOfficeLocation,
})(CategoryList);
