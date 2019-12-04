import {
	UserState,
	UserActionTypes,
	USER_LOGIN,
	USER_NEW_PASSWORD,
	USER_LOGIN_FAILED,
	USER_LOGOUT,
	USER_FORGOT_PASSWORD,
	USER_FORGOT_PASSWORD_FAILED,
	USER_RESET_PASSWORD_SUCCESS,
	USER_RESET_PASSWORD_FAILED
} from "./types";

const initialState: UserState = {
	needsNewPassword: false,
	loginFailed: false,
	errorMessage: "",
	forgotPassword: false,
	forgotPasswordFailed: false,
	resetPasswordSuccess: false
};

export function userReducer(
	state: UserState = initialState,
	action: UserActionTypes
) {
	switch (action.type) {
		case USER_LOGIN:
			return {
				...state,
				...action.payload,
				loginFailed: false
			};
		case USER_NEW_PASSWORD:
			return {
				...state,
				...action.payload,
				loginFailed: false
			};
		case USER_LOGIN_FAILED:
			return {
				...state,
				...action.payload,
				jwt: undefined,
				loginFailed: true
			};
		case USER_LOGOUT:
			return state;
		case USER_FORGOT_PASSWORD:
			return {
				...state,
				forgotPassword: true
			};
		case USER_FORGOT_PASSWORD_FAILED:
			return {
				...state,
				...action.payload,
				forgotPasswordFailed: true
			};
		case USER_RESET_PASSWORD_SUCCESS:
			return {
				...state,
				resetPasswordSuccess: true
			};
		case USER_RESET_PASSWORD_FAILED:
			return {
				...state,
				resetPasswordSuccess: false
			};
		default:
			return state;
	}
}
