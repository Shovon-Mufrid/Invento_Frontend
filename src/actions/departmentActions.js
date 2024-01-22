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

export const createDepartment = (formValues) => async (dispatch) => {
  formValues["data"] = "";
  try {
    const response = await backend.post(
      "api/hrm/Department/",
      { ...formValues },
      getConfig()
    );
    if (response.status === 201) {
      dispatch({
        type: types.CREATE_DEPARTMENT,
        payload: { ...response.data },
      });
      message.success("Updated Successfully");
      // history.push("/department");
    }
  } catch (error) {
    alert(error);
  }
};

export const getAllDepartment = () => async (dispatch) => {
  try {
    const response = await backend.get("api/hrm/Department/", getConfig());
    if (response.status === 200) {
      dispatch({
        type: types.GET_ALL_DEPARTMENT,
        payload: response.data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteDepartment = (id) => async (dispatch) => {
  try {
    const response = await backend.delete(
      `api/hrm/Department/${id}/`,
      getConfig()
    );
    if (response.status === 204) {
      dispatch({ type: types.DELETE_DEPARTMENT, payload: id });
    }
    // history.push("/department");
  } catch (error) {
    alert(error);
  }
};

export const updateDepartment = (id, formValues) => async (dispatch) => {
  try {
    const response = await backend.patch(
      `api/hrm/Department/${id}/`,
      formValues,
      getConfig()
    );
    if (response.status === 200) {
      dispatch({
        type: types.UPDATE_DEPARTMENT,
        payload: { ...response.data },
      });
    }
    message.success("Updated Successfully");
    // history.push("/department");
  } catch (error) {
    alert(error.response);
  }
};
