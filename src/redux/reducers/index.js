import { combineReducers } from "redux";
import authReducer from "./authReducer";
import contactReducer from "./contactReducer";
import attributeReducer from "./attributeReducer";
import categoryReducer from "./categoryReducer";
import singleProductReducer from "./singleProductReducer";
import ProductDetails from "./ProductDetailsReducer";
import warehouseReducer from "./warehouseReducer";
import serviceReducer from "./serviceReducer";
import departmentReducer from "./departmentReducers";
import userRoleReducer from "./userRoleReducers";
import employeeReducer from "./employeeReducer";
import LeaveTypeReducer from "./leaveTypeReducers";
import employeeLeaveReducers from "./employeeLeaveReducers";
import employeeAttendanceReducers from "./employeeAttendanceReducers";
import employeeSalaryReducers from "./employeeSalaryReducers";
import settingsReducers from "./settingsReducers";
import employeeSalaryPaymentReducers from "./employeeSalaryPaymentReducers";
import employeeLoanReducers from "./employeeLoanReducers";
import employeeLoanPaymentReducers from "./employeeLoanPaymentReducers";
import employeePayslipReducers from "./employeePayslipReducers";
import notificationReducer from "./notificationsReducer";
import pattycashReducer from "./pattycashReducer";
import groupofcompanyReducers from "./groupofcompanyReducers";
import companyReducers from "./companyReducers";
import officetypeReducers from "./officetypeReducers";
import officelocationReducers from "./officelocationReducers";
import * as types from "../types";
import accountReducer from "./accountReducers";

const appReducer = combineReducers({
  auth: authReducer,
  accounts: accountReducer,
  contacts: contactReducer,
  attribute: attributeReducer,
  category: categoryReducer,
  singleProduct: singleProductReducer,
  ProductDetails: ProductDetails,
  services: serviceReducer,
  warehouse: warehouseReducer,
  department: departmentReducer,
  userRole: userRoleReducer,
  employee: employeeReducer,
  leaveType: LeaveTypeReducer,
  employeeLeave: employeeLeaveReducers,
  employeeAttendance: employeeAttendanceReducers,
  employeeSalary: employeeSalaryReducers,
  settings: settingsReducers,
  employeeSalaryPayment: employeeSalaryPaymentReducers,
  employeeLoan: employeeLoanReducers,
  employeeLoanPayment: employeeLoanPaymentReducers,
  employeePayslip: employeePayslipReducers,
  notifications: notificationReducer,
  pattycash: pattycashReducer,
  groupofcompany: groupofcompanyReducers,
  company: companyReducers,
  officelocation: officelocationReducers,
  officetype: officetypeReducers,
});

const rootReducer = (state, action) => {
  if (action.type === types.SIGN_OUT) {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default rootReducer;
