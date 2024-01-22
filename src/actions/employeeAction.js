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

export const createEmployee = (formValues) => async (dispatch) => {
  console.log(formValues);
  try {
    const response = await backend.post(
      "api/hrm/Employee/",
      formValues,
      getConfig()
    );
    if (response.status === 201) {
      dispatch({
        type: types.CREATE_EMPLOYEE,
        payload: { ...response.data },
      });
      //message.success(formValues["name"] + " Has been added to your employee list");

      // history.push("/employee");
    }
  } catch (error) {
    alert(error);
  }
};

export const getAllEmployee = () => async (dispatch) => {
  try {
    const response = await backend.get(
      "api/hrm/Employee/?is_active=true",
      getConfig()
    );
    if (response.status === 200) {
      dispatch({
        type: types.GET_ALL_EMPLOYEE,
        payload: response.data,
      });
      // console.log(response.data);
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
export const getAllEmployeeByBranch = (branch) => async (dispatch) => {
  try {
    const response = await backend.get(
      `api/hrm/Employee/?is_active=true&Office__id=${branch}`,
      getConfig()
    );
    if (response.status === 200) {
      dispatch({
        type: types.GET_ALL_EMPLOYEE_BY_BRANCH_SHIFT,
        payload: response.data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
export const getAllEmployeeByShift = (shift) => async (dispatch) => {
  try {
    const response = await backend.get(
      `api/hrm/Employee/?is_active=true&employeeprofile__defaultShift=${shift}`,
      getConfig()
    );
    if (response.status === 200) {
      dispatch({
        type: types.GET_ALL_EMPLOYEE_BY_BRANCH_SHIFT,
        payload: response.data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllEmployeeByBranchShift =
  (branch, shift) => async (dispatch) => {
    try {
      const response = await backend.get(
        `api/hrm/Employee/?is_active=true&Office__id=${branch}&shift=${shift}`,
        getConfig()
      );
      if (response.status === 200) {
        dispatch({
          type: types.GET_ALL_EMPLOYEE_BY_BRANCH_SHIFT,
          payload: response.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

export const deleteEmployee = (id) => async (dispatch) => {
  try {
    const response = await backend.delete(
      `api/hrm/Employee/${id}/`,
      getConfig()
    );
    if (response.status === 204) {
      dispatch({ type: types.DELETE_EMPLOYEE, payload: id });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getSpecificEmployee = (id) => async (dispatch) => {
  try {
    const response = await backend.get(`api/hrm/Employee/${id}/`, getConfig());

    if (response.status === 201) {
      dispatch({
        type: types.GET_SPECIFIC_EMPLOYEE,
        payload: response.data,
      });
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateEmployee = (id, formValues) => async (dispatch) => {
  console.log("in action");
  console.log(formValues);

  try {
    const response = await backend.put(
      `api/hrm/Employee/${id}/`,
      formValues,
      getConfig()
    );
    if (response.status === 202) {
      dispatch({
        type: types.UPDATE_EMPLOYEE,
        payload: { ...response.data },
      });
    }
    //message.success(formValues["name"] + " Has been Updated");
  } catch (error) {
    console.log(error.response);
  }
};

// export const updateEmployeeProfile = (id, formValues) => async (dispatch) => {
//   console.log("in profile update");
//   console.log(id);
//   console.log(formValues);
//   try {
//     const response = await backend.put(
//       `api/contact/employee-profile/${id}/`,
//       formValues,
//       getConfig()
//     );
//     if (response.status === 202) {
//       dispatch({
//         type: types.UPDATE_EMPLOYEE_PROFILE,
//         payload: { ...response.data },
//       });
//     }
//     message.success("Updated Successfully");
//   } catch (error) {
//     console.log(error.response);
//   }
// };

export const getEmployeeSearchResult = (data) => async (dispatch) => {
  try {
    const response = await backend.get(
      `api/hrm/Employee/?is_active=true&search=${data}`,
      getConfig()
    );

    if (response.status === 200) {
      dispatch({
        type: types.GET_EMPLOYEE_SEARCH_RESULT,
        payload: response.data,
      });
    }
  } catch (error) {
    alert(error);
  }
};

export const getEmployeeSearchResultbyPhone = (data) => async (dispatch) => {
  try {
    const response = await backend.get(
      `api/hrm/Employee/?is_active=true&keyward=${data}`,
      getConfig()
    );

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    alert(error);
  }
};
