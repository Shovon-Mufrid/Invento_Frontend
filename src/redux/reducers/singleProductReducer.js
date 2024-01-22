import * as types from "../types";

const INITIAL_STATE = { sinleproductlist: [], singleproduct: [] };

const attributeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CREATE_SINGLE_PRODUCT:
      return state;

    case types.GET_ALL_SINGLE_PRODUCT:
      return { ...state, sinleproductlist: action.payload };

    case types.GET_SPECIFIC_SINGLE_PRODUCT:
      return { ...state, singleproduct: action.payload };

    case types.DELETE_SINGLE_PRODUCT:
      const sinleproductlist = state.sinleproductlist.filter(
        (singleproduct) => singleproduct.id !== action.payload
      );
      return { ...state, sinleproductlist };

    default:
      return state;
  }
};

export default attributeReducer;
