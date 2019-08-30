import {
  UserState,
  UserActionTypes,
  USER_UPDATE,
  USER_REMOVE,
  USER_GET
} from "./types";

const initialState: UserState = {
  username: "defaultUser"
};

export function userReducer(
  state: UserState = initialState,
  action: UserActionTypes
) {
  switch (action.type) {
    case USER_UPDATE:
      return {
        ...state,
        ...action.payload
      };
    case USER_REMOVE:
      return undefined;
    case USER_GET:
      return {
        ...state
      };
    default:
      return state;
  }
}
