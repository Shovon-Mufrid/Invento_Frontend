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

//-------------------Business Settings-----------------------------

export const createBusinessProfile = (formValues) => async (dispatch) => {
  formValues["data"] = "";
  try {
    const response = await backend.post(
      "api/settings/business/",
      formValues,
      getConfig()
    );
    if (response.status === 201) {
      dispatch({
        type: types.CREATE_BUSINESS_PROFILE,
        payload: { ...response.data },
      });
      return response.data;
    }
  } catch (error) {
    alert(error);
  }
};

export const getBusinessProfile = () => async (dispatch) => {
  try {
    const response = await backend.get("api/settings/business/1/", getConfig());
    if (response.status === 200) {
      dispatch({
        type: types.GET_ALL_BUSINESS_PROFILE,
        payload: response.data,
      });
      // console.log(response.data);
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getBusinessProfileAno = () => async (dispatch) => {
  try {
    const response = await backend.get("api/settings/business/1/");
    if (response.status === 200) {
      dispatch({
        type: types.GET_ALL_BUSINESS_PROFILE,
        payload: response.data,
      });
      // console.log(response.data);
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateBusinessProfile = (id, formValues) => async (dispatch) => {
  try {
    const response = await backend.patch(
      `api/settings/business/${id}/`,
      formValues,
      getConfig()
    );
    if (response.status === 200) {
      message.success("Successfully Updated");
      dispatch({
        type: types.UPDATE_BUSINESS_PROFILE,
        payload: { ...response.data },
      });

      return true;
    }
  } catch (error) {
    console.log(error.response);
  }
};

export const deleteBusinessProfile = (id) => async (dispatch) => {
  try {
    const response = await backend.delete(
      `api/settings/business/${id}/`,
      getConfig()
    );
    if (response.status === 204) {
      dispatch({ type: types.DELETE_BUSINESS_PROFILE, payload: id });
      message.success("Successfully Removed");
    }
  } catch (error) {
    console.log(error);
  }
};

//-------------------Business Settings end-----------------------------

//-------------------Contact Type start-----------------------------

export const createcontacttype = (formValues) => async (dispatch) => {
  formValues["data"] = "";
  try {
    const response = await backend.post(
      "api/contact/contacttype/",
      formValues,
      getConfig()
    );
    if (response.status === 201) {
      dispatch({
        type: types.CREATE_CONTACT_TYPE,
        payload: { ...response.data },
      });
      return response.data;
    }
  } catch (error) {
    alert(error);
  }
};

export const getcontacttype = () => async (dispatch) => {
  try {
    const response = await backend.get("api/contact/contacttype/", getConfig());
    if (response.status === 200) {
      dispatch({
        type: types.GET_ALL_CONTACT_TYPE,
        payload: response.data,
      });
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
export const getSpecificcontacttype = (id) => async (dispatch) => {
  try {
    const response = await backend.get(
      `api/contact/contacttype/${id}/`,
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updatecontacttype = (id, formValues) => async (dispatch) => {
  try {
    const response = await backend.patch(
      `api/contact/contacttype/${id}/`,
      formValues,
      getConfig()
    );
    if (response.status === 200) {
      message.success("Successfully Updated");
      dispatch({
        type: types.GET_ALL_CONTACT_TYPE,
        payload: { ...response.data },
      });

      return true;
    }
  } catch (error) {
    console.log(error.response);
  }
};

export const deletecontacttype = (id) => async (dispatch) => {
  try {
    const response = await backend.delete(
      `api/contact/contacttype/${id}/`,
      getConfig()
    );
    if (response.status === 204) {
      dispatch({ type: types.DELETE_CONTACT_TYPE, payload: id });
      message.success("Successfully Removed");
    }
  } catch (error) {
    console.log(error);
  }
};

//-------------------Contact Type End-----------------------------

//-------------------Delivery Type start-----------------------------

export const createdeliverytype = (formValues) => async (dispatch) => {
  formValues["data"] = "";
  try {
    const response = await backend.post(
      "api/order/deliverytype/",
      formValues,
      getConfig()
    );
    if (response.status === 201) {
      dispatch({
        type: types.CREATE_DELIVERY_TYPE,
        payload: { ...response.data },
      });
      return response.data;
    }
  } catch (error) {
    alert(error);
  }
};

export const getdeliverytype = () => async (dispatch) => {
  try {
    const response = await backend.get("api/order/deliverytype/", getConfig());
    if (response.status === 200) {
      dispatch({
        type: types.GET_ALL_DELIVERY_TYPE,
        payload: response.data,
      });
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
export const getSpecificdeliverytype = (id) => async (dispatch) => {
  try {
    const response = await backend.get(
      `api/order/deliverytype/${id}/`,
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updatedeliverytype = (id, formValues) => async (dispatch) => {
  try {
    const response = await backend.patch(
      `api/order/deliverytype/${id}/`,
      formValues,
      getConfig()
    );
    if (response.status === 200) {
      message.success("Successfully Updated");
      dispatch({
        type: types.GET_ALL_DELIVERY_TYPE,
        payload: { ...response.data },
      });

      return true;
    }
  } catch (error) {
    console.log(error.response);
  }
};

export const deletedeliverytype = (id) => async (dispatch) => {
  try {
    const response = await backend.delete(
      `api/order/deliverytype/${id}/`,
      getConfig()
    );
    if (response.status === 204) {
      dispatch({ type: types.DELETE_DELIVERY_TYPE, payload: id });
      message.success("Successfully Removed");
    }
  } catch (error) {
    console.log(error);
  }
};

//-------------------Delivery Type End-----------------------------

//-------------------Account Type start-----------------------------

export const createaccountsparent = (formValues) => async (dispatch) => {
  formValues["data"] = "";
  try {
    const response = await backend.post(
      "api/accounting/accountsparent/",
      formValues,
      getConfig()
    );
    if (response.status === 201) {
      dispatch({
        type: types.CREATE_CONTACT_TYPE,
        payload: { ...response.data },
      });
      return response.data;
    }
  } catch (error) {
    alert(error);
  }
};

export const getaccountsparent = () => async (dispatch) => {
  try {
    const response = await backend.get(
      "api/accounting/accountsparent/",
      getConfig()
    );
    if (response.status === 200) {
      dispatch({
        type: types.GET_ALL_CONTACT_TYPE,
        payload: response.data,
      });
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
export const getSpecificaccountsparent = (id) => async (dispatch) => {
  try {
    const response = await backend.get(
      `api/accounting/accountsparent/${id}/`,
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateaccountsparent = (id, formValues) => async (dispatch) => {
  try {
    const response = await backend.patch(
      `api/accounting/accountsparent/${id}/`,
      formValues,
      getConfig()
    );
    if (response.status === 200) {
      message.success("Successfully Updated");
      dispatch({
        type: types.GET_ALL_CONTACT_TYPE,
        payload: { ...response.data },
      });

      return true;
    }
  } catch (error) {
    console.log(error.response);
  }
};

export const deleteaccountsparent = (id) => async (dispatch) => {
  try {
    const response = await backend.delete(
      `api/accounting/accountsparent/${id}/`,
      getConfig()
    );
    if (response.status === 204) {
      dispatch({ type: types.DELETE_CONTACT_TYPE, payload: id });
      message.success("Successfully Removed");
    }
  } catch (error) {
    console.log(error);
  }
};

//-------------------Contact Type End-----------------------------

//-------------------Permission start-----------------------------

export const create_role_permission = (formValues) => async (dispatch) => {
  try {
    const response = await backend.post(
      "api/hrm/Permissions/",
      formValues,
      getConfig()
    );
    if (response.status === 201) {
      return response.data;
    }
  } catch (error) {
    alert(error);
  }
};

export const get_role_permission =
  (id = "") =>
  async (dispatch) => {
    try {
      const response = await backend.get(
        `api/hrm/Permissions/?Designation__id=${id}`,
        getConfig()
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

export const get_sub_module = () => async (dispatch) => {
  try {
    const response = await backend.get(`api/settings/sub_module/`, getConfig());
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const get_module = () => async (dispatch) => {
  try {
    const response = await backend.get(`api/settings/module/`, getConfig());
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getspecific_role_permission = (id) => async (dispatch) => {
  try {
    const response = await backend.get(
      `api/hrm/Permissions/${id}/`,
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const update_role_permission = (id, formValues) => async (dispatch) => {
  try {
    const response = await backend.patch(
      `api/hrm/Permissions/${id}/`,
      formValues,
      getConfig()
    );
    if (response.status === 200) {
      message.success("Successfully Updated");
      return true;
    }
  } catch (error) {
    console.log(error.response);
  }
};

export const delete_role_permission = (id) => async (dispatch) => {
  try {
    const response = await backend.delete(
      `api/hrm/Permissions/${id}/`,
      getConfig()
    );
    if (response.status === 204) {
      message.success("Successfully Removed");
    }
  } catch (error) {
    console.log(error);
  }
};

//-------------------Permission Type End-----------------------------
