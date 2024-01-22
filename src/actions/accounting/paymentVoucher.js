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

export const createpaymentVoucher = (values) => async (dispatch) => {
  values["data"] = "";
  try {
    const response = await backend.post(
      "api/accounting/paymentvoucher/",
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

export const getAllpaymentVoucher = () => async (dispatch) => {
  try {
    const response = await backend.get(
      "api/accounting/paymentvoucher/",
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
export const getAllpaymentVoucherByAccount = (account) => async (dispatch) => {
  try {
    const response = await backend.get(
      `api/accounting/paymentvoucher/?account__id=${account}`,
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
export const getSpecificPaymentVoucheritems = (id) => async (dispatch) => {
  try {
    const response = await backend.get(
      `api/accounting/paymentvoucheritem/?paymentvoucher__id=${id}`,
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getSpecificCpaymentVoucher = (id) => async (dispatch) => {
  try {
    const response = await backend.get(
      `api/accounting/paymentvoucher/${id}/`,
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updatepaymentVoucher = (id, formValues) => async (dispatch) => {
  try {
    const response = await backend.patch(
      `api/accounting/paymentvoucher/${id}/`,
      formValues,
      getConfig()
    );
    if (response.status === 200) {
      message.success("Successfully Updated");
      // history.push("/accounting/paymentvoucher");
      return true;
    }
  } catch (error) {
    console.log(error.response);
  }
};

export const deletepaymentVoucher = (id) => async (dispatch) => {
  try {
    const response = await backend.delete(
      `api/accounting/paymentvoucher/${id}/`,
      getConfig()
    );
    if (response.status === 204) {
      message.success("Successfully Removed");
    }
  } catch (error) {
    console.log(error);
  }
};
