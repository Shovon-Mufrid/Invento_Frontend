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

export const createWorkorderitem = (formValues) => async (dispatch) => {
  formValues["data"] = "";
  try {
    const response = await backend.post(
      "api/manufacturing/workordersitem/",
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

export const getAllWorkorderitem = () => async (dispatch) => {
  try {
    const response = await backend.get(
      "api/manufacturing/workordersitem/",
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllWorkorderitembyfilter =
  (Workorder__id = "") =>
  async (dispatch) => {
    try {
      const response = await backend.get(
        `api/manufacturing/workordersitem/?Workorder__id=${Workorder__id}`,
        getConfig()
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

export const getSpecificWorkorderitem = (id) => async (dispatch) => {
  try {
    const response = await backend.get(
      `api/manufacturing/workordersitem/${id}/`,
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteWorkorderitem = (id) => async (dispatch) => {
  try {
    const response = await backend.delete(
      `api/manufacturing/workordersitem/${id}/`,
      getConfig()
    );
    if (response.status === 204) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateWorkorderitem = (id, formValues) => async (dispatch) => {
  formValues["data"] = "";
  try {
    const response = await backend.patch(
      `api/manufacturing/workordersitem/${id}/`,
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
