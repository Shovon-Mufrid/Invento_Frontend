import * as types from "../types";

const INITIAL_STATE = { GroupOfCompanylist: [] };

const departmentReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CREATE_GroupOfCompany:
      return state;

    case types.GET_ALL_GroupOfCompany:
      return { ...state, GroupOfCompanylist: action.payload };

    case types.DELETE_GroupOfCompany:
      const GroupOfCompanylist = state.GroupOfCompanylist.filter(
        (GroupOfCompany) => GroupOfCompany.id !== action.payload
      );
      return { ...state, GroupOfCompanylist };

    default:
      return state;
  }
};

export default departmentReducer;
