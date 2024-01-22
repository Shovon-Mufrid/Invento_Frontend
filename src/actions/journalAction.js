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

export const createjournals = (values) => async (dispatch) => {
  values["data"] = "";
  try {
    const response = await backend.post(
      "api/accounting/journals/",
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

export const getAlljournals = () => async (dispatch) => {
  try {
    const response = await backend.get("api/accounting/journals/", getConfig());
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAlljournalsPagination =
  (page = 1, page_size = 100) =>
  async (dispatch) => {
    try {
      const response = await backend.get(
        `api/accounting/journalsP/?&page=${page}&page_size=${page_size}`,
        getConfig()
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

export const getSpecificjournals = (id) => async (dispatch) => {
  try {
    const response = await backend.get(
      `api/accounting/journals/${id}/`,
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getJournalSearchResult =
  (
    keyward,
    start,
    end,
    account = "",
    code = "",
    invoice__invoice_number = "",
    purchasee__purchase_number = "",
    contact__phone = ""
  ) =>
  async (dispatch) => {
    try {
      const response = await backend.get(
        `api/accounting/journals/?keyward=${keyward}&start=${start}&end=${end}&account__id=${account}&code=${code}&invoice__invoice_number=${invoice__invoice_number}&purchasee__purchase_number=${purchasee__purchase_number}&phone=${contact__phone}`,
        getConfig()
      );

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      alert(error);
    }
  };

export const getJournalSearchResultwithinvoice =
  (
    keyward,
    start,
    end,
    account = "",
    code = "",
    invoice__invoice_number = "",
    purchasee__purchase_number = "",
    contact__phone = "",
    outlet = ""
  ) =>
  async (dispatch) => {
    try {
      const response = await backend.get(
        `api/accounting/journalswithinvoice/?keyward=${keyward}&start=${start}&end=${end}&account__id=${account}&code=${code}&invoice__invoice_number=${invoice__invoice_number}&purchasee__purchase_number=${purchasee__purchase_number}&phone=${contact__phone}&outlet=${outlet}`,
        getConfig()
      );

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      alert(error);
    }
  };

export const getPaymentMethods =
  (invoice__invoice_number = "") =>
  async (dispatch) => {
    try {
      const response = await backend.get(
        `api/accounting/journalswithinvoice/?invoice__invoice_number=${invoice__invoice_number}`,
        getConfig()
      );

      if (response.status === 200) {
        console.log(response.data);
        return response.data;
      }
    } catch (error) {
      alert(error);
    }
  };

export const getJournalSearchResultbyproduct =
  (keyward = "", product__id) =>
  async (dispatch) => {
    try {
      const response = await backend.get(
        `api/accounting/journals/?keyward=${keyward}&product__id=${product__id}`,
        getConfig()
      );

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      alert(error);
    }
  };

export const updatejournals = (id, formValues) => async (dispatch) => {
  try {
    const response = await backend.patch(
      `api/accounting/journals/${id}/`,
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

export const deletejournals = (id) => async (dispatch) => {
  try {
    const response = await backend.delete(
      `api/accounting/journals/${id}/`,
      getConfig()
    );
    if (response.status === 204) {
      message.success("Successfully Removed");
    }
  } catch (error) {
    console.log(error);
  }
};
