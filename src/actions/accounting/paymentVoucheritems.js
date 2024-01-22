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

export const createpaymentvoucheritem = (values) => async (dispatch) => {
  values["data"] = "";
  try {
    const response = await backend.post(
      "api/accounting/paymentvoucheritem/",
      values,
      getConfig()
    );
    if (response.status === 201) {
      message.success("Success");

      return true;
    }
  } catch (error) {
    alert(error);
    return false;
  }
};

export const getAllpaymentvoucheritem = () => async (dispatch) => {
  try {
    const response = await backend.get(
      "api/accounting/paymentvoucheritem/",
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
export const getAllpaymentvoucheritemByAccount =
  (account, start, end) => async (dispatch) => {
    try {
      const response = await backend.get(
        `api/accounting/paymentvoucheritem/?account__id=${account}&start=${start}&end=${end}`,
        getConfig()
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };
export const getSpecificpaymentvoucheritem = (id) => async (dispatch) => {
  try {
    const response = await backend.get(
      `api/accounting/paymentvoucheritem/${id}/`,
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updatepaymentvoucheritem =
  (id, formValues) => async (dispatch) => {
    try {
      const response = await backend.patch(
        `api/accounting/paymentvoucheritem/${id}/`,
        formValues,
        getConfig()
      );
      if (response.status === 200) {
        message.success("Successfully Updated");
        //   history.push("/accounting/paymentvoucher");
        return true;
      }
    } catch (error) {
      console.log(error.response);
    }
  };

export const deletepaymentvoucheritem = (id) => async (dispatch) => {
  try {
    const response = await backend.delete(
      `api/accounting/paymentvoucheritem/${id}/`,
      getConfig()
    );
    if (response.status === 204) {
      message.success("Successfully Removed");
    }
  } catch (error) {
    console.log(error);
  }
};
