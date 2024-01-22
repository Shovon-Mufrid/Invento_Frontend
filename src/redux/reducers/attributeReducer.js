import * as types from "../types";

const INITIAL_STATE = { attributelist: [], specificattributelist: [] };

const attributeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CREATE_ATTRIBUTE:
      return state;

    case types.GET_ALL_ATTRIBUTE:
      return { ...state, attributelist: action.payload };

    case types.GET_SPECIFIC_ATTRIBUTE:
      return { ...state, specificattributelist: action.payload };

    case types.DELETE_ATTRIBUTE:
      const attributelist = state.attributelist.filter(
        (ATTRIBUTE) => ATTRIBUTE.id !== action.payload
      );
      return { ...state, attributelist };

    default:
      return state;
  }
};

export default attributeReducer;
