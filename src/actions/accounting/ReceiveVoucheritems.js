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

export const createreceivevoucheritems = (values) => async (dispatch) => {
  values["data"] = "";
  try {
    const response = await backend.post(
      "api/accounting/receivevoucheritems/",
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

export const getAllreceivevoucheritems = () => async (dispatch) => {
  try {
    const response = await backend.get(
      "api/accounting/receivevoucheritems/",
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
export const getAllreceivevoucheritemsByAccount =
  (account, start, end) => async (dispatch) => {
    try {
      const response = await backend.get(
        `api/accounting/receivevoucheritems/?account__id=${account}&start=${start}&end=${end}`,
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
      `api/accounting/receivevoucheritems/${id}/`,
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updatereceivevoucheritems =
  (id, formValues) => async (dispatch) => {
    try {
      const response = await backend.patch(
        `api/accounting/receivevoucheritems/${id}/`,
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

export const deletereceivevoucheritems = (id) => async (dispatch) => {
  try {
    const response = await backend.delete(
      `api/accounting/receivevoucheritems/${id}/`,
      getConfig()
    );
    if (response.status === 204) {
      message.success("Successfully Removed");
    }
  } catch (error) {
    console.log(error);
  }
};
