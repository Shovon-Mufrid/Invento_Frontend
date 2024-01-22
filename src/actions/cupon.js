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

export const createCupon = (formValues) => async (dispatch) => {
  try {
    const response = await backend.post(
      "api/order/cupon/",
      { ...formValues },
      getConfig()
    );
    if (response.status === 201) {
      message.success(formValues["name"] + " Has been added");
      //   return response.data;
      // history.push("/cupons");
    }
  } catch (error) {
    alert(error);
  }
};

export const getAllCupon = () => async (dispatch) => {
  try {
    const response = await backend.get("api/order/cupon/", getConfig());
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteCupon = (id) => async (dispatch) => {
  try {
    const response = await backend.delete(
      `api/order/cupon/${id}/`,
      getConfig()
    );
    message.success("Sccessfully Removed");
    // history.push("/cupons");
  } catch (error) {
    console.log(error);
  }
};

export const updateCupon = (id, formValues) => async (dispatch) => {
  formValues["data"] = "";
  try {
    const response = await backend.patch(
      `api/order/cupon/${id}/`,
      formValues,
      getConfig()
    );
    message.success(formValues["name"] + " Has been Updated");
    // history.push("/cupons");
  } catch (error) {
    console.log(error.response);
  }
};

export const getCuponSearchResult = (data) => async (dispatch) => {
  try {
    const response = await backend.get(
      `api/order/cupon/?name=${data}`,
      getConfig()
    );

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    alert(error);
  }
};
