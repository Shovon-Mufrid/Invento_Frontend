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

export const createInvoiceItem = (formValues) => async (dispatch) => {
  try {
    const response = await backend.post(
      "api/order/items/",
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

export const getInvoiceItem = (id) => async (dispatch) => {
  try {
    const response = await backend.get(
      `api/order/items/?invoice__id=${id}`,
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getInvoiceItemAno = (id) => async (dispatch) => {
  try {
    const response = await backend.get(`api/order/items/?invoice__id=${id}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getSoldProducts =
  (keyward = "", start = "", end = "", invoice__location__id = "") =>
  async (dispatch) => {
    try {
      const response = await backend.get(
        `api/order/solditems/?keyward=${keyward}&start=${start}&end=${end}&invoice__location__id=${invoice__location__id}`,
        getConfig()
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

export const createInvoice = (formValues) => async (dispatch) => {
  try {
    const response = await backend.post(
      "api/order/invoices/",
      formValues,
      getConfig()
    );
    if (response.status === 201) {
      console.log(response);
      return response.data.id;
    }
  } catch (error) {
    alert(error);
  }
};

export const getSpecificInvoice = (id) => async (dispatch) => {
  try {
    const response = await backend.get(
      `api/order/invoices/${id}/`,
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getSpecificCustomerInvoice = (id) => async (dispatch) => {
  try {
    const response = await backend.get(`api/order/invoice/${id}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getSpecificInvoiceAno = (id) => async (dispatch) => {
  try {
    const response = await backend.get(`api/order/invoices/${id}/`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const searchInvoice = (id) => async (dispatch) => {
  try {
    const response = await backend.get(
      `api/order/invoices/?keyward=${id}`,
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const createService = (formData) => async (dispatch) => {
  try {
    const response = await backend.post(
      "api/order/Services/",
      formData,
      getConfig()
    );
    if (response.status === 201) {
      dispatch({
        type: types.CREATE_SERVICE,
        payload: { ...response.data },
      });
    }
  } catch (error) {
    alert(error);
  }
};

export const getAllInvoices = () => async (dispatch) => {
  try {
    const response = await backend.get("api/order/invoices/", getConfig());
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllInvoicesByContact = (id) => async (dispatch) => {
  try {
    const response = await backend.get(
      `api/order/invoices/?contact=${id}`,
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllInvoicesByAccount = (id, start, end) => async (dispatch) => {
  try {
    const response = await backend.get(
      `api/order/invoices/?account=${id}&start=${start}&end=${end}`,
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllServices = () => async (dispatch) => {
  try {
    const response = await backend.get("api/order/Services/", getConfig());
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
export const getAllServicesP =
  (
    start = "",
    end = "",
    keyward = "",
    pageno = 1,
    page_size = 10,
    employe__id = ""
  ) =>
  async (dispatch) => {
    try {
      const response = await backend.get(
        `api/order/ServicesP/?start=${start}&end=${end}&keyward=${keyward}&page=${pageno}&page_size=${page_size}&employe__id=${employe__id}`,
        getConfig()
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };
export const getServices = (id) => async (dispatch) => {
  try {
    const response = await backend.get(
      `api/order/Services/?invoice__id=${id}`,
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
export const getServicesAno = (id) => async (dispatch) => {
  try {
    const response = await backend.get(`api/order/Services/?invoice__id=${id}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
export const getSpecificServices = (id) => async (dispatch) => {
  try {
    const response = await backend.get(
      `api/order/Services/${id}/`,
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
export const updateService = (id, formValues) => async (dispatch) => {
  try {
    const response = await backend.patch(
      `api/order/Services/${id}/`,
      formValues,
      getConfig()
    );
    if (response.status === 200) {
      message.success("Successfully updated");
      // history.push("/service");
      return true;
    }
  } catch (error) {
    console.log(error.response);
  }
};

export const deleteService = (id) => async (dispatch) => {
  try {
    const response = await backend.delete(
      `api/order/Services/${id}/`,
      getConfig()
    );
    if (response.status === 204) {
      message.success("Successfully Removed");
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateInvoice = (id, formValues) => async (dispatch) => {
  try {
    const response = await backend.patch(
      `api/order/invoices/${id}/`,
      formValues,
      getConfig()
    );
    if (response.status === 200) {
      // history.push("/order");
      return true;
    }
  } catch (error) {
    console.log(error.response);
  }
};

export const updateInvoiceItem = (id, formValues) => async (dispatch) => {
  try {
    const response = await backend.patch(
      `api/order/items/${id}/`,
      formValues,
      getConfig()
    );
    if (response.status === 200) {
      // history.push("/order");
      message.success("Successfully Updated");
      return true;
    }
  } catch (error) {
    console.log(error.response);
  }
};

export const createcosting = (formData) => async (dispatch) => {
  try {
    const response = await backend.post(
      "api/order/costings/",
      formData,
      getConfig()
    );
    if (response.status === 201) {
      // dispatch({
      //   type: types.CREATE_SERVICE,
      //   payload: { ...response.data },
      // });
    }
  } catch (error) {
    alert(error);
  }
};
export const getServicesCosting = (id) => async (dispatch) => {
  try {
    const response = await backend.get(
      `api/order/costings/?services__id=${id}`,
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
export const deleteServicesCosting = (id) => async (dispatch) => {
  try {
    const response = await backend.delete(
      `api/order/costings/${id}/`,
      getConfig()
    );
    if (response.status === 204) {
      message.success("Successfully Removed");
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteInvoiceItem = (id) => async (dispatch) => {
  try {
    const response = await backend.delete(
      `api/order/items/${id}/`,
      getConfig()
    );
    if (response.status === 204) {
      message.success("Successfully Removed");
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteInvoice = (id) => async (dispatch) => {
  try {
    const response = await backend.delete(
      `api/order/invoices/${id}/`,
      getConfig()
    );
    if (response.status === 204) {
      message.success("Successfully Removed");
    }
  } catch (error) {
    console.log(error);
  }
};
