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

export const createproductionlinesitem = (formValues) => async (dispatch) => {
  formValues["data"] = "";
  try {
    const response = await backend.post(
      "api/manufacturing/productionlinesitem/",
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

export const getAllproductionlinesitem = () => async (dispatch) => {
  try {
    const response = await backend.get(
      "api/manufacturing/productionlinesitem/",
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getproductionlinesitembyfilter =
  (ProductionLine__id = "", Workorder__id = "", status = "") =>
  async (dispatch) => {
    try {
      const response = await backend.get(
        `api/manufacturing/productionlinesitem/?ProductionLine__id=${ProductionLine__id}&Workorder__id=${Workorder__id}&status=${status}`,
        getConfig()
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

export const getSpecificproductionlinesitem = (id) => async (dispatch) => {
  try {
    const response = await backend.get(
      `api/manufacturing/productionlinesitem/${id}/`,
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteproductionlinesitem = (id) => async (dispatch) => {
  try {
    const response = await backend.delete(
      `api/manufacturing/productionlinesitem/${id}/`,
      getConfig()
    );
    if (response.status === 204) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateproductionlinesitem =
  (id, formValues) => async (dispatch) => {
    formValues["data"] = "";
    try {
      const response = await backend.patch(
        `api/manufacturing/productionlinesitem/${id}/`,
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
