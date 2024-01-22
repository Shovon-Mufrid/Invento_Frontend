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

export const createpettycashTransfer = (formValues) => async (dispatch) => {
  try {
    const response = await backend.post(
      "api/accounting/pettycash_transfer/",
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

export const getAllpettycashTransfer = () => async (dispatch) => {
  try {
    const response = await backend.get(
      "api/accounting/pettycash_transfer/",
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getSpecificpettycashTransfer = (id) => async (dispatch) => {
  try {
    const response = await backend.get(
      `api/accounting/pettycash_transfer/${id}/`,
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const deletepettycashTransfer = (id) => async (dispatch) => {
  try {
    const response = await backend.delete(
      `api/accounting/pettycash_transfer/${id}/`,
      getConfig()
    );
    if (response.status === 204) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updatepettycashTransfer = (id, formValues) => async (dispatch) => {
  formValues["data"] = "";
  try {
    const response = await backend.patch(
      `api/accounting/pettycash_transfer/${id}/`,
      formValues,
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
    message.success("Updated");
  } catch (error) {
    console.log(error.response);
  }
};

export const getpettycashTransferSearchResult =
  (
    keyward,
    location__id = "",
    account__id = "",
    collect_cash = "",
    add_cash = ""
  ) =>
  async (dispatch) => {
    try {
      const response = await backend.get(
        `api/accounting/pettycash_transfer/?keyward=${keyward}&location__id=${location__id}&account__id=${account__id}&collect_cash=${collect_cash}&add_cash=${add_cash}`,
        getConfig()
      );

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      alert(error);
    }
  };
