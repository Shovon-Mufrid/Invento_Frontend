import * as types from "../types";

const INITIAL_STATE = { userRolelist: [] };

const userRoleReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CREATE_USER_ROLE:
      return state;

    case types.GET_ALL_USER_ROLE:
      return { ...state, userRolelist: action.payload };

    case types.DELETE_USER_ROLE:
      const userRolelist = state.userRolelist.filter(
        (userRole) => userRole.id !== action.payload
      );
      return { ...state, userRolelist };

    default:
      return state;
  }
};

export default userRoleReducer;
