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

export const createAttribute = (formValues) => async (dispatch) => {
  formValues["data"] = "";
  try {
    const response = await backend.post(
      "api/product/attribute/",
      { ...formValues },
      getConfig()
    );
    if (response.status === 201) {
      dispatch({
        type: types.CREATE_ATTRIBUTE,
        payload: { ...response.data },
      });
      // history.push("/product/attribute");
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllAttribute = () => async (dispatch) => {
  try {
    const response = await backend.get("api/product/attribute/", getConfig());
    if (response.status === 200) {
      dispatch({
        type: types.GET_ALL_ATTRIBUTE,
        payload: response.data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// export const getSpecificAttribute = () => async (dispatch) => {
//   try {
//     const response = await backend.get(`product/attribute/`, getConfig());
//     if (response.status === 200) {
//       dispatch({
//         type: types.GET_SPECIFIC_ATTRIBUTE,
//         payload: response.data,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

export const deleteAttribute = (id) => async (dispatch) => {
  try {
    const response = await backend.delete(
      `api/product/attribute/${id}/`,
      getConfig()
    );
    if (response.status === 204) {
      dispatch({ type: types.DELETE_ATTRIBUTE, payload: id });
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateAttribute = (id, formValues) => async (dispatch) => {
  try {
    const response = await backend.patch(
      `api/product/attribute/${id}/`,
      formValues,
      getConfig()
    );
    if (response.status === 200) {
      dispatch({ type: types.UPDATE_ATTRIBUTE, payload: { ...response.data } });
    }
  } catch (error) {
    console.log(error.response);
  }
};

export const createAttributeTerm =
  (formValues, attributeid) => async (dispatch) => {
    formValues["data"] = "";
    formValues.Attribute = attributeid;
    try {
      const response = await backend.post(
        "api/product/term/",
        { ...formValues },
        getConfig()
      );
      if (response.status === 201) {
        dispatch({
          type: types.CREATE_ATTRIBUTE_TERM,
          payload: { ...response.data },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
export const deleteAttributeTerm = (id) => async (dispatch) => {
  try {
    const response = await backend.delete(
      `api/product/term/${id}/`,
      getConfig()
    );
    if (response.status === 204) {
      dispatch({ type: types.DELETE_ATTRIBUTE_TERM, payload: id });
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateAttributeTerm = (id, formValues) => async (dispatch) => {
  try {
    const response = await backend.patch(
      `api/product/term/${id}/`,
      formValues,
      getConfig()
    );
    if (response.status === 200) {
      dispatch({
        type: types.UPDATE_ATTRIBUTE_TERM,
        payload: { ...response.data },
      });
    }
  } catch (error) {
    console.log(error.response);
  }
};
