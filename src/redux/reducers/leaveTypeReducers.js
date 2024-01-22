import * as types from "../types";

const INITIAL_STATE = { leaveTypelist: [] };

const leaveTypeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CREATE_LEAVE_TYPE:
      return state;

    case types.GET_ALL_LEAVE_TYPE:
      return { ...state, leaveTypelist: action.payload };

    case types.DELETE_LEAVE_TYPE:
      const leaveTypelist = state.leaveTypelist.filter(
        (leaveType) => leaveType.id !== action.payload
      );
      return { ...state, leaveTypelist };

    default:
      return state;
  }
};

export default leaveTypeReducer;
