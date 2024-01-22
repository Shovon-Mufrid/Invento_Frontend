import * as types from "../types";

const INITIAL_STATE = {
  employeeSalarylist: [],
  employeeSalarydetails: [],
};

const employeeSalaryReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CREATE_EMPLOYEE_SALARY:
      return state;

    case types.GET_ALL_EMPLOYEE_SALARY:
      return { ...state, employeeSalarylist: action.payload };

    case types.GET_SPECIFIC_EMPLOYEE_SALARY:
      return { ...state, employeeSalarydetails: action.payload };

    case types.DELETE_EMPLOYEE_SALARY:
      const employeeSalarylist = state.employeeSalarylist.filter(
        (employeeSalary) => employeeSalary.id !== action.payload
      );
      return { ...state, employeeSalarylist };

    default:
      return state;
  }
};

export default employeeSalaryReducers;
