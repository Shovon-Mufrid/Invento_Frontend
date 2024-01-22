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

export const createOfficeType = (formValues) => async (dispatch) => {
  formValues["data"] = "";
  try {
    const response = await backend.post(
      "api/hrm/OfficeType/",
      { ...formValues },
      getConfig()
    );
    if (response.status === 201) {
      dispatch({
        type: types.CREATE_OFFICE_TYPE,
        payload: { ...response.data },
      });
      message.success("Updated Successfully");
      // history.push("/department");
    }
  } catch (error) {
    alert(error);
  }
};

export const getAllOfficeType = () => async (dispatch) => {
  try {
    const response = await backend.get("api/hrm/OfficeType/", getConfig());
    if (response.status === 200) {
      dispatch({
        type: types.GET_ALL_OFFICE_TYPE,
        payload: response.data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteOfficeType = (id) => async (dispatch) => {
  try {
    const response = await backend.delete(
      `api/hrm/OfficeType/${id}/`,
      getConfig()
    );
    if (response.status === 204) {
      dispatch({ type: types.DELETE_OFFICE_TYPE, payload: id });
    }
    // history.push("/department");
  } catch (error) {
    alert(error);
  }
};

export const updateOfficeType = (id, formValues) => async (dispatch) => {
  try {
    const response = await backend.patch(
      `api/hrm/OfficeType/${id}/`,
      formValues,
      getConfig()
    );
    if (response.status === 200) {
      message.success("Updated Successfully");
      dispatch({
        type: types.UPDATE_OFFICE_TYPE,
        payload: { ...response.data },
      });
    }

    // history.push("/department");
  } catch (error) {
    alert(error.response);
  }
};
