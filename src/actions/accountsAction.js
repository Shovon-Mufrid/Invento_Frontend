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

export const createAccount = (values) => async (dispatch) => {
  values["data"] = "";
  try {
    const response = await backend.post(
      "api/accounting/accounts/",
      values,
      getConfig()
    );
    if (response.status === 201) {
      message.success("Success");
      // history.push("/accounting/accounts");
      return true;
    }
  } catch (error) {
    alert(error);
    return false;
  }
};

export const getAllAccount = () => async (dispatch) => {
  try {
    const response = await backend.get("api/accounting/accounts/", getConfig());
    if (response.status === 200) {
      dispatch({
        type: types.GET_ALL_ACCOUNT,
        payload: response.data,
      });
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getSpecificAccount = (id) => async (dispatch) => {
  try {
    const response = await backend.get(
      `api/accounting/accounts/${id}/`,
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateAccount = (id, formValues) => async (dispatch) => {
  try {
    const response = await backend.patch(
      `api/accounting/accounts/${id}/`,
      formValues,
      getConfig()
    );
    if (response.status === 200) {
      message.success("Successfully Updated");
      // history.push("/accounting/accounts");
      return true;
    }
  } catch (error) {
    console.log(error.response);
  }
};

export const deleteAccount = (id) => async (dispatch) => {
  try {
    const response = await backend.delete(
      `api/accounting/accounts/${id}/`,
      getConfig()
    );
    if (response.status === 204) {
      message.success("Successfully Removed");
    }
  } catch (error) {
    console.log(error);
  }
};
