export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGOUT = "USER_LOGOUT";
export const USER_GET = "USER_GET";
export const USER_NEW_PASSWORD = "USER_NEW_PASSWORD";
export const USER_LOGIN_FAILED = "USER_LOGIN_FAILED";

export interface UserState {
  username?: string;
  needsNewPassword?: boolean;
  jwt?: string;
  loginFailed?: boolean;
}

interface UserLoginAction {
  type: typeof USER_LOGIN;
  payload: {
    jwt: string;
  };
}

interface UserLogoutAction {
  type: typeof USER_LOGOUT;
}

interface UserGetAction {
  type: typeof USER_GET;
}

interface UserNewPasswordAction {
  type: typeof USER_NEW_PASSWORD;
  payload: {
    needsNewPassword: boolean;
  };
}

interface UserLoginFailed {
  type: typeof USER_LOGIN_FAILED;
  payload: {
    errorMessage: string;
  };
}

export type UserActionTypes =
  | UserLoginAction
  | UserLogoutAction
  | UserNewPasswordAction
  | UserLoginFailed
  | UserGetAction;
