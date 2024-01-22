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

export const createEmployeeSalary = (formValues) => async (dispatch) => {
  formValues["data"] = "";
  try {
    const response = await backend.post(
      "api/hrm/salary/",
      { ...formValues },
      getConfig()
    );
    if (response.status === 201) {
      dispatch({
        type: types.CREATE_EMPLOYEE_SALARY,
        payload: { ...response.data },
      });
      message.success("Updated Successfully");
      // history.push("/salary");
    }
  } catch (error) {
    alert(error);
  }
};

export const getAllEmployeeSalary = () => async (dispatch) => {
  try {
    const response = await backend.get("api/hrm/salary/", getConfig());
    if (response.status === 200) {
      dispatch({
        type: types.GET_ALL_EMPLOYEE_SALARY,
        payload: response.data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getSpecificUserEmployeeSalary = (id) => async (dispatch) => {
  try {
    const response = await backend.get(
      `api/hrm/salary/?employee__id=${id}`,
      getConfig()
    );
    if (response.status === 200) {
      dispatch({
        type: types.GET_SPECIFIC_EMPLOYEE_SALARY,
        payload: response.data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteEmployeeSalary = (id) => async (dispatch) => {
  try {
    const response = await backend.delete(`api/hrm/salary/${id}/`, getConfig());
    if (response.status === 204) {
      dispatch({ type: types.DELETE_EMPLOYEE_SALARY, payload: id });
    }
    // history.push("/salary");
  } catch (error) {
    alert(error);
  }
};

export const updateEmployeeSalary = (id, formValues) => async (dispatch) => {
  try {
    const response = await backend.patch(
      `api/hrm/salary/${id}/`,
      formValues,
      getConfig()
    );
    if (response.status === 200) {
      dispatch({
        type: types.UPDATE_EMPLOYEE_SALARY,
        payload: { ...response.data },
      });
      message.success("Updated Successfully");
    }

    // history.push("/salary");
  } catch (error) {
    alert(error.response);
  }
};
