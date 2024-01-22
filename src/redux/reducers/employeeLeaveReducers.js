import * as types from "../types";

const INITIAL_STATE = {
  employeeLeavelist: [],
  employeeLeavedetails: [],
};

const employeeLeaveReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CREATE_EMPLOYEE_LEAVE:
      return state;

    case types.GET_ALL_EMPLOYEE_LEAVE:
      return { ...state, employeeLeavelist: action.payload };

    case types.GET_SPECIFIC_EMPLOYEE_LEAVE:
      return { ...state, employeeLeavedetails: action.payload };

    case types.DELETE_EMPLOYEE_LEAVE:
      const employeeLeavelist = state.employeeLeavelist.filter(
        (employeeLeave) => employeeLeave.id !== action.payload
      );
      return { ...state, employeeLeavelist };

    default:
      return state;
  }
};

export default employeeLeaveReducers;
