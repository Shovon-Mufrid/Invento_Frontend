import * as types from "../types";

const INITIAL_STATE = { accountlist: [], accountDetails: [] };

const accountReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CREATE_ACCOUNT:
      return state;

    case types.GET_ALL_ACCOUNT:
      return { ...state, accountlist: action.payload };

    case types.GET_SPECIFIC_ACCOUNT:
      return { ...state, accountDetails: action.payload };

    case types.DELETE_ACCOUNT:
      const accountlist = state.accountlist.filter(
        (account) => account.id !== action.payload
      );
      return { ...state, accountlist };

    default:
      return state;
  }
};

export default accountReducer;
