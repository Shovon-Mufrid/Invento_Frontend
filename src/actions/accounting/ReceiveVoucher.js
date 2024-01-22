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

export const createreceivevoucherr = (values) => async (dispatch) => {
  values["data"] = "";
  try {
    const response = await backend.post(
      "api/accounting/receivevoucher/",
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

export const getAllreceivevoucher = () => async (dispatch) => {
  try {
    const response = await backend.get(
      "api/accounting/receivevoucher/",
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
export const getAllreceivevoucherByAccount = (account) => async (dispatch) => {
  try {
    const response = await backend.get(
      `api/accounting/receivevoucher/?account__id=${account}`,
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
export const getSpecificreceivevoucheritems = (id) => async (dispatch) => {
  try {
    const response = await backend.get(
      `api/accounting/receivevoucheritems/?receivevoucher__id=${id}`,
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getSpecificCreceivevoucher = (id) => async (dispatch) => {
  try {
    const response = await backend.get(
      `api/accounting/receivevoucher/${id}/`,
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updatereceivevoucher = (id, formValues) => async (dispatch) => {
  try {
    const response = await backend.patch(
      `api/accounting/receivevoucher/${id}/`,
      formValues,
      getConfig()
    );
    if (response.status === 200) {
      message.success("Successfully Updated");
      // history.push("/accounting/receivevoucher");
      return true;
    }
  } catch (error) {
    console.log(error.response);
  }
};

export const deletereceivevoucher = (id) => async (dispatch) => {
  try {
    const response = await backend.delete(
      `api/accounting/receivevoucher/${id}/`,
      getConfig()
    );
    if (response.status === 204) {
      message.success("Successfully Removed");
    }
  } catch (error) {
    console.log(error);
  }
};
