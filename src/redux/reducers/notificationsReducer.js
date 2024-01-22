import * as types from "./../types";

const INITIAL_STATE = {
  allnotificationList: [],
  unreadnotificationList: [],
};

const notificationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    
    case types.GET_ALL_NOTIFICATION:
      return { ...state, allnotificationList: action.payload };

    case types.GET_ALL_UNREAD_NOTIFICATION:
      return { ...state, unreadnotificationList: action.payload };

    case types.MARK_ALL_AS_READ_NOTIFICATION:
      return state;
    
    case types.MARK_AS_READ_NOTIFICATION:
      return state;

    default:
      return state;
  }
};

export default notificationReducer;
