import * as types from "../types";

const INITIAL_STATE = { servicelist: [] };

const serviceReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CREATE_SERVICE:
      return state;

    case types.GET_ALL_SERVICE:
      return { ...state, servicelist: action.payload };

    case types.DELETE_SERVICE:
      const servicelist = state.servicelist.filter(
        (service) => service.id !== action.payload
      );
      return { ...state, servicelist };

    default:
      return state;
  }
};

export default serviceReducer;
