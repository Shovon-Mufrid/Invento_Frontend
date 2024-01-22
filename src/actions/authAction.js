import * as types from "../redux/types";
import backend from "../api/api";
import { message } from "antd";
// import history from "../history";

export const signIn = (logInformValues) => async (dispatch) => {
  try {
    const response = await backend.post("api/settings/login/", {
      ...logInformValues,
    });
    console.log(response);
    dispatch({ type: types.SIGN_IN, payload: response.data });
    // history.push("/dashboard");
    return true;
  } catch (error) {
    message.error("Unable to log in with provided credentials.");
    dispatch({ type: types.AUTH_FAILED });
    return false;
  }
};

export const activelink = (Menu) => async (dispatch) => {
  dispatch({ type: types.Active, Menu: Menu });
};

export const signOut = () => (dispatch) => {
  dispatch({ type: types.SIGN_OUT });
  window.location.href = "/login";
  // history.push("/login");
};
