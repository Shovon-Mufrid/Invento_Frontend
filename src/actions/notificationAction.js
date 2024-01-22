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

export const getAllNotification = () => async (dispatch) => {
  try {
    const response = await backend.get(
      "api/contact/notifications/all/",
      getConfig()
    );
    if (response.status === 200) {
      dispatch({
        type: types.GET_ALL_NOTIFICATION,
        payload: response.data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllUnreadNotification = () => async (dispatch) => {
  try {
    const response = await backend.get(
      "api/contact/notifications/unread/",
      getConfig()
    );
    if (response.status === 200) {
      dispatch({
        type: types.GET_ALL_UNREAD_NOTIFICATION,
        payload: response.data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const markAllasRead = () => async (dispatch) => {
  try {
    const response = await backend.get(
      "api/contact/notifications/mark-all-as-read/",
      getConfig()
    );
    if (response.status === 200) {
      dispatch({
        type: types.MARK_ALL_AS_READ_NOTIFICATION,
        payload: response.data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const markasRead = (id) => async (dispatch) => {
  try {
    const response = await backend.get(
      `api/contact/notifications/mark-as-read/${id}/`,
      getConfig()
    );
    if (response.status === 200) {
      dispatch({
        type: types.MARK_ALL_AS_READ_NOTIFICATION,
        payload: response.data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
