import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: process.env.REACT_APP_COGNITO_USERPOOL as string,
  ClientId: process.env.REACT_APP_COGNITO_CLIENT as string
};
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

export class CognitoService {
  static login(username: string, password: string) {
    const authData = new AmazonCognitoIdentity.AuthenticationDetails({
      Username: username,
      Password: password
    });
    const userData = {
      Username: username,
      Pool: userPool
    };
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authData, {
      onSuccess: result => {
        console.log("result ", result);
        const jwt = result.getAccessToken().getJwtToken();
        console.log("jwt ", jwt);
      },
      onFailure: err => {
        alert(err.message || JSON.stringify(err));
      },
      newPasswordRequired: (userAttributes, requiredAttributes) => {
        delete userAttributes.email_verified;

        // store userAttributes on global variable
        const sessionUserAttributes = userAttributes;
        console.log("sessionUserAttributes ", sessionUserAttributes);
        console.log("requiredAttributes ", requiredAttributes);
      }
    });
  }
}
