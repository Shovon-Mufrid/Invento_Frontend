import * as types from "../redux/types";
import backend from "../api/api";
import { store } from "../redux/store";

const getConfig = () => {
  const token = store.getState().auth.token;

  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  return config;
};

export const getAllCategory = () => async (dispatch) => {
  try {
    const response = await backend.get("api/product/category/", getConfig());
    if (response.status === 200) {
      dispatch({
        type: types.GET_ALL_CATEGORY,
        payload: response.data,
      });
    }
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getAllCategoryWithProduct = () => async (dispatch) => {
  try {
    const response = await backend.get(
      `api/product/categoryProduct/`,
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
export const getSingleCategoryWithProduct = (id) => async (dispatch) => {
  try {
    const response = await backend.get(
      `api/product/categoryProduct/${id}/`,
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
export const createCategory = (formValues) => async (dispatch) => {
  formValues["data"] = "";
  try {
    const response = await backend.post(
      "api/product/category/",
      { ...formValues },
      getConfig()
    );
    if (response.status === 201) {
      dispatch({
        type: types.CREATE_CATEGORY,
        payload: { ...response.data },
      });
      return response;
    }
  } catch (error) {
    return error;
  }
};
export const deleteCategory = (id) => async (dispatch) => {
  try {
    const response = await backend.delete(
      `api/product/category/${id}/`,
      getConfig()
    );
    if (response.status === 204) {
      dispatch({ type: types.DELETE_CATEGORY, payload: id });
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateCategory = (id, formValues) => async (dispatch) => {
  try {
    const response = await backend.patch(
      `api/product/updatecategory/${id}/`,
      formValues,
      getConfig()
    );
    if (response.status === 200) {
      dispatch({
        type: types.UPDATE_CATEGORY,
        payload: { ...response.data },
      });
    }
  } catch (error) {
    console.log(error.response);
  }
};
