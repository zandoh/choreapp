import { DynamoClient } from './dynamo';

export enum Environments {
	PROD = 'prod',
	DEV = 'dev',
	LOCAL = 'local',
}

/**
 * User data parsed out of the JWT
 */
export interface AppUserContext {
	userID: string;
	username: string;
	email: string;
	organization: string;
}

/**
 * Parses the JWT from the request to get a user
 * @param token JWT
 */
export const getUserFromToken = (token: string): AppUserContext => ({
	userID: 'abc123',
	username: 'test',
	email: 'test@test.com',
	organization: 'testco',
});

export const getUserFromId = (userID: string): AppUserContext => ({
	userID: 'abc123',
	username: 'test',
	email: 'test@test.com',
	organization: 'testco',
});

/**
 * Data passed to every resolver function
 */
export interface AppGraphQLContext {
	dynamoClient: DynamoClient;
	user: AppUserContext;
}
