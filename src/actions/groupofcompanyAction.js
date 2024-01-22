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

export const createGroupOfCompany = (formValues) => async (dispatch) => {
  formValues["data"] = "";
  try {
    const response = await backend.post(
      "api/hrm/GroupOfCompany/",
      { ...formValues },
      getConfig()
    );
    if (response.status === 201) {
      dispatch({
        type: types.CREATE_GroupOfCompany,
        payload: { ...response.data },
      });
      message.success("Updated Successfully");
      // history.push("/department");
    }
  } catch (error) {
    alert(error);
  }
};

export const getAllGroupOfCompany = () => async (dispatch) => {
  try {
    const response = await backend.get("api/hrm/GroupOfCompany/", getConfig());
    if (response.status === 200) {
      dispatch({
        type: types.GET_ALL_GroupOfCompany,
        payload: response.data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteGroupOfCompany = (id) => async (dispatch) => {
  try {
    const response = await backend.delete(
      `api/hrm/GroupOfCompany/${id}/`,
      getConfig()
    );
    if (response.status === 204) {
      dispatch({ type: types.DELETE_GroupOfCompany, payload: id });
    }
    // history.push("/department");
  } catch (error) {
    alert(error);
  }
};

export const updateGroupOfCompany = (id, formValues) => async (dispatch) => {
  try {
    const response = await backend.patch(
      `api/hrm/GroupOfCompany/${id}/`,
      formValues,
      getConfig()
    );
    if (response.status === 200) {
      message.success("Updated Successfully");
      dispatch({
        type: types.UPDATE_GroupOfCompany,
        payload: { ...response.data },
      });
    }

    // history.push("/department");
  } catch (error) {
    alert(error.response);
  }
};
