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

export const createWorkorder = (formValues) => async (dispatch) => {
  formValues["data"] = "";
  try {
    const response = await backend.post(
      "api/manufacturing/workorders/",
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

export const getAllWorkorder = () => async (dispatch) => {
  try {
    const response = await backend.get(
      "api/manufacturing/workorders/",
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllWorkorderbyfilter =
  (order_name = "", order_number = "", status = "") =>
  async (dispatch) => {
    try {
      const response = await backend.get(
        `api/manufacturing/workorders/?order_name=${order_name}&order_number=${order_number}&status=${status}`,
        getConfig()
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

export const getSpecificWorkorder = (id) => async (dispatch) => {
  try {
    const response = await backend.get(
      `api/manufacturing/workorders/${id}/`,
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteWorkorder = (id) => async (dispatch) => {
  try {
    const response = await backend.delete(
      `api/manufacturing/workorders/${id}/`,
      getConfig()
    );
    if (response.status === 204) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateWorkorder = (id, formValues) => async (dispatch) => {
  formValues["data"] = "";
  try {
    const response = await backend.patch(
      `api/manufacturing/workorders/${id}/`,
      formValues,
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
    // message.success(formValues["name"] + " Has been Updated");
  } catch (error) {
    console.log(error.response);
  }
};
