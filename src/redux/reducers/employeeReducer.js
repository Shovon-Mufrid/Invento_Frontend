import * as types from "../types";

const INITIAL_STATE = {
  employeelist: [],
  employeedetails: [],
  employeelistsearchresult: [],
  employeelistByBranchShift: [],
};

const employeeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CREATE_EMPLOYEE:
      return state;

    case types.UPDATE_EMPLOYEE:
      return state;

    case types.UPDATE_EMPLOYEE_PROFILE:
      return state;

    case types.GET_ALL_EMPLOYEE:
      return { ...state, employeelist: action.payload };

    case types.GET_SPECIFIC_EMPLOYEE:
      return { ...state, employeedetails: action.payload };

    case types.GET_ALL_EMPLOYEE_BY_BRANCH_SHIFT:
      // console.log(action.payload);
      return { ...state, employeelistByBranchShift: action.payload };

    case types.GET_ALL_EMPLOYEE_HISTORY:
      return { ...state, history: action.payload };

    case types.DELETE_EMPLOYEE:
      const employeelist = state.employeelist.filter(
        (employee) => employee.id !== action.payload
      );
      return { ...state, employeelist };
    case types.GET_EMPLOYEE_SEARCH_RESULT:
      return { ...state, employeelistsearchresult: action.payload };

    default:
      return state;
  }
};

export default employeeReducer;
