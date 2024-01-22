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

export const createjournalvoucheritems = (values) => async (dispatch) => {
  values["data"] = "";
  try {
    const response = await backend.post(
      "api/accounting/journalvoucheritems/",
      values,
      getConfig()
    );
    if (response.status === 201) {
      message.success("Success");

      return true;
    }
  } catch (error) {
    alert(error);
    return false;
  }
};

export const getAlljournalvoucheritems = () => async (dispatch) => {
  try {
    const response = await backend.get(
      "api/accounting/journalvoucheritems/",
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
export const getAlljournalvoucheritemsByAccount =
  (account, start, end) => async (dispatch) => {
    try {
      const response = await backend.get(
        `api/accounting/journalvoucheritems/?account__id=${account}&start=${start}&end=${end}`,
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
      `api/accounting/journalvoucheritems/${id}/`,
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updatejournalvoucheritems =
  (id, formValues) => async (dispatch) => {
    try {
      const response = await backend.patch(
        `api/accounting/journalvoucheritems/${id}/`,
        formValues,
        getConfig()
      );
      if (response.status === 200) {
        message.success("Successfully Updated");
        //   history.push("/accounting/paymentvoucher");
        return true;
      }
    } catch (error) {
      console.log(error.response);
    }
  };

export const deletejournalvoucheritems = (id) => async (dispatch) => {
  try {
    const response = await backend.delete(
      `api/accounting/journalvoucheritems/${id}/`,
      getConfig()
    );
    if (response.status === 204) {
      message.success("Successfully Removed");
    }
  } catch (error) {
    console.log(error);
  }
};
