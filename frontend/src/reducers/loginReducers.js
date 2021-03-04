import {
  MESSAGES_TEMPS_REEL,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from "../constants/loginConstants";

export const userLoginRedures = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true, nbMessages: 0 };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload, nbMessages: 0 };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload, nbMessages: 0 };
    case USER_LOGOUT:
      return {};

    case MESSAGES_TEMPS_REEL:
      return {
        ...state,
        nbMessages: action.payload,
      };
    default:
      return state;
  }
};
