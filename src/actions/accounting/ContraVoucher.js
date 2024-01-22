import * as types from "../../redux/types";
import backend from "../../api/api";
import { store } from "../../redux/store";

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

export const createcontravoucher = (values) => async (dispatch) => {
  values["data"] = "";
  try {
    const response = await backend.post(
      "api/accounting/contravoucher/",
      values,
      getConfig()
    );
    if (response.status === 201) {
      message.success("Success");
      //   history.push("/accounting/paymentvoucher");
      return response.data;
    }
  } catch (error) {
    alert(error);
    return false;
  }
};

export const getAllcontravoucher = () => async (dispatch) => {
  try {
    const response = await backend.get(
      "api/accounting/contravoucher/",
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
export const getAllcontravoucherByAccount = (account) => async (dispatch) => {
  try {
    const response = await backend.get(
      `api/accounting/contravoucher/?account__id=${account}`,
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getSpecificcontravoucheritems = (id) => async (dispatch) => {
  try {
    const response = await backend.get(
      `api/accounting/contravoucheritems/?contravoucher__id=${id}`,
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getSpecificcontravoucher = (id) => async (dispatch) => {
  try {
    const response = await backend.get(
      `api/accounting/contravoucher/${id}/`,
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updatecontravoucher = (id, formValues) => async (dispatch) => {
  try {
    const response = await backend.patch(
      `api/accounting/contravoucher/${id}/`,
      formValues,
      getConfig()
    );
    if (response.status === 200) {
      message.success("Successfully Updated");
      // history.push("/accounting/contravoucher");
      return true;
    }
  } catch (error) {
    console.log(error.response);
  }
};

export const deletecontravoucher = (id) => async (dispatch) => {
  try {
    const response = await backend.delete(
      `api/accounting/contravoucher/${id}/`,
      getConfig()
    );
    if (response.status === 204) {
      message.success("Successfully Removed");
    }
  } catch (error) {
    console.log(error);
  }
};
