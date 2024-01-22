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

export const createEmployeeLeave = (formValues) => async (dispatch) => {
  formValues["data"] = "";
  try {
    const response = await backend.post(
      "api/hrm/employee-leave/",
      { ...formValues },
      getConfig()
    );
    if (response.status === 201) {
      dispatch({
        type: types.CREATE_EMPLOYEE_LEAVE,
        payload: { ...response.data },
      });
      message.success("Updated Successfully");
      // history.push("/employee-leave");
    }
  } catch (error) {
    alert(error);
  }
};

export const getAllEmployeeLeave = () => async (dispatch) => {
  try {
    const response = await backend.get("api/hrm/employee-leave/", getConfig());
    if (response.status === 200) {
      dispatch({
        type: types.GET_ALL_EMPLOYEE_LEAVE,
        payload: response.data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getSpecificUserEmployeeLeave =
  (id, status, month, year, start_date = "", end_date = "") =>
  async (dispatch) => {
    try {
      const response = await backend.get(
        `api/hrm/employee-leave/?employee__id=${id}&leaveStatus=${status}&month=${month}&year=${year}&start_date=${start_date}&end_date=${end_date}`,
        getConfig()
      );
      if (response.status === 200) {
        dispatch({
          type: types.GET_SPECIFIC_EMPLOYEE_LEAVE,
          payload: response.data,
        });
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

export const deleteEmployeeLeave = (id) => async (dispatch) => {
  try {
    const response = await backend.delete(
      `api/hrm/employee-leave/${id}/`,
      getConfig()
    );
    if (response.status === 204) {
      dispatch({ type: types.DELETE_EMPLOYEE_LEAVE, payload: id });
    }
    // history.push("/employee-leave");
  } catch (error) {
    alert(error);
  }
};

export const updateEmployeeLeave = (id, formValues) => async (dispatch) => {
  try {
    const response = await backend.patch(
      `api/hrm/employee-leave/${id}/`,
      formValues,
      getConfig()
    );
    if (response.status === 200) {
      dispatch({
        type: types.UPDATE_EMPLOYEE_LEAVE,
        payload: { ...response.data },
      });
      message.success("Updated Successfully");
    }

    // history.push("/employee-leave");
  } catch (error) {
    if (error.response.status === 401) {
      message.error("Permission Denied");
    } else {
      message.error("Bad Request");
    }
    alert(error.response);
  }
};
