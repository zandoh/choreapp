import { APIGatewayProxyEvent, Context, Callback } from 'aws-lambda';
import { ApolloServer } from 'apollo-server-lambda';
import { ApolloGateway, RemoteGraphQLDataSource } from '@apollo/gateway';
import { DynamoClient } from 'choreapp-util/dynamo';

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
 * Injects the user into the incoming API gateway event after
 * JWT claims have been verified
 */
export interface AppGraphQLEvent extends APIGatewayProxyEvent {
	user: AppUserContext;
}

/**
 * Data passed to every resolver function
 */
export interface AppGraphQLContext {
	dynamoClient: DynamoClient;
	user: AppUserContext;
}

class AuthenticatedDataSource extends RemoteGraphQLDataSource {
	willSendRequest(params: any) {
		const { request, context } = params;
		// pass the user's id from the context to underlying services
		// as a header called `user-id`
		request?.http?.headers.set('user-id', context.userID);
	}
}

const getUserId = (token: string): AppUserContext => {
	return {
		userID: token,
		username: '',
		email: '',
		organization: '',
	};
};

const server = new ApolloServer({
	gateway: new ApolloGateway({
		serviceList: [{ name: 'random', url: process.env.RANDOM_FEDERATION_URL }],
		buildService({ url }) {
			return new AuthenticatedDataSource({ url });
		},
	}),
	subscriptions: false,
	debug: process.env.APP_ENV === Environments.PROD ? false : true,
	context: ({ event }: { event: AppGraphQLEvent }): AppGraphQLContext => {
		const token =
			event?.headers['authorization'] || event?.headers['Authorization'];

		// try to retrieve a user with the token
		const user = getUserId(token);

		// add the user to the context
		return {
			dynamoClient: new DynamoClient(),
			user,
		};
	},
});

export const handler = (
	event: APIGatewayProxyEvent,
	context: Context,
	callback: Callback,
) => {
	server.createHandler({
		cors: {
			origin: process.env.CORS_ORIGIN,
			credentials: true,
		},
	})(event, context, (err: any, data: any) => {
		callback(null, data);
	});
};
