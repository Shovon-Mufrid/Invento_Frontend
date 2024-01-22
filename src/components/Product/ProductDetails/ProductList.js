import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getProduct } from "../../../actions/productDetails";
import RenderTable from "./RenderTable";

const ProductList = ({ getProduct, List, updatelist, setUpdatelist }) => {
  useEffect(() => {
    getProduct();
    setUpdatelist(true);
  }, [getProduct, updatelist, setUpdatelist]);

  return (
    <>
      <RenderTable List={List} setUpdatelist={setUpdatelist} />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    List: state.ProductDetails.productlist,
  };
};

export default connect(mapStateToProps, {
  getProduct,
})(ProductList);
