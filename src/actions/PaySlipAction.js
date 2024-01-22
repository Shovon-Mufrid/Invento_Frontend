import * as types from "../redux/types";
import backend from "../api/api";
import { store } from "../redux/store";
import { message } from "antd";

const getConfig = () => {
  const token = store.getState().auth.token;

  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  return config;
};

export const createEmployeePaySlip = (formValues) => async (dispatch) => {
  formValues["data"] = "";
  try {
    const response = await backend.post(
      "api/hrm/payslip/",
      { ...formValues },
      getConfig()
    );
    if (response.status === 201) {
      dispatch({
        type: types.CREATE_EMPLOYEE_SALARY_PAYSLIP,
        payload: { ...response.data },
      });
      message.success("Updated Successfully");
    }
  } catch (error) {
    alert(error);
  }
};

export const getAllEmployeeSalaryPayslip = () => async (dispatch) => {
  try {
    const response = await backend.get("api/hrm/payslip/", getConfig());
    if (response.status === 200) {
      dispatch({
        type: types.GET_ALL_EMPLOYEE_SALARY_PAYSLIP,
        payload: response.data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
export const getAllEmployeeSalaryPayslipOfMonth =
  (month, year) => async (dispatch) => {
    try {
      const response = await backend.get(
        `api/hrm/payslip/?salaryMonth=${month}&salaryYear=${year}`,
        getConfig()
      );
      if (response.status === 200) {
        dispatch({
          type: types.GET_ALL_EMPLOYEE_SALARY_PAYSLIP,
          payload: response.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
export const getAllEmployeeSalaryPayslipRange =
  (from, to) => async (dispatch) => {
    try {
      const response = await backend.get(
        `api/hrm/payslip/?fromMonth=${from}&toMonth=${to}`,
        getConfig()
      );
      if (response.status === 200) {
        dispatch({
          type: types.GET_ALL_EMPLOYEE_SALARY_PAYSLIP,
          payload: response.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
export const getSpecificUserEmployeeSalaryPayslip =
  (id, month, year) => async (dispatch) => {
    try {
      const response = await backend.get(
        `api/hrm/payslip/?employee__id=${id}&salaryMonth=${month}&salaryYear=${year}`,
        getConfig()
      );
      if (response.status === 200) {
        dispatch({
          type: types.GET_SPECIFIC_EMPLOYEE_SALARY_PAYSLIP,
          payload: response.data,
        });
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };
export const getSpecificUserEmployeeSalaryPayslipRange =
  (id, from, to) => async (dispatch) => {
    try {
      const response = await backend.get(
        `api/hrm/payslip/?employee__id=${id}&fromMonth=${from}&toMonth=${to}`,
        getConfig()
      );
      if (response.status === 200) {
        dispatch({
          type: types.GET_SPECIFIC_EMPLOYEE_SALARY_PAYSLIP,
          payload: response.data,
        });
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };
export const getSpecificUserEmployeeSalaryPayslipAll =
  (id) => async (dispatch) => {
    try {
      const response = await backend.get(
        `api/hrm/payslip/?employee__id=${id}`,
        getConfig()
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };
export const getAllPayslipByAccount = (id, start, end) => async (dispatch) => {
  try {
    const response = await backend.get(
      `api/hrm/payslip/?payment_method_1__id=${id}&payment_method_2__id=${id}&start=${start}&end=${end}`,
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteEmployeeSalaryPayslip = (id) => async (dispatch) => {
  try {
    const response = await backend.delete(
      `api/hrm/payslip/${id}/`,
      getConfig()
    );
    if (response.status === 204) {
      dispatch({ type: types.DELETE_EMPLOYEE_SALARY_PAYSLIP, payload: id });
    }
  } catch (error) {
    alert(error);
  }
};

export const updateEmployeeSalaryPayslip =
  (id, formValues) => async (dispatch) => {
    try {
      const response = await backend.patch(
        `api/hrm/payslip/${id}/`,
        formValues,
        getConfig()
      );
      if (response.status === 200) {
        dispatch({
          type: types.UPDATE_EMPLOYEE_SALARY_PAYSLIP,
          payload: { ...response.data },
        });
        message.success("Updated Successfully");
      }
    } catch (error) {
      alert(error.response);
    }
  };
