import * as types from "../types";

const INITIAL_STATE = {
  businessprofile: [
    { invoice_terms: "", wordrobe_terms: "", challan_terms: "", address: "" },
  ],
  deliverytype: [],
  accountparent: [],
};

const contactReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CREATE_BUSINESS_PROFILE:
      return state;

    case types.GET_ALL_BUSINESS_PROFILE:
      return { ...state, businessprofile: action.payload };

    case types.DELETE_BUSINESS_PROFILE:
      const contactlist = state.businessprofile.filter(
        (contact) => contact.id !== action.payload
      );
      return { ...state, contactlist };

    case types.CREATE_DELIVERY_TYPE:
      return state;

    case types.GET_ALL_DELIVERY_TYPE:
      return { ...state, deliverytype: action.payload };

    case types.DELETE_DELIVERY_TYPE:
      const deliverytype = state.deliverytype.filter(
        (contact) => contact.id !== action.payload
      );
      return { ...state, deliverytype };

    case types.CREATE_ACCOUNT_PARENT:
      return state;

    case types.GET_ALL_ACCOUNT_PARENT:
      return { ...state, accountparent: action.payload };

    case types.DELETE_ACCOUNT_PARENT:
      const accountparent = state.accountparent.filter(
        (contact) => contact.id !== action.payload
      );
      return { ...state, accountparent };

    default:
      return state;
  }
};

export default contactReducer;
