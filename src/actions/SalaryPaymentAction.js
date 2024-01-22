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

export const createEmployeeSalaryPayment = (formValues) => async (dispatch) => {
  formValues["data"] = "";
  try {
    const response = await backend.post(
      "api/hrm/salary-payment/",
      { ...formValues },
      getConfig()
    );
    if (response.status === 201) {
      dispatch({
        type: types.CREATE_EMPLOYEE_SALARY_PAYMENT,
        payload: { ...response.data },
      });
      message.success(
        "Salary Payment Added for " + formValues["employee"]["name"]
      );
    }
  } catch (error) {
    alert(error);
  }
};

export const getAllEmployeeSalaryPayment = () => async (dispatch) => {
  try {
    const response = await backend.get("api/hrm/salary-payment/", getConfig());
    if (response.status === 200) {
      dispatch({
        type: types.GET_ALL_EMPLOYEE_SALARY_PAYMENT,
        payload: response.data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getSpecificUserEmployeeSalaryPayment =
  (id) => async (dispatch) => {
    try {
      const response = await backend.get(
        `api/hrm/salary-payment/?employee__id=${id}`,
        getConfig()
      );
      if (response.status === 200) {
        dispatch({
          type: types.GET_SPECIFIC_EMPLOYEE_SALARY_PAYMENT,
          payload: response.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
export const getSpecificUserEmployeeSalaryPaymentForLoan =
  (id) => async (dispatch) => {
    try {
      const response = await backend.get(
        `api/hrm/salary-payment/?loan__id=${id}`,
        getConfig()
      );
      if (response.status === 200) {
        dispatch({
          type: types.GET_SPECIFIC_EMPLOYEE_SALARY_PAYMENT,
          payload: response.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

export const deleteEmployeeSalaryPayment = (id) => async (dispatch) => {
  try {
    const response = await backend.delete(
      `api/hrm/salary-payment/${id}/`,
      getConfig()
    );
    if (response.status === 204) {
      dispatch({ type: types.DELETE_EMPLOYEE_SALARY_PAYMENT, payload: id });
    }
  } catch (error) {
    alert(error);
  }
};

export const updateEmployeeSalaryPayment =
  (id, formValues) => async (dispatch) => {
    try {
      const response = await backend.patch(
        `api/hrm/salary-payment/${id}/`,
        formValues,
        getConfig()
      );
      if (response.status === 200) {
        dispatch({
          type: types.UPDATE_EMPLOYEE_SALARY_PAYMENT,
          payload: { ...response.data },
        });
        message.success("Loans Updated for " + formValues["employee"]["name"]);
      }
    } catch (error) {
      alert(error.response);
    }
  };
