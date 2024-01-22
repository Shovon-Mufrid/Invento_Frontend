import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Tree } from "antd";
import {
  getAllCategory,
  updateCategory,
} from "../../../actions/categoryAction";
// import Rendertable from "./Rendertable";

const CategoryList = ({
  getAllCategory,
  List,
  updatelist,
  setUpdatelist,
  setcategorylist,
  setselectedCategory,
}) => {
  useEffect(() => {
    getAllCategory();
    setUpdatelist(true);
    setcategorylist(List);
    console.log(List);
    setselectedCategory([]);
  }, [getAllCategory, updatelist, setUpdatelist]);

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
    List: state.category.categorylist,
  };
};

export default connect(mapStateToProps, {
  getAllCategory,
})(CategoryList);
