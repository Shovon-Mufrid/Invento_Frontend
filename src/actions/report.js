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

export const getSalesReport =
  (
    start,
    end,
    invoice_number,
    delivery_date,
    Payment_method,
    status,
    contact,
    location,
    account
  ) =>
  async (dispatch) => {
    try {
      const response = await backend.get(
        `api/order/invoices/?start=${start}&end=${end}&invoice_number=${invoice_number}&delivery_date=${delivery_date}&Payment_method=${Payment_method}&status=${status}&contact=${contact}&location=${location}&account=${account}`,
        getConfig()
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };
export const getSalesReportP =
  (
    start,
    end,
    keyward,
    invoice_number,
    delivery_date,
    Payment_method,
    status,
    contact,
    location,
    account,
    pageno = 1,
    page_size = 100
  ) =>
  async (dispatch) => {
    try {
      const response = await backend.get(
        `api/order/invoicesP/?keyward=${keyward}&start=${start}&end=${end}&invoice_number=${invoice_number}&delivery_date=${delivery_date}&Payment_method=${Payment_method}&status=${status}&contact=${contact}&location=${location}&account=${account}&page=${pageno}&page_size=${page_size}`,
        getConfig()
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };
export const getVATReport =
  (
    start,
    end,
    invoice_number,
    delivery_date,
    Payment_method,
    status,
    contact,
    location,
    account,
    contains_item = "true"
  ) =>
  async (dispatch) => {
    try {
      const response = await backend.get(
        `api/order/vat/?start=${start}&end=${end}&invoice_number=${invoice_number}&delivery_date=${delivery_date}&Payment_method=${Payment_method}&status=${status}&contact=${contact}&location=${location}&account=${account}&contains_item=${contains_item}`,
        getConfig()
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

export const getSalesReportByOutLetMonth =
  (location, month, year) => async (dispatch) => {
    try {
      const response = await backend.get(
        `api/order/invoices/?month=${month}&year=${year}&location=${location}`,
        getConfig()
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

export const getSalesReportByInvoiceCount = (from, to) => async (dispatch) => {
  try {
    const response = await backend.get(
      `api/order/report/${from}/${to}`,
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getDeliveryReport =
  (
    start,
    end,
    invoice_number,
    delivery_date,
    Payment_method,
    status,
    contact,
    location,
    account,
    DeliveryType = ""
  ) =>
  async (dispatch) => {
    try {
      const response = await backend.get(
        `api/order/delivery/?start=${start}&end=${end}&invoice_number=${invoice_number}&delivery_date=${delivery_date}&Payment_method=${Payment_method}&status=${status}&contact=${contact}&location=${location}&account=${account}&DeliveryType=${DeliveryType}`,
        getConfig()
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

export const getServiceReport =
  (start, end, keyward, employe__id = "", pageno = 1, page_size = 10) =>
  async (dispatch) => {
    try {
      const response = await backend.get(
        `api/order/ServicesP/?start=${start}&end=${end}&keyward=${keyward}&employe__id=${employe__id}&page=${pageno}&page_size=${page_size}`,
        getConfig()
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };
