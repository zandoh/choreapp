import { UserState, UserActionTypes, USER_LOGIN } from "./types";

const initialState: UserState = {
  username: "defaultUser"
};

export function userReducer(
  state: UserState = initialState,
  action: UserActionTypes
) {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}
