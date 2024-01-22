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

export const createWordrobe = (formValues) => async (dispatch) => {
  formValues["data"] = "";
  try {
    const response = await backend.post(
      "api/order/wordrobe/",
      formValues,
      getConfig()
    );
    if (response.status === 201) {
      message.success("Success");
      // history.push("/wordrobe");
      return response.data;
    }
  } catch (error) {
    alert(error);
  }
};

export const getAllWordrobe = () => async (dispatch) => {
  try {
    const response = await backend.get("api/order/wordrobe/", getConfig());
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateWordrobe = (id, formValues) => async (dispatch) => {
  try {
    const response = await backend.patch(
      `api/order/wordrobe/${id}/`,
      formValues,
      getConfig()
    );
    if (response.status === 200) {
      // history.push("/wordrobe");
      return true;
    }
  } catch (error) {
    console.log(error.response);
  }
};

export const deleteWordrobe = (id) => async (dispatch) => {
  try {
    const response = await backend.delete(
      `api/order/wordrobe/${id}/`,
      getConfig()
    );
    if (response.status === 204) {
      message.success("Successfully Removed");
    }
  } catch (error) {
    console.log(error);
  }
};

export const createWordrobeItem = (formValues) => async (dispatch) => {
  try {
    const response = await backend.post(
      "api/order/wordrobeitem/",
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
export const getWordrobeItem = (id) => async (dispatch) => {
  try {
    const response = await backend.get(
      `api/order/wordrobeitem/?wordrobe__id=${id}`,
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getWordrobeItem_not_returned =
  (id = "") =>
  async (dispatch) => {
    try {
      const response = await backend.get(
        `api/order/wordrobeitem/?keyward=${id}&is_returned=false`,
        getConfig()
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

export const getWordrobeItemP_not_returned =
  (id = "", pageno = 1, page_size = 100) =>
  async (dispatch) => {
    try {
      const response = await backend.get(
        `api/order/wordrobeitemP/?keyward=${id}&is_returned=false&page=${pageno}&page_size=${page_size}`,
        getConfig()
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };
export const updateWordrobeItem = (id, formValues) => async (dispatch) => {
  try {
    const response = await backend.patch(
      `api/order/wordrobeitem/${id}/`,
      formValues,
      getConfig()
    );
    if (response.status === 200) {
      // history.push("/wordrobe");
      return true;
    }
  } catch (error) {
    console.log(error.response);
  }
};
export const deleteWordrobeItem = (id) => async (dispatch) => {
  try {
    const response = await backend.delete(
      `api/order/wordrobeitem/${id}/`,
      getConfig()
    );
    if (response.status === 204) {
      message.success("Successfully Removed");
    }
  } catch (error) {
    console.log(error);
  }
};
