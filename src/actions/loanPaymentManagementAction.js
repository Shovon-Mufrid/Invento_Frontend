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

export const createEmployeeLoanPayment = (formValues) => async (dispatch) => {
  formValues["data"] = "";
  try {
    const response = await backend.post(
      "api/hrm/loan-payment/",
      { ...formValues },
      getConfig()
    );
    if (response.status === 201) {
      dispatch({
        type: types.CREATE_EMPLOYEE_LOAN_PAYMENT,
        payload: { ...response.data },
      });
      message.success("Updated Successfully");
    }
  } catch (error) {
    alert(error);
  }
};

export const getAllEmployeeLoanPayment = () => async (dispatch) => {
  try {
    const response = await backend.get("api/hrm/loan-payment/", getConfig());
    if (response.status === 200) {
      dispatch({
        type: types.GET_ALL_EMPLOYEE_LOAN_PAYMENT,
        payload: response.data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getSpecificUserEmployeeLoanPayment = (id) => async (dispatch) => {
  try {
    const response = await backend.get(
      `api/hrm/loan-payment/?employee__id=${id}`,
      getConfig()
    );
    if (response.status === 200) {
      dispatch({
        type: types.GET_SPECIFIC_EMPLOYEE_LOAN_PAYMENT,
        payload: response.data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
export const getSpecificUserEmployeeLoanPaymentForLoan =
  (id) => async (dispatch) => {
    try {
      const response = await backend.get(
        `api/hrm/loan-payment/?loan__id=${id}`,
        getConfig()
      );
      if (response.status === 200) {
        dispatch({
          type: types.GET_SPECIFIC_EMPLOYEE_LOAN_PAYMENT,
          payload: response.data,
        });
      }
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

export const deleteEmployeeLoanPayment = (id) => async (dispatch) => {
  try {
    const response = await backend.delete(
      `api/hrm/loan-payment/${id}/`,
      getConfig()
    );
    if (response.status === 204) {
      dispatch({ type: types.DELETE_EMPLOYEE_LOAN_PAYMENT, payload: id });
    }
    // history.push("/loan-management");
  } catch (error) {
    alert(error);
  }
};

export const updateEmployeeLoanPayment =
  (id, formValues) => async (dispatch) => {
    try {
      const response = await backend.patch(
        `api/hrm/loan-payment/${id}/`,
        formValues,
        getConfig()
      );
      if (response.status === 200) {
        dispatch({
          type: types.UPDATE_EMPLOYEE_LOAN_PAYMENT,
          payload: { ...response.data },
        });
        message.success("Updated Successfully");
      }

      // history.push("/loan-management");
    } catch (error) {
      alert(error.response);
    }
  };
