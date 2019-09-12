import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";
import {
  USER_NEW_PASSWORD,
  USER_LOGIN,
  USER_LOGIN_FAILED
} from "../store/user/types";
import { store } from "..";

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

const loginFailed = (err: any) => {
  const error = err.message || JSON.stringify(err);
  store.dispatch({
    type: USER_LOGIN_FAILED,
    payload: {
      errorMessage: error
    }
  });
};
export class CognitoService {
  static sessionAttributes = null;
  static cognitoUser: AmazonCognitoIdentity.CognitoUser;

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
      newPasswordRequired: (userAttributes, requiredAttributes) => {
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
    const currentUser = userPool.getCurrentUser();

    if (currentUser != null) {
      return currentUser.getSession((err: any, session: any) => {
        if (err || !session.isValid()) {
          return undefined;
        }
        return session.getIdToken().getJwtToken();
      });
    }

    return undefined;
  }
}
