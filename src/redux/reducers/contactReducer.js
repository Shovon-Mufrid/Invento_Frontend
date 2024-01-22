import * as types from "../types";

const INITIAL_STATE = {
  contactlist: [],
  contactlistsearchresult: [],
  contacttype: [],
};

const contactReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CREATE_CONTACT:
      return state;

    case types.GET_ALL_CONTACT:
      return { ...state, contactlist: action.payload };

    case types.GET_ALL_History:
      return { ...state, history: action.payload };

    case types.DELETE_CONTACT:
      const contactlist = state.contactlist.filter(
        (contact) => contact.id !== action.payload
      );
      return { ...state, contactlist };
    case types.GET_CONTACT_SEARCH_RESULT:
      return { ...state, contactlistsearchresult: action.payload };

    case types.CREATE_CONTACT_TYPE:
      return state;

    case types.GET_ALL_CONTACT_TYPE:
      return { ...state, contacttype: action.payload };

    case types.DELETE_CONTACT_TYPE:
      const contacttype = state.contacttype.filter(
        (contact) => contact.id !== action.payload
      );
      return { ...state, contacttype };

    default:
      return state;
  }
};

export default contactReducer;
