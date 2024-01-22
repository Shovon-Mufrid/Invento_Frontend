import * as types from "../types";

const INITIAL_STATE = {
  productlist: [],
  productdetails: [],
  productdetailsfromstock: [],
};

const attributeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CREATE_PRODUCT_DETAILS:
      return state;

    case types.GET_ALL_PRODUCT_DETAILS:
      return { ...state, productlist: action.payload };

    case types.GET_SPECIFIC_PRODUCT_DETAILS:
      return { ...state, productdetails: action.payload };

    case types.DELETE_PRODUCT_DETAILS:
      const productlist = state.productlist.filter(
        (singleproduct) => singleproduct.id !== action.payload
      );
      return { ...state, productlist };
    case types.GET_SPECIFIC_PRODUCT_DETAILS_FROM_STOCK:
      return { ...state, productdetailsfromstock: action.payload };

    default:
      return state;
  }
};

export default attributeReducer;
