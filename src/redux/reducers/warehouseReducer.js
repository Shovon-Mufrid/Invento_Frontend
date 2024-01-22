import * as types from "../types";

const INITIAL_STATE = { warehouselist: [], outletlist: [], locationlist: [] };

const warehouseReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CREATE_WAREHOUSE:
      return state;

    case types.GET_ALL_WAREHOUSE:
      return { ...state, warehouselist: action.payload };

    case types.GET_ALL_OUTLET:
      return { ...state, outletlist: action.payload };

    case types.GET_ALL_LOCATION:
      return { ...state, locationlist: action.payload };

    case types.DELETE_WAREHOUSE:
      const warehouselist = state.warehouselist.filter(
        (warehouse) => warehouse.id !== action.payload
      );
      return { ...state, warehouselist };

    default:
      return state;
  }
};

export default warehouseReducer;
