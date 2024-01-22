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

export const createmanufacturingCost = (formValues) => async (dispatch) => {
  formValues["data"] = "";
  try {
    const response = await backend.post(
      "api/manufacturing/cost/",
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

export const getAllmanufacturingCost = () => async (dispatch) => {
  try {
    const response = await backend.get("api/manufacturing/cost/", getConfig());
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllmanufacturingCostbyfilter =
  (ProductionLine__id = "", ProductionLine_item__id = "") =>
  async (dispatch) => {
    try {
      const response = await backend.get(
        `api/manufacturing/cost/?ProductionLine__id=${ProductionLine__id}&ProductionLine_item__id=${ProductionLine_item__id}`,
        getConfig()
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

export const getSpecificmanufacturingCost = (id) => async (dispatch) => {
  try {
    const response = await backend.get(
      `api/manufacturing/cost/${id}/`,
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const deletemanufacturingCost = (id) => async (dispatch) => {
  try {
    const response = await backend.delete(
      `api/manufacturing/cost/${id}/`,
      getConfig()
    );
    if (response.status === 204) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updatemanufacturingCost = (id, formValues) => async (dispatch) => {
  formValues["data"] = "";
  try {
    const response = await backend.patch(
      `api/manufacturing/cost/${id}/`,
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
