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

export const createEmployeeLoan = (formValues) => async (dispatch) => {
  formValues["data"] = "";
  try {
    const response = await backend.post(
      "api/hrm/loan/",
      { ...formValues },
      getConfig()
    );
    if (response.status === 201) {
      dispatch({
        type: types.CREATE_EMPLOYEE_LOAN,
        payload: { ...response.data },
      });
      message.success("Updated Successfully");
      // history.push("/loan-management");
    }
  } catch (error) {
    alert(error);
  }
};

export const getAllEmployeeLoan = () => async (dispatch) => {
  try {
    const response = await backend.get("api/hrm/loan/", getConfig());
    if (response.status === 200) {
      dispatch({
        type: types.GET_ALL_EMPLOYEE_LOAN,
        payload: response.data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getSpecificUserEmployeeLoan =
  (id, status, paymentStatus) => async (dispatch) => {
    try {
      const response = await backend.get(
        `api/hrm/loan/?employee__id=${id}&loanStatus=${status}&loanPaymentStatus=${paymentStatus}`,
        getConfig()
      );
      if (response.status === 200) {
        dispatch({
          type: types.GET_SPECIFIC_EMPLOYEE_LOAN,
          payload: response.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

export const deleteEmployeeLoan = (id) => async (dispatch) => {
  try {
    const response = await backend.delete(`api/hrm/loan/${id}/`, getConfig());
    if (response.status === 204) {
      dispatch({ type: types.DELETE_EMPLOYEE_LOAN, payload: id });
    }
    // history.push("/loan-management");
  } catch (error) {
    alert(error);
  }
};

export const updateEmployeeLoan = (id, formValues) => async (dispatch) => {
  try {
    const response = await backend.put(
      `api/hrm/loan/${id}/`,
      formValues,
      getConfig()
    );
    if (response.status === 200) {
      dispatch({
        type: types.UPDATE_EMPLOYEE_LOAN,
        payload: { ...response.data },
      });
      message.success("Updated Successfully");
    }

    // history.push("/loan-management");
  } catch (error) {
    alert(error.response);
  }
};
