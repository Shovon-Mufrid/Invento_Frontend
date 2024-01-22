import * as types from "../types";

const INITIAL_STATE = {
  employeeSalaryPaymentlist: [],
  employeeSalaryPaymentdetails: [],
};

const employeeSalaryPaymentReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CREATE_EMPLOYEE_SALARY_PAYMENT:
      return state;

    case types.GET_ALL_EMPLOYEE_SALARY_PAYMENT:
      return { ...state, employeeSalaryPaymentlist: action.payload };

    case types.GET_SPECIFIC_EMPLOYEE_SALARY_PAYMENT:
      return { ...state, employeeSalaryPaymentdetails: action.payload };

    case types.DELETE_EMPLOYEE_SALARY_PAYMENT:
      const employeeSalaryPaymentlist = state.employeeSalaryPaymentlist.filter(
        (employeeSalaryPayment) => employeeSalaryPayment.id !== action.payload
      );
      return { ...state, employeeSalaryPaymentlist };

    default:
      return state;
  }
};

export default employeeSalaryPaymentReducers;
