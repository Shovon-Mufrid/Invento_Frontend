import * as types from "../types";

const INITIAL_STATE = { categorylist: [], categoryProductlist: [] };

const categoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CREATE_CATEGORY:
      return state;

    case types.GET_ALL_CATEGORY:
      return { ...state, categorylist: action.payload };
    
    case types.GET_ALL_CATEGORY_PRODUCT:
      return { ...state, categoryProductlist: action.payload };

    case types.DELETE_CATEGORY:
      const categorylist = state.categorylist.filter(
        (category) => category.id !== action.payload
      );
      return { ...state, categorylist };

    default:
      return state;
  }
};

export default categoryReducer;
