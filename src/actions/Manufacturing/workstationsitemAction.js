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

export const createworkstationsitem = (formValues) => async (dispatch) => {
  formValues["data"] = "";
  try {
    const response = await backend.post(
      "api/manufacturing/workstationsitem/",
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

export const getAllworkstationsitem = () => async (dispatch) => {
  try {
    const response = await backend.get(
      "api/manufacturing/workstationsitem/",
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getSpecificworkstationsitem = (id) => async (dispatch) => {
  try {
    const response = await backend.get(
      `api/manufacturing/workstationsitem/${id}/`,
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteworkstationsitem = (id) => async (dispatch) => {
  try {
    const response = await backend.delete(
      `api/manufacturing/workstationsitem/${id}/`,
      getConfig()
    );
    if (response.status === 204) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateworkstationsitem = (id, formValues) => async (dispatch) => {
  formValues["data"] = "";
  try {
    const response = await backend.patch(
      `api/manufacturing/workstationsitem/${id}/`,
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
