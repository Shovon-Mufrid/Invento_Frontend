import * as types from "../types";

const INITIAL_STATE = {
  pettycash: [],
  pettycashsearchresult: [],
};

const contactReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CREATE_PETTY_CASH:
      return state;

    case types.GET_ALL_PETTY_CASH:
      return { ...state, pettycash: action.payload };

    case types.DELETE_PETTY_CASH:
      const pettycash = state.pettycash.filter(
        (contact) => contact.id !== action.payload
      );
      return { ...state, pettycash };
    case types.GET_PETTY_CASH_SEARCH_RESULT:
      return { ...state, pettycashsearchresult: action.payload };

    default:
      return state;
  }
};

export default contactReducer;
