import * as types from "../types";

const INITIAL_STATE = {
  employeePaysliplist: [],
  employeePayslipdetails: [],
};

const employeePayslipReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CREATE_EMPLOYEE_SALARY_PAYSLIP:
      return state;

    case types.GET_ALL_EMPLOYEE_SALARY_PAYSLIP:
      return { ...state, employeePaysliplist: action.payload };

    case types.GET_SPECIFIC_EMPLOYEE_SALARY_PAYSLIP:
      return { ...state, employeePayslipdetails: action.payload };

    case types.DELETE_EMPLOYEE_SALARY_PAYSLIP:
      const employeePaysliplist = state.employeePaysliplist.filter(
        (employeePayslip) => employeePayslip.id !== action.payload
      );
      return { ...state, employeePaysliplist };

    default:
      return state;
  }
};

export default employeePayslipReducers;
