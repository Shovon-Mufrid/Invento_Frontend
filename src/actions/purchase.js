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

//-------------------Purchase-----------------------------

export const createPurchase = (formValues) => async (dispatch) => {
  formValues["data"] = "";
  try {
    const response = await backend.post(
      "api/order/purchase/",
      formValues,
      getConfig()
    );
    if (response.status === 201) {
      message.success("Success");
      // history.push("/Purchase");
      return response.data;
    }
  } catch (error) {
    alert(error);
  }
};

export const getAllPurchase = () => async (dispatch) => {
  try {
    const response = await backend.get("api/order/purchase/", getConfig());
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
export const getAllPurchaseP =
  (pageno = 1, page_size = 100) =>
  async (dispatch) => {
    try {
      const response = await backend.get(
        `api/order/purchaseP/?page=${pageno}&page_size=${page_size}`,
        getConfig()
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };
export const getAllPurchaseByContact = (id) => async (dispatch) => {
  try {
    const response = await backend.get(
      `api/order/purchase/?contact__id=${id}`,
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
export const pendingPurchase = () => async (dispatch) => {
  try {
    const response = await backend.get(
      `api/order/purchase/?is_received=false`,
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const searchPurchase =
  (
    start,
    end,
    purchase_number,
    contact__id = "",
    location__id = "",
    keyward = ""
  ) =>
  async (dispatch) => {
    try {
      const response = await backend.get(
        `api/order/purchase/?start=${start}&end=${end}&purchase_number=${purchase_number}&contact__id=${contact__id}&location__id=${location__id}&keyward=${keyward}`,
        getConfig()
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };
export const searchPurchaseP =
  (
    start,
    end,
    purchase_number,
    contact__id,
    location__id,
    keyward,
    pageno = 1,
    page_size = 100
  ) =>
  async (dispatch) => {
    try {
      const response = await backend.get(
        `api/order/purchaseP/?start=${start}&end=${end}&purchase_number=${purchase_number}&contact__id=${contact__id}&location__id=${location__id}&keyward=${keyward}&page=${pageno}&page_size=${page_size}`,
        getConfig()
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };
export const updatePurchase = (id, formValues) => async (dispatch) => {
  try {
    const response = await backend.patch(
      `api/order/purchase/${id}/`,
      formValues,
      getConfig()
    );
    if (response.status === 200) {
      return true;
    }
  } catch (error) {
    console.log(error.response);
  }
};
export const deletePurchase = (id) => async (dispatch) => {
  try {
    const response = await backend.delete(
      `api/order/purchase/${id}/`,
      getConfig()
    );
    if (response.status === 204) {
      message.success("Successfully Removed");
    }
  } catch (error) {
    console.log(error);
  }
};

//-------------------Purchase item-----------------------------

export const createPurchaseItem = (formValues) => async (dispatch) => {
  try {
    const response = await backend.post(
      "api/order/purchaseitem/",
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
export const getPurchase = (id) => async (dispatch) => {
  try {
    const response = await backend.get(
      `api/order/purchaseitem/?purchase__id=${id}`,
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updatePurchaseItem = (id, formValues) => async (dispatch) => {
  try {
    const response = await backend.patch(
      `api/order/purchaseitem/${id}/`,
      formValues,
      getConfig()
    );
    if (response.status === 200) {
      return true;
    }
  } catch (error) {
    console.log(error.response);
  }
};
export const deletePurchaseItem = (id) => async (dispatch) => {
  try {
    const response = await backend.delete(
      `api/order/purchaseitem/${id}/`,
      getConfig()
    );
    if (response.status === 204) {
      message.success("Successfully Removed");
    }
  } catch (error) {
    console.log(error);
  }
};
