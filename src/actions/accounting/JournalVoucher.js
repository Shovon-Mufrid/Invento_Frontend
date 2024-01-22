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

export const createjournalvoucher = (values) => async (dispatch) => {
  values["data"] = "";
  try {
    const response = await backend.post(
      "api/accounting/journalvoucher/",
      values,
      getConfig()
    );
    if (response.status === 201) {
      message.success("Success");
      //   history.push("/accounting/paymentvoucher");
      return response.data;
    }
  } catch (error) {
    alert(error);
    return false;
  }
};

export const getAlljournalvoucher = () => async (dispatch) => {
  try {
    const response = await backend.get(
      "api/accounting/journalvoucher/",
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
export const getAlljournalvoucherByAccount = (account) => async (dispatch) => {
  try {
    const response = await backend.get(
      `api/accounting/journalvoucher/?account__id=${account}`,
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getSpecificjournalvoucheritems = (id) => async (dispatch) => {
  try {
    const response = await backend.get(
      `api/accounting/journalvoucheritems/?journalvoucher__id=${id}`,
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getSpecificjournalvoucher = (id) => async (dispatch) => {
  try {
    const response = await backend.get(
      `api/accounting/journalvoucher/${id}/`,
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updatejournalvoucher = (id, formValues) => async (dispatch) => {
  try {
    const response = await backend.patch(
      `api/accounting/journalvoucher/${id}/`,
      formValues,
      getConfig()
    );
    if (response.status === 200) {
      message.success("Successfully Updated");
      // history.push("/accounting/journalvoucher");
      return true;
    }
  } catch (error) {
    console.log(error.response);
  }
};

export const deletejournalvoucher = (id) => async (dispatch) => {
  try {
    const response = await backend.delete(
      `api/accounting/journalvoucher/${id}/`,
      getConfig()
    );
    if (response.status === 204) {
      message.success("Successfully Removed");
    }
  } catch (error) {
    console.log(error);
  }
};
