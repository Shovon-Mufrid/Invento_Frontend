import * as types from "../types";

const INITIAL_STATE = { Companylist: [] };

const departmentReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CREATE_COMPANY:
      return state;

    case types.GET_ALL_COMPANY:
      return { ...state, Companylist: action.payload };

    case types.DELETE_COMPANY:
      const Companylist = state.Companylist.filter(
        (Company) => Company.id !== action.payload
      );
      return { ...state, Companylist };

    default:
      return state;
  }
};

export default departmentReducer;
