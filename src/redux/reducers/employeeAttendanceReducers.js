import * as types from "../types";

const INITIAL_STATE = {
  employeeAttendancelist: [],
  employeeAttendancelistMonth: [],
  employeeAttendancedetails: [],
};

const employeeAttendanceReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CREATE_EMPLOYEE_ATTENDENCE:
      return state;

    case types.GET_ALL_EMPLOYEE_ATTENDENCE_OF_DATE:
      return { ...state, employeeAttendancelist: action.payload };

    case types.GET_ALL_EMPLOYEE_ATTENDENCE_OF_MONTH:
        return { ...state, employeeAttendancelistMonth: action.payload };

    case types.GET_SPECIFIC_EMPLOYEE_ATTENDENCE:
      return { ...state, employeeAttendancedetails: action.payload };

    case types.DELETE_EMPLOYEE_ATTENDENCE:
      const employeeAttendancelist = state.employeeAttendancelist.filter(
        (employeeAttendance) => employeeAttendance.id !== action.payload
      );
      return { ...state, employeeAttendancelist };

    default:
      return state;
  }
};

export default employeeAttendanceReducers;
