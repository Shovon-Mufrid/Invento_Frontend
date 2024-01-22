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

export const createUserRole = (formValues) => async (dispatch) => {
  formValues["data"] = "";
  try {
    const response = await backend.post(
      "api/hrm/Designation/",
      { ...formValues },
      getConfig()
    );
    if (response.status === 201) {
      dispatch({
        type: types.CREATE_USER_ROLE,
        payload: { ...response.data },
      });
      message.success("Updated Successfully");
      // history.push("/user-role");
    }
  } catch (error) {
    alert(error);
  }
};

export const getAllUserRole = () => async (dispatch) => {
  try {
    const Rank = store.getState().auth.profile.Rank;
    const response = await backend.get(
      `api/hrm/Designation/?rank=${Rank}`,
      getConfig()
    );
    if (response.status === 200) {
      dispatch({
        type: types.GET_ALL_USER_ROLE,
        payload: response.data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteUserRole = (id) => async (dispatch) => {
  try {
    const response = await backend.delete(
      `api/hrm/Designation/${id}/`,
      getConfig()
    );
    if (response.status === 204) {
      dispatch({ type: types.DELETE_USER_ROLE, payload: id });
    }
    // history.push("/user-role");
  } catch (error) {
    alert(error);
  }
};

export const updateUserRole = (id, formValues) => async (dispatch) => {
  try {
    const response = await backend.patch(
      `api/hrm/Designation/${id}/`,
      formValues,
      getConfig()
    );
    if (response.status === 200) {
      dispatch({ type: types.UPDATE_USER_ROLE, payload: { ...response.data } });
    }
    message.success("Updated Successfully");
    // history.push("/user-role");
  } catch (error) {
    alert(error.response);
  }
};
