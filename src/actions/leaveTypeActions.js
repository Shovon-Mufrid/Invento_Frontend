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

export const createLeaveType = (formValues) => async (dispatch) => {
  formValues["data"] = "";
  try {
    const response = await backend.post(
      "api/hrm/leave-type/",
      { ...formValues },
      getConfig()
    );
    if (response.status === 201) {
      dispatch({
        type: types.CREATE_LEAVE_TYPE,
        payload: { ...response.data },
      });
      message.success(
        formValues["name"] + " Has been added to your Leave Type list"
      );
      // history.push("/leave-type");
    }
  } catch (error) {
    alert(error);
  }
};

export const getAllLeaveType = () => async (dispatch) => {
  try {
    const response = await backend.get("api/hrm/leave-type/", getConfig());
    if (response.status === 200) {
      dispatch({
        type: types.GET_ALL_LEAVE_TYPE,
        payload: response.data,
      });
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteLeaveType = (id) => async (dispatch) => {
  try {
    const response = await backend.delete(
      `api/hrm/leave-type/${id}/`,
      getConfig()
    );
    if (response.status === 204) {
      dispatch({ type: types.DELETE_LEAVE_TYPE, payload: id });
    }
    // history.push("/leave-type");
  } catch (error) {
    alert(error);
  }
};

export const updateLeaveType = (id, formValues) => async (dispatch) => {
  try {
    const response = await backend.patch(
      `api/hrm/leave-type/${id}/`,
      formValues,
      getConfig()
    );
    if (response.status === 200) {
      dispatch({
        type: types.UPDATE_LEAVE_TYPE,
        payload: { ...response.data },
      });
    }
    // history.push("/leave-type");
    message.success(formValues["name"] + " Has been Updated");
  } catch (error) {
    alert(error.response);
  }
};
