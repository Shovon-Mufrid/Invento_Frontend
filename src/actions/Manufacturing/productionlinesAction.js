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

export const createproductionlines = (formValues) => async (dispatch) => {
  formValues["data"] = "";
  try {
    const response = await backend.post(
      "api/manufacturing/productionlines/",
      { ...formValues },
      getConfig()
    );
    if (response.status === 201) {
      return response.data;
    }
  } catch (error) {
    alert(error);
  }
};

export const getAllproductionlines = () => async (dispatch) => {
  try {
    const response = await backend.get(
      "api/manufacturing/productionlines/",
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getSpecificproductionlines = (id) => async (dispatch) => {
  try {
    const response = await backend.get(
      `api/manufacturing/productionlines/${id}/`,
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteproductionlines = (id) => async (dispatch) => {
  try {
    const response = await backend.delete(
      `api/manufacturing/productionlines/${id}/`,
      getConfig()
    );
    if (response.status === 204) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateproductionlines = (id, formValues) => async (dispatch) => {
  formValues["data"] = "";
  try {
    const response = await backend.patch(
      `api/manufacturing/productionlines/${id}/`,
      formValues,
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error.response);
  }
};
