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

export const createMeasurement = (formValues) => async (dispatch) => {
  try {
    const response = await backend.post(
      "api/order/measurement/",
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

export const getInvoiceMeasurement = (id) => async (dispatch) => {
  try {
    const response = await backend.get(
      `api/order/measurement/?invoice__id=${id}`,
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getInvoiceMeasurementAno = (id) => async (dispatch) => {
  try {
    const response = await backend.get(
      `api/order/measurement/?invoice__id=${id}`
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getSpecificMeasurement = (id) => async (dispatch) => {
  try {
    const response = await backend.get(
      `api/order/measurement/${id}/`,
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getSpecificMeasurementbycontact = (id) => async (dispatch) => {
  try {
    const response = await backend.get(
      `api/order/measurement/?contact__id=${id}&is_basic=true`,
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateMasurement = (id, formValues) => async (dispatch) => {
  formValues.data = "";
  try {
    const response = await backend.patch(
      `api/order/measurement/${id}/`,
      formValues,
      getConfig()
    );
    if (response.status === 200) {
      message.success("Successfully Updated");
      return true;
    }
  } catch (error) {
    console.log(error.response);
  }
};

export const deleteMeasurement = (id) => async (dispatch) => {
  try {
    const response = await backend.delete(
      `api/order/measurement/${id}/`,
      getConfig()
    );
    if (response.status === 204) {
      message.success("Successfully Removed");
    }
  } catch (error) {
    console.log(error);
  }
};
