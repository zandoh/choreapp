import {
  UserActionTypes,
  USER_UPDATE,
  USER_REMOVE,
  USER_GET,
  UserPayload
} from "./types";

export const updateUser = (payload: UserPayload): UserActionTypes => {
  return {
    type: USER_UPDATE,
    payload
  };
};

export const removeUser = (): Partial<UserActionTypes> => {
  return {
    type: USER_REMOVE
  };
};

export const getUser = (): Partial<UserActionTypes> => {
  return {
    type: USER_GET
  };
};
