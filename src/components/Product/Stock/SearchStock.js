import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import Rendertable from "./Rendertable";
import { getProductSearchResult } from "../../../actions/productDetails";

import { Divider, AutoComplete } from "antd";

const SearchStock = ({ getProductSearchResult, List }) => {
  const onChange = (data) => {
    getProductSearchResult(data);
  };
  useEffect(() => {
    getProductSearchResult("");
  }, [getProductSearchResult]);

  return (
    <>
      <h3>Enter barcode or product code for instant Search</h3>
      <AutoComplete
        placeholder="input search text"
        onChange={onChange}
        style={{ width: "100%" }}
      />
      <Divider />
      <Rendertable List={List} />
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    List: state.ProductDetails.productdetails,
  };
};

export default connect(mapStateToProps, { getProductSearchResult })(
  SearchStock
);
