export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGOUT = "USER_LOGOUT";
export const USER_GET = "USER_GET";
export const USER_NEW_PASSWORD = "USER_NEW_PASSWORD";

export interface UserPayload {
  username: string;
  password: string;
}

export interface CognitoNewPasswordUserAttributes {}

// ---------------------------------------------------------

export interface UserState {
  username?: string;
}

interface UserLoginAction {
  type: typeof USER_LOGIN;
  payload: UserPayload;
}

interface UserLogoutAction {
  type: typeof USER_LOGOUT;
}

interface UserGetAction {
  type: typeof USER_GET;
}

interface UserNewPasswordAction {
  type: typeof USER_NEW_PASSWORD;
  payload: CognitoNewPasswordUserAttributes;
}

export type UserActionTypes =
  | UserLoginAction
  | UserLogoutAction
  | UserNewPasswordAction
  | UserGetAction;
