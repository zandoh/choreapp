import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";
import {
	USER_NEW_PASSWORD,
	USER_LOGIN,
	USER_LOGIN_FAILED,
	USER_LOGOUT,
	USER_FORGOT_PASSWORD,
	USER_FORGOT_PASSWORD_FAILED,
	USER_RESET_PASSWORD_SUCCESS,
	USER_RESET_PASSWORD_FAILED
} from "../store/user/types";
import { store } from "..";
import { AppCognitoUser } from "../types/cognito";

const poolData = {
	UserPoolId: process.env.REACT_APP_COGNITO_USERPOOL as string,
	ClientId: process.env.REACT_APP_COGNITO_CLIENT as string
};
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

const logUserIn = (result: AmazonCognitoIdentity.CognitoUserSession) => {
	const jwt = result.getAccessToken().getJwtToken();
	store.dispatch({
		type: USER_LOGIN,
		payload: {
			jwt
		}
	});
};

const logUserOut = (user: AmazonCognitoIdentity.CognitoUser) => {
	user.signOut();
	store.dispatch({
		type: USER_LOGOUT
	});
};

const loginFailed = (err: any) => {
	const error = err.message || JSON.stringify(err);
	store.dispatch({
		type: USER_LOGIN_FAILED,
		payload: {
			errorMessage: error
		}
	});
};

const forgotPassword = (data: any) => {
	console.log("ForgotPassword success data ", data);
	store.dispatch({
		type: USER_FORGOT_PASSWORD
	});
};

const forgotPasswordFailed = (err: any) => {
	const error = err.message || JSON.stringify(err);
	store.dispatch({
		type: USER_FORGOT_PASSWORD_FAILED,
		payload: {
			errorMessage: error
		}
	});
};

const resetPasswordSuccess = () => {
	store.dispatch({
		type: USER_RESET_PASSWORD_SUCCESS
	});
};

const resetPasswordFailed = (err: any) => {
	const error = err.message || JSON.stringify(err);
	store.dispatch({
		type: USER_RESET_PASSWORD_FAILED,
		payload: {
			errorMessage: error
		}
	});
};
export class CognitoService {
	static sessionAttributes = null;
	static cognitoUser: AmazonCognitoIdentity.CognitoUser;
	static unauthedCognitoUser: AmazonCognitoIdentity.CognitoUser;

	static login(username: string, password: string) {
		const authData = new AmazonCognitoIdentity.AuthenticationDetails({
			Username: username,
			Password: password
		});
		const userData = {
			Username: username,
			Pool: userPool
		};
		CognitoService.cognitoUser = new AmazonCognitoIdentity.CognitoUser(
			userData
		);
		CognitoService.cognitoUser.authenticateUser(authData, {
			onSuccess: result => {
				logUserIn(result);
			},
			onFailure: err => {
				loginFailed(err);
			},
			newPasswordRequired: userAttributes => {
				delete userAttributes.email_verified;
				CognitoService.sessionAttributes = userAttributes;
				store.dispatch({
					type: USER_NEW_PASSWORD,
					payload: { needsNewPassword: true }
				});
			}
		});
	}

	static setNewPassword(newPassword: string) {
		CognitoService.cognitoUser.completeNewPasswordChallenge(
			newPassword,
			CognitoService.sessionAttributes,
			{
				onSuccess: result => {
					logUserIn(result);
				},
				onFailure: err => {
					loginFailed(err);
				}
			}
		);
	}

	static getUserTokenFromLocalStorage() {
		const currentUser: AppCognitoUser = userPool.getCurrentUser();

		if (currentUser != null) {
			return currentUser.getSession((err: any, session: any) => {
				if (err || !session.isValid()) {
					return undefined;
				}
				// check if we need to refresh cogntio user
				// as instance would be undefined since auth came from jwt
				if (!this.cognitoUser) {
					CognitoService.cognitoUser = new AmazonCognitoIdentity.CognitoUser({
						Username: currentUser.username as string,
						Pool: userPool
					});
				}
				return session.getIdToken().getJwtToken();
			});
		}

		return undefined;
	}

	static logout() {
		logUserOut(this.cognitoUser);
	}

	static forgotPassword(username: string) {
		const userData = {
			Username: username,
			Pool: userPool
		};
		CognitoService.unauthedCognitoUser = new AmazonCognitoIdentity.CognitoUser(
			userData
		);
		CognitoService.unauthedCognitoUser.forgotPassword({
			onSuccess: data => {
				forgotPassword(data);
			},
			onFailure: err => {
				forgotPasswordFailed(err);
			}
		});
	}

	static resetPassword(verificationCode: string, newPassword: string) {
		CognitoService.unauthedCognitoUser.confirmPassword(
			verificationCode,
			newPassword,
			{
				onSuccess() {
					resetPasswordSuccess();
				},
				onFailure(err) {
					resetPasswordFailed(err);
				}
			}
		);
	}
}
