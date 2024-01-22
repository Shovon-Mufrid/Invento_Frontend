import * as types from "../types";

const INITIAL_STATE = { departmentlist: [] };

const departmentReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CREATE_DEPARTMENT:
      return state;

    case types.GET_ALL_DEPARTMENT:
      return { ...state, departmentlist: action.payload };

    case types.DELETE_DEPARTMENT:
      const departmentlist = state.departmentlist.filter(
        (department) => department.id !== action.payload
      );
      return { ...state, departmentlist };

    default:
      return state;
  }
};

export default departmentReducer;
