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

export const createOfficeLocation = (formValues) => async (dispatch) => {
  formValues["data"] = "";
  try {
    const response = await backend.post(
      "api/hrm/updateOfficeLocation/",
      { ...formValues },
      getConfig()
    );
    if (response.status === 201) {
      dispatch({
        type: types.CREATE_OFFICE_LOCATION,
        payload: { ...response.data },
      });
      message.success("Updated Successfully");
      // history.push("/department");
      return response;
    }
  } catch (error) {
    alert(error);
  }
};

export const getAllOfficeLocation = () => async (dispatch) => {
  try {
    const response = await backend.get("api/hrm/OfficeLocation/", getConfig());
    if (response.status === 200) {
      dispatch({
        type: types.GET_ALL_OFFICE_LOCATION,
        payload: response.data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteOfficeLocation = (id) => async (dispatch) => {
  try {
    const response = await backend.delete(
      `api/hrm/updateOfficeLocation/${id}/`,
      getConfig()
    );
    if (response.status === 204) {
      dispatch({ type: types.DELETE_OFFICE_LOCATION, payload: id });
      return response;
    }
    // history.push("/department");
  } catch (error) {
    alert(error);
  }
};

export const updateOfficeLocation = (id, formValues) => async (dispatch) => {
  try {
    const response = await backend.patch(
      `api/hrm/updateOfficeLocation/${id}/`,
      formValues,
      getConfig()
    );
    if (response.status === 200) {
      message.success("Updated Successfully");
      dispatch({
        type: types.UPDATE_OFFICE_LOCATION,
        payload: { ...response.data },
      });
      return response;
    }

    // history.push("/department");
  } catch (error) {
    alert(error.response);
  }
};
