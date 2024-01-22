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

export const createpettycash = (formValues) => async (dispatch) => {
  try {
    const response = await backend.post(
      "api/accounting/pettycash/",
      { ...formValues },
      getConfig()
    );
    if (response.status === 201) {
      dispatch({
        type: types.CREATE_PETTY_CASH,
        payload: { ...response.data },
      });
      message.success("Successfully Created");
      return response.data;
    }
  } catch (error) {
    alert(error);
  }
};

export const getAllpettycash = () => async (dispatch) => {
  try {
    const response = await backend.get(
      "api/accounting/pettycash/",
      getConfig()
    );
    if (response.status === 200) {
      dispatch({
        type: types.GET_ALL_PETTY_CASH,
        payload: response.data,
      });
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getSpecificpettycash = (id) => async (dispatch) => {
  try {
    const response = await backend.get(
      `api/accounting/pettycash/${id}/`,
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const deletepettycash = (id) => async (dispatch) => {
  try {
    const response = await backend.delete(
      `api/accounting/pettycash/${id}/`,
      getConfig()
    );
    if (response.status === 204) {
      dispatch({ type: types.DELETE_PETTY_CASH, payload: id });
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updatepettycash = (id, formValues) => async (dispatch) => {
  formValues["data"] = "";
  try {
    const response = await backend.patch(
      `api/accounting/pettycash/${id}/`,
      formValues,
      getConfig()
    );
    if (response.status === 200) {
      dispatch({
        type: types.UPDATE_PETTY_CASH,
        payload: { ...response.data },
      });
    }
    message.success("Updated");
  } catch (error) {
    console.log(error.response);
  }
};

export const getpettycashSearchResult =
  (keyward, location__id) => async (dispatch) => {
    try {
      const response = await backend.get(
        `api/accounting/pettycash/?keyward=${keyward}&location__id=${location__id}`,
        getConfig()
      );

      if (response.status === 200) {
        dispatch({
          type: types.GET_PETTY_CASH_SEARCH_RESULT,
          payload: response.data,
        });
        return response.data;
      }
    } catch (error) {
      alert(error);
    }
  };
