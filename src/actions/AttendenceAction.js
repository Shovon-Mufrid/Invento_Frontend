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

export const createAttendence = (formValues) => async (dispatch) => {
  // console.log(formValues);
  try {
    const response = await backend.post(
      "api/hrm/attendance/",
      { ...formValues },
      getConfig()
    );
    if (response.status === 201) {
      dispatch({
        type: types.CREATE_EMPLOYEE_ATTENDENCE,
        payload: { ...response.data },
      });
    }
  } catch (error) {
    alert(error);
  }
};

export const getAllEmployeeAttendenceOfDate =
  (date, shift, branch) => async (dispatch) => {
    // console.log(date);
    let req_format = date.format("YYYY-MM-DD");
    // console.log(req_format);
    try {
      const response = await backend.get(
        `api/hrm/attendance/?attendanceDate=${req_format}&shift=${shift}&Office__id=${branch}&is_active=true`,
        getConfig()
      );
      if (response.status === 200) {
        dispatch({
          type: types.GET_ALL_EMPLOYEE_ATTENDENCE_OF_DATE,
          payload: response.data,
        });
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

export const getSpecificEmployeeAttendence =
  (id, month, year, start_date = "", end_date = "") =>
  async (dispatch) => {
    try {
      const response = await backend.get(
        `api/hrm/attendance/?employee__id=${id}&month=${month}&year=${year}&start_date=${start_date}&end_date=${end_date}&o=attendanceDate`,
        getConfig()
      );
      if (response.status === 200) {
        dispatch({
          type: types.GET_SPECIFIC_EMPLOYEE_ATTENDENCE,
          payload: response.data,
        });
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };
export const getAllEmployeeAttendenceOfMonth =
  (month, year) => async (dispatch) => {
    try {
      const response = await backend.get(
        `api/hrm/attendance/?month=${month}&year=${year}&o=attendanceDate&is_active=true`,
        getConfig()
      );
      if (response.status === 200) {
        dispatch({
          type: types.GET_ALL_EMPLOYEE_ATTENDENCE_OF_MONTH,
          payload: response.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
export const getAllEmployeeAttendenceOfDateRange =
  (startDate, endDate, employee__Office__id = "", employee__id = "") =>
  async (dispatch) => {
    try {
      const response = await backend.get(
        `api/hrm/attendance/?start_date=${startDate}&end_date=${endDate}&employee__Office__id=${employee__Office__id}&employee__id=${employee__id}&o=attendanceDate&is_active=true`,
        getConfig()
      );
      if (response.status === 200) {
        dispatch({
          type: types.GET_ALL_EMPLOYEE_ATTENDENCE_OF_MONTH,
          payload: response.data,
        });
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };
export const updateEmployeeAttendenceOfDate =
  (id, formValues) => async (dispatch) => {
    try {
      const response = await backend.patch(
        `api/hrm/attendance/${id}/`,
        formValues,
        getConfig()
      );
      if (response.status === 200) {
        dispatch({
          type: types.UPDATE_EMPLOYEE_LEAVE,
          payload: { ...response.data },
        });
        message.success("Updated Successfully");
      }
    } catch (error) {
      if (error.response.status === 401) {
        message.error("Permission Denied");
      } else {
        message.error("Bad Request");
      }
      alert(error.response);
    }
  };
