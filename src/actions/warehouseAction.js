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

export const createWarehouse = (formValues) => async (dispatch) => {
  try {
    const response = await backend.post(
      "api/hrm/Office/",
      formValues,
      getConfig()
    );
    if (response.status === 201) {
      dispatch({
        type: types.CREATE_WAREHOUSE,
        payload: { ...response.data },
      });
      message.success(
        formValues["name"] + " Has been added to your office list"
      );
      if (response.data.is_outlet) {
        // history.push("/outlet");
      } else if (response.data.is_office) {
        // history.push("/office");
      } else {
        // history.push("/warehouse");
      }
    }
  } catch (error) {
    alert(error);
  }
};

export const getAllWarehouse = () => async (dispatch) => {
  try {
    const response = await backend.get(
      `api/hrm/Office/?is_outlet=false&is_office=false`,
      getConfig()
    );
    if (response.status === 200) {
      dispatch({
        type: types.GET_ALL_WAREHOUSE,
        payload: response.data,
      });
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getSpecificLocation = (id) => async (dispatch) => {
  try {
    const response = await backend.get(`api/hrm/Office/${id}/`, getConfig());
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    alert(error);
  }
};

export const getSpecificLocationAno = (id) => async (dispatch) => {
  try {
    const response = await backend.get(`api/hrm/Office/${id}/`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    alert(error);
  }
};

export const getAllOutlet = () => async (dispatch) => {
  try {
    const response = await backend.get(
      `api/hrm/Office/?is_outlet=true`,
      getConfig()
    );
    if (response.status === 200) {
      dispatch({
        type: types.GET_ALL_OUTLET,
        payload: response.data,
      });
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAlloffice = () => async (dispatch) => {
  try {
    const response = await backend.get(
      `api/product/warehouse/?is_office=true`,
      getConfig()
    );
    if (response.status === 200) {
      dispatch({
        type: types.GET_ALL_OUTLET,
        payload: response.data,
      });
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllLocation = () => async (dispatch) => {
  try {
    let Office = store.getState().auth.profile.Office;
    const response = await backend.get(
      `api/hrm/Office/?id=${Office}`,
      getConfig()
    );
    if (response.status === 200) {
      dispatch({
        type: types.GET_ALL_LOCATION,
        payload: response.data,
      });
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllLocationPlain = () => async (dispatch) => {
  try {
    let Office = store.getState().auth.profile.Office;
    const response = await backend.get(`api/hrm/Officeall/`, getConfig());
    if (response.status === 200) {
      // dispatch({
      //   type: types.GET_ALL_LOCATION,
      //   payload: response.data,
      // });
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteWarehouse = (id) => async (dispatch) => {
  try {
    const response = await backend.delete(`api/hrm/Office/${id}/`, getConfig());
    if (response.status === 204) {
      dispatch({ type: types.DELETE_WAREHOUSE, payload: id });
    }
  } catch (error) {
    alert(error);
  }
};

export const updateWarehouse = (id, formValues) => async (dispatch) => {
  try {
    const response = await backend.patch(
      `api/hrm/Office/${id}/`,
      formValues,
      getConfig()
    );
    if (response.status === 200) {
      dispatch({ type: types.UPDATE_WAREHOUSE, payload: { ...response.data } });
    }
    if (response.data.is_outlet) {
      // history.push("/outlet");
    } else {
      // history.push("/warehouse");
    }
    message.success(formValues["name"] + " Has been Updated");
  } catch (error) {
    alert(error.response);
  }
};
