import * as types from "../redux/types";
import backend from "../api/api";
import { store } from "../redux/store";
import { createProduct, updateProduct } from "./productDetails";

const getConfig = () => {
  const token = store.getState().auth.token;

  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  return config;
};

export const createSingleProduct = (formValues) => async (dispatch) => {
  // const formData = new FormData();
  formValues["slug"] =
    formValues.title.split(" ").join("_") + "_" + formValues.Category;
  try {
    const response = await backend.post(
      "api/product/singpleproduct/",
      { ...formValues },
      getConfig()
    );
    if (response.status === 201) {
      dispatch({
        type: types.CREATE_SINGLE_PRODUCT,
        payload: { ...response.data },
      });
      formValues["ref_type"] = "S";
      formValues["ProductDetails"] = response.data.id;
      console.log(formValues);
      dispatch(createProduct(formValues));
    }
  } catch (error) {
    console.log(error);
  }
};

export const getSingleProduct = () => async (dispatch) => {
  try {
    const response = await backend.get(
      "api/product/singpleproduct/",
      getConfig()
    );
    if (response.status === 200) {
      dispatch({
        type: types.GET_ALL_SINGLE_PRODUCT,
        payload: response.data,
      });
    }
  } catch (error) {
    console.log(error.response);
  }
};

export const getSingleProductbystatus =
  (
    status,
    keyward = "",
    parentCategory = "",
    color = "",
    size = "",
    page = 1,
    page_size = 10
  ) =>
  async (dispatch) => {
    try {
      const response = await backend.get(
        `api/product/singpleproduct/?is_active=${status}&keyward=${keyward}&parentCategory=${parentCategory}&color=${color}&size=${size}&page=${page}&page_size=${page_size}`,
        getConfig()
      );
      if (response.status === 200) {
        dispatch({
          type: types.GET_ALL_SINGLE_PRODUCT,
          payload: response.data,
        });
        return response.data;
      }
    } catch (error) {
      console.log(error.response);
    }
  };

export const getspecificSingleProduct = (id) => async (dispatch) => {
  try {
    const response = await backend.get(
      `api/product/singpleproduct/${id}/`,
      getConfig()
    );
    if (response.status === 200) {
      dispatch({
        type: types.GET_SPECIFIC_SINGLE_PRODUCT,
        payload: response.data,
      });
      return response.data;
    }
  } catch (error) {
    console.log(error.response);
  }
};

export const getspecificSingleProductbyname = (id) => async (dispatch) => {
  try {
    const response = await backend.get(
      `api/product/singpleproduct/?title=${id}`,
      getConfig()
    );
    if (response.status === 200) {
      dispatch({
        type: types.GET_SPECIFIC_SINGLE_PRODUCT,
        payload: response.data,
      });
      return response.data;
    }
  } catch (error) {
    console.log(error.response);
  }
};

export const updateSingleProduct = (id, formValues) => async (dispatch) => {
  if (formValues.title && formValues.Category) {
    formValues["slug"] =
      formValues.title.split(" ").join("_") + "_" + formValues.Category;
  }
  try {
    const response = await backend.patch(
      `api/product/singpleproduct/${id}/`,
      formValues,
      getConfig()
    );
    if (response.status === 200) {
      dispatch({
        type: types.UPDATE_SINGLE_PRODUCT,
        payload: { ...response.data },
      });
      // history.push("/product");
    }
  } catch (error) {
    console.log(error.response);
  }
};
