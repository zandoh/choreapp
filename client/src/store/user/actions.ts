import {
  UserActionTypes,
  UserPayload,
  USER_LOGIN,
  USER_NEW_PASSWORD,
  CognitoNewPasswordUserAttributes
} from "./types";

export const loginUser = (payload: UserPayload): UserActionTypes => {
  return {
    type: USER_LOGIN,
    payload
  };
};

export const newPasswordForUser = (
  payload: CognitoNewPasswordUserAttributes
): Partial<UserActionTypes> => {
  return {
    type: USER_NEW_PASSWORD,
    payload: payload
  };
};
