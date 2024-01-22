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

export const createChartofaccounts = (values) => async (dispatch) => {
  values["data"] = "";
  try {
    const response = await backend.post(
      "api/accounting/chartofaccounts/",
      values,
      getConfig()
    );
    if (response.status === 201) {
      message.success("Success");
      // history.push("/accounting/chartofaccounts");
      return true;
    }
  } catch (error) {
    alert(error);
    return false;
  }
};

export const getAllChartofaccounts = () => async (dispatch) => {
  try {
    const response = await backend.get(
      "api/accounting/chartofaccounts/",
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getSpecificChartofaccounts = (id) => async (dispatch) => {
  try {
    const response = await backend.get(
      `api/accounting/chartofaccounts/${id}/`,
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getSpecificChartofaccountsbycode = (code) => async (dispatch) => {
  try {
    const response = await backend.get(
      `api/accounting/chartofaccounts/?account_code=${code}`,
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateChartofaccounts = (id, formValues) => async (dispatch) => {
  try {
    const response = await backend.patch(
      `api/accounting/chartofaccounts/${id}/`,
      formValues,
      getConfig()
    );
    if (response.status === 200) {
      message.success("Successfully Updated");
      // history.push("/accounting/chartofaccounts");
      return true;
    }
  } catch (error) {
    console.log(error.response);
  }
};

export const deleteChartofaccounts = (id) => async (dispatch) => {
  try {
    const response = await backend.delete(
      `api/accounting/chartofaccounts/${id}/`,
      getConfig()
    );
    if (response.status === 204) {
      message.success("Successfully Removed");
    }
  } catch (error) {
    console.log(error);
  }
};
