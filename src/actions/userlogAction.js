// import backend from "../api/api";
// import { message } from 'antd';
// import { store } from "../redux/store";

// const getConfig = () => {
//     const token = store.getState().auth.token;
  
//     const config = {
//       headers: {
//         Authorization: `Token ${token}`,
//       },
//     };
  
//     return config;
//   };
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


export const getAlluserlogPagination =
  (page = 1, page_size = 100) =>
  async (dispatch) => {
    try {
      const response = await backend.get(
        `api/userlog/logs/?&page=${page}&page_size=${page_size}`,
        getConfig()
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

export const getinvoicelog =
  (page = 1, page_size = 100, content_type = "", object_id = "") =>
  async (dispatch) => {
    try {
      const response = await backend.get(
        `api/userlog/logs/?&page=${page}&page_size=${page_size}&content_type=${content_type}&object_id=${object_id}`,
        getConfig()
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

export const getlog =
  (page = 1, page_size = 1000, content_type = "", object_id = "") =>
  async (dispatch) => {
    try {
      const response = await backend.get(
        `api/userlog/logs/?&page=${page}&page_size=${page_size}&content_type=${content_type}&object_id=${object_id}`,
        getConfig()
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

export const uploadlog = (formValues) => async (dispatch) => {
  console.log(formValues);
  try {
    const response = await backend.post(
      "api/userlog/importlogs/",
      formValues,
      getConfig()
    );
    return response;
  } catch (error) {
    alert(error);
  }
};
