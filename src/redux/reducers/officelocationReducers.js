import * as types from "../types";

const INITIAL_STATE = { OfficeLocationlist: [] };

const departmentReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CREATE_OFFICE_LOCATION:
      return state;

    case types.GET_ALL_OFFICE_LOCATION:
      return { ...state, OfficeLocationlist: action.payload };

    case types.DELETE_OFFICE_LOCATION:
      const OfficeLocationlist = state.OfficeLocationlist.filter(
        (OfficeLocation) => OfficeLocation.id !== action.payload
      );
      return { ...state, OfficeLocationlist };

    default:
      return state;
  }
};

export default departmentReducer;
