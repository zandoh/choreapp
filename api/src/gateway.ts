import { APIGatewayProxyEvent, Context, Callback } from 'aws-lambda';
import { ApolloServer } from 'apollo-server-lambda';
import { ApolloGateway, RemoteGraphQLDataSource } from '@apollo/gateway';

export enum Environments {
	PROD = 'prod',
	DEV = 'dev',
	LOCAL = 'local',
}

interface AppGraphQLContext {
	userID: string;
}

class AuthenticatedDataSource extends RemoteGraphQLDataSource {
	willSendRequest(params: any) {
		const { request, context } = params;
		// pass the user's id from the context to underlying services
		// as a header called `user-id`
		request?.http?.headers.set('user-id', context.userID);
	}
}

const getUserId = (token: string): string => token;

const server = new ApolloServer({
	gateway: new ApolloGateway({
		serviceList: [{ name: 'random', url: process.env.CHORES_FEDERATION_URL }],
		buildService({ url }) {
			return new AuthenticatedDataSource({ url });
		},
	}),
	subscriptions: false,
	debug: process.env.APP_ENV === Environments.PROD ? false : true,
	context: ({ event }): AppGraphQLContext => {
		const token =
			event?.headers['authorization'] || event?.headers['Authorization'];

		// try to retrieve a user with the token
		const userID = getUserId(token);

		// add the user to the context
		return { userID };
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
