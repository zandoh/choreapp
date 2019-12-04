import { combineReducers } from "redux";
import { userReducer } from "./user/reducer";
import { UserState, UserActionTypes, USER_LOGOUT } from "./user/types";

export type AppActions = UserActionTypes;

export const appReducer = combineReducers({
	user: userReducer
});

export const rootReducer = (state: AppDataState, action: AppActions) => {
	if (action.type === USER_LOGOUT) {
		state = undefined;
	}

	return appReducer(state, action);
};

export type AppState = ReturnType<typeof appReducer>;
export type AppDataState =
	| {
			user: UserState;
	  }
	| undefined;
