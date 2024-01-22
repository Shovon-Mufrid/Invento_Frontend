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

export const createUserDocument = (formValues) => async (dispatch) => {
  try {
    const response = await backend.post(
      "api/hrm/EmployeeDocument/",
      formValues,
      getConfig()
    );
    // if (response.status === 201) {
    //   dispatch({
    //     type: types.CREATE_USER_ROLE,
    //     payload: { ...response.data },
    //   });
    //   message.success(
    //     formValues["name"] + " Has been added to your Role list"
    //   );
    //   history.push("/employee");
    // }
  } catch (error) {
    alert(error);
  }
};

export const getAllUserDocument = () => async (dispatch) => {
  try {
    const response = await backend.get(
      "api/hrm/EmployeeDocument/",
      getConfig()
    );
    if (response.status === 200) {
      dispatch({
        type: types.GET_ALL_USER_ROLE,
        payload: response.data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteUserDocument = (id) => async (dispatch) => {
  try {
    const response = await backend.delete(
      `api/hrm/EmployeeDocument/${id}/`,
      getConfig()
    );
    if (response.status === 204) {
      dispatch({ type: types.DELETE_USER_ROLE, payload: id });
    }
    // history.push("/employee");
  } catch (error) {
    alert(error);
  }
};

export const updateUserDocument = (id, formValues) => async (dispatch) => {
  try {
    const response = await backend.patch(
      `api/hrm/EmployeeDocument/${id}/`,
      formValues,
      getConfig()
    );
    if (response.status === 200) {
      dispatch({ type: types.UPDATE_USER_ROLE, payload: { ...response.data } });
    }
    // history.push("/employee");
    message.success("Updated Successfully");
  } catch (error) {
    alert(error.response);
  }
};
