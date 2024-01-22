import * as types from "../types";

const INITIAL_STATE = {
  employeeLoanPaymentlist: [],
  employeeLoanPaymentdetails: [],
};

const employeeLoanPaymentReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CREATE_EMPLOYEE_LOAN_PAYMENT:
      return state;

    case types.GET_ALL_EMPLOYEE_LOAN_PAYMENT:
      return { ...state, employeeLoanPaymentlist: action.payload };

    case types.GET_SPECIFIC_EMPLOYEE_LOAN_PAYMENT:
      return { ...state, employeeLoanPaymentdetails: action.payload };

    case types.DELETE_EMPLOYEE_LOAN_PAYMENT:
      const employeeLoanPaymentlist = state.employeeLoanPaymentlist.filter(
        (employeeLoanPayment) => employeeLoanPayment.id !== action.payload
      );
      return { ...state, employeeLoanPaymentlist };

    default:
      return state;
  }
};

export default employeeLoanPaymentReducers;
