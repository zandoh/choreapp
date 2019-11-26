import { combineReducers } from "redux";
import { userReducer } from "./user/reducer";
import { UserState } from "./user/types";

export const rootReducer = combineReducers({
  user: userReducer
});

export type AppState = ReturnType<typeof rootReducer>;
export type AppDataState = {
  user: UserState
}
