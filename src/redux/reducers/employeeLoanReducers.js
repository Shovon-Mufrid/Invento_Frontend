import * as types from "../types";

const INITIAL_STATE = {
  employeeLoanlist: [],
  employeeLoandetails: [],
};

const employeeLoanReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CREATE_EMPLOYEE_LOAN:
      return state;

    case types.GET_ALL_EMPLOYEE_LOAN:
      return { ...state, employeeLoanlist: action.payload };

    case types.GET_SPECIFIC_EMPLOYEE_LOAN:
      return { ...state, employeeLoandetails: action.payload };

    case types.DELETE_EMPLOYEE_LOAN:
      const employeeLoanlist = state.employeeLoanlist.filter(
        (employeeLoan) => employeeLoan.id !== action.payload
      );
      return { ...state, employeeLoanlist };

    default:
      return state;
  }
};

export default employeeLoanReducers;
