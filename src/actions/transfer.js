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

export const createTransfer = (formValues) => async (dispatch) => {
  formValues["data"] = "";
  try {
    const response = await backend.post(
      "api/product/transfer/",
      formValues,
      getConfig()
    );
    if (response.status === 201) {
      message.success("Success");
      // history.push("/stock/transfer");
      return response.data;
    }
  } catch (error) {
    alert(error);
  }
};

export const getAllTransfer = () => async (dispatch) => {
  try {
    const response = await backend.get("api/product/transfer/", getConfig());
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllTransfer_not_Received = () => async (dispatch) => {
  try {
    const response = await backend.get(
      "api/product/transfer/?status=Processing",
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateTransfer = (id, formValues) => async (dispatch) => {
  try {
    const response = await backend.patch(
      `api/product/transfer/${id}/`,
      formValues,
      getConfig()
    );
    if (response.status === 200) {
      // history.push("/stock/transfer/history");
      return true;
    }
  } catch (error) {
    console.log(error.response);
  }
};

export const deleteTransfer = (id) => async (dispatch) => {
  try {
    const response = await backend.delete(
      `api/product/transfer/${id}/`,
      getConfig()
    );
    if (response.status === 204) {
      message.success("Successfully Removed");
    }
  } catch (error) {
    console.log(error);
  }
};

export const createTransferItem = (formValues) => async (dispatch) => {
  try {
    const response = await backend.post(
      "api/product/transferitem/",
      formValues,
      getConfig()
    );
    if (response.status === 201) {
      console.log(response);
    }
  } catch (error) {
    alert(error);
  }
};
export const getTransferItem = (id) => async (dispatch) => {
  try {
    const response = await backend.get(
      `api/product/transferitem/?transfer__id=${id}`,
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getTransferItem_not_returned = (id) => async (dispatch) => {
  try {
    const response = await backend.get(
      `api/product/transferitem/?transfer__id=${id}&is_returned=false`,
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateTransferItem = (id, formValues) => async (dispatch) => {
  try {
    const response = await backend.patch(
      `api/product/transferitem/${id}/`,
      formValues,
      getConfig()
    );
    if (response.status === 200) {
      // history.push("/stock/transfer");
      return true;
    }
  } catch (error) {
    console.log(error.response);
  }
};
export const deleteTransferItem = (id) => async (dispatch) => {
  try {
    const response = await backend.delete(
      `api/product/transferitem/${id}/`,
      getConfig()
    );
    if (response.status === 204) {
      // message.success("Successfully Removed");
    }
  } catch (error) {
    console.log(error);
  }
};
