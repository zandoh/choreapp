import {
  UserState,
  UserActionTypes,
  USER_LOGIN,
  USER_NEW_PASSWORD,
  USER_LOGIN_FAILED
} from "./types";

const initialState: UserState = {
  needsNewPassword: false,
  loginFailed: false,
  errorMessage: ""
};

export function userReducer(
  state: UserState = initialState,
  action: UserActionTypes
) {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        ...action.payload,
        loginFailed: false
      };
    case USER_NEW_PASSWORD:
      return {
        ...state,
        ...action.payload,
        loginFailed: false
      };
    case USER_LOGIN_FAILED:
      return {
        ...state,
        ...action.payload,
        jwt: undefined,
        loginFailed: true
      };
    default:
      return state;
  }
}
