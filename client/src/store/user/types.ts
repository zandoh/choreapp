export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGOUT = "USER_LOGOUT";
export const USER_GET = "USER_GET";
export const USER_NEW_PASSWORD = "USER_NEW_PASSWORD";
export const USER_LOGIN_FAILED = "USER_LOGIN_FAILED";
export const USER_FORGOT_PASSWORD = "USER_FORGOT_PASSWORD";
export const USER_FORGOT_PASSWORD_FAILED = "USER_FORGOT_PASSWORD_FAILED";
export const USER_RESET_PASSWORD_SUCCESS = "USER_RESET_PASSWORD_SUCCESS";
export const USER_RESET_PASSWORD_FAILED = "USER_RESET_PASSWORD_FAILED";

export interface UserState {
	needsNewPassword?: boolean;
	jwt?: string;
	loginFailed?: boolean;
	errorMessage?: string;
	forgotPassword?: boolean;
	forgotPasswordFailed?: boolean;
	resetPasswordSuccess?: boolean;
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

interface UserForgotPassword {
	type: typeof USER_FORGOT_PASSWORD;
}

interface UserForgotPasswordFailed {
	type: typeof USER_FORGOT_PASSWORD_FAILED;
	payload: {
		errorMessage: string;
	};
}

interface UserResetPasswordSuccess {
	type: typeof USER_RESET_PASSWORD_SUCCESS;
}

interface UserResetPasswordFailed {
	type: typeof USER_RESET_PASSWORD_FAILED;
	payload: {
		errorMessage: string;
	};
}

export type UserActionTypes =
	| UserLoginAction
	| UserLogoutAction
	| UserNewPasswordAction
	| UserLoginFailed
	| UserGetAction
	| UserForgotPassword
	| UserForgotPasswordFailed
	| UserResetPasswordSuccess
	| UserResetPasswordFailed;
