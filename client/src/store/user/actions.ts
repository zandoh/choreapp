import {
  UserActionTypes,
  USER_LOGIN,
  USER_NEW_PASSWORD,
  USER_LOGIN_FAILED,
  USER_LOGOUT
} from "./types";

export const loginUser = (payload: { jwt: string }): UserActionTypes => {
  return {
    type: USER_LOGIN,
    payload
  };
};

export const logoutUser = (): UserActionTypes => {
  return {
    type: USER_LOGOUT
  };
};

export const newPasswordForUser = (payload: {
  needsNewPassword: boolean;
}): Partial<UserActionTypes> => {
  return {
    type: USER_NEW_PASSWORD,
    payload
  };
};

export const loginUserFailed = (payload: {
  errorMessage: string;
}): UserActionTypes => {
  return {
    type: USER_LOGIN_FAILED,
    payload
  };
};
