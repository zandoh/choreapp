import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";

interface CognitoUserAttributes {
	username?: string;
}

export type AppCognitoUser =
	| (AmazonCognitoIdentity.CognitoUser & CognitoUserAttributes)
	| null;
