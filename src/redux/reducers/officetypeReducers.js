import * as types from "../types";

const INITIAL_STATE = { OfficeTypelist: [] };

const departmentReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CREATE_OFFICE_TYPE:
      return state;

    case types.GET_ALL_OFFICE_TYPE:
      return { ...state, OfficeTypelist: action.payload };

    case types.DELETE_OFFICE_TYPE:
      const OfficeTypelist = state.OfficeTypelist.filter(
        (OfficeType) => OfficeType.id !== action.payload
      );
      return { ...state, OfficeTypelist };

    default:
      return state;
  }
};

export default departmentReducer;
