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

export const createContact = (formValues) => async (dispatch) => {
  formValues["data"] = "";
  try {
    const response = await backend.post(
      "api/contact/contact/",
      { ...formValues },
      getConfig()
    );
    if (response.status === 201) {
      dispatch({
        type: types.CREATE_CONTACT,
        payload: { ...response.data },
      });
    }
  } catch (error) {
    alert(error);
  }
};

export const createContactfromimport = (formValues) => async (dispatch) => {
  formValues["data"] = "";
  try {
    const response = await backend.post(
      "api/contact/contact/",
      { ...formValues },
      getConfig()
    );
    if (response.status === 201) {
      dispatch({
        type: types.CREATE_CONTACT,
        payload: { ...response.data },
      });
      message.success(
        formValues["name"] + " Has been added to your contact list"
      );
    }
  } catch (error) {
    alert(error);
  }
};

export const createContactfromOrder = (formValues) => async (dispatch) => {
  formValues["data"] = "";
  try {
    const response = await backend.post(
      "api/contact/contact/",
      { ...formValues },
      getConfig()
    );
    if (response.status === 201) {
      dispatch({
        type: types.CREATE_CONTACT,
        payload: { ...response.data },
      });
      message.success(
        formValues["name"] + " Has been added to your contact list"
      );
      return response.data;
    }
  } catch (error) {
    alert(error);
  }
};

export const getAllContact = () => async (dispatch) => {
  try {
    const response = await backend.get("api/contact/contact/", getConfig());
    if (response.status === 200) {
      dispatch({
        type: types.GET_ALL_CONTACT,
        payload: response.data,
      });
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getSpecificContact = (id) => async (dispatch) => {
  try {
    const response = await backend.get(
      `api/contact/contact/${id}/`,
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllContactMerchandiser = () => async (dispatch) => {
  try {
    const response = await backend.get(
      "api/contact/contact/?Type=Supplier",
      getConfig()
    );
    if (response.status === 200) {
      dispatch({
        type: types.GET_CONTACT_SEARCH_RESULT,
        payload: response.data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getHistory = () => async (dispatch) => {
  try {
    const response = await backend.get("api/contact/log/", getConfig());
    if (response.status === 200) {
      dispatch({
        type: types.GET_ALL_History,
        payload: response.data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteContact = (id) => async (dispatch) => {
  try {
    const response = await backend.delete(
      `api/contact/contact/${id}/`,
      getConfig()
    );
    if (response.status === 204) {
      dispatch({ type: types.DELETE_CONTACT, payload: id });
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateContact = (id, formValues) => async (dispatch) => {
  formValues["data"] = "";
  try {
    const response = await backend.patch(
      `api/contact/contact/${id}/`,
      formValues,
      getConfig()
    );
    if (response.status === 200) {
      dispatch({ type: types.UPDATE_CONTACT, payload: { ...response.data } });
    }
    message.success(formValues["name"] + " Has been Updated");
  } catch (error) {
    console.log(error.response);
  }
};

export const getContactSearchResult =
  (keyward, Type, role = "") =>
  async (dispatch) => {
    try {
      const response = await backend.get(
        `api/contact/contact/?keyward=${keyward}&Type=${Type}&role=${role}`,
        getConfig()
      );

      if (response.status === 200) {
        dispatch({
          type: types.GET_CONTACT_SEARCH_RESULT,
          payload: response.data,
        });
        return response.data;
      }
    } catch (error) {
      alert(error);
    }
  };

export const getContactSearchResultbyPhone = (data) => async (dispatch) => {
  try {
    const response = await backend.get(
      `api/contact/contact/?keyward=${data}`,
      getConfig()
    );

    if (response.status === 200) {
      // dispatch({
      //   type: types.GET_CONTACT_SEARCH_RESULT,
      //   payload: response.data,
      // });
      return response.data;
    }
  } catch (error) {
    alert(error);
  }
};
