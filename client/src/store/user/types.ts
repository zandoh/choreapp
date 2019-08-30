export const USER_UPDATE = "USER_UPDATE";
export const USER_REMOVE = "USER_REMOVE";
export const USER_GET = "USER_GET";

export interface UserPayload {
  username: string;
  password: string;
}

export interface UserState {
  username?: string;
}

interface UserUpdateAction {
  type: typeof USER_UPDATE;
  payload: UserPayload;
}

interface UserRemoveAction {
  type: typeof USER_REMOVE;
}

interface UserGetAction {
  type: typeof USER_GET;
}

export type UserActionTypes =
  | UserUpdateAction
  | UserRemoveAction
  | UserGetAction;
