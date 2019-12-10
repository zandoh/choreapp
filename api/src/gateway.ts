import { APIGatewayProxyEvent, Context, Callback } from 'aws-lambda';
import { ApolloServer } from 'apollo-server-lambda';
import { ApolloGateway, RemoteGraphQLDataSource } from '@apollo/gateway';
import {
	Environments,
	getUserFromToken,
	AppUserContext,
} from './lib/choreapp-util/common';

class AuthenticatedDataSource extends RemoteGraphQLDataSource {
	willSendRequest(params: any) {
		const { request, context } = params;
		// pass the user's id from the context to underlying services
		// as a header called `user-id`
		request?.http?.headers.set('user-id', context.userID);
	}
}

const server = new ApolloServer({
	gateway: new ApolloGateway({
		serviceList: [{ name: 'random', url: process.env.RANDOM_FEDERATION_URL }],
		buildService({ url }) {
			return new AuthenticatedDataSource({ url });
		},
	}),
	subscriptions: false,
	debug: process.env.APP_ENV === Environments.PROD ? false : true,
	context: ({ event }: { event: APIGatewayProxyEvent }): AppUserContext => {
		const token =
			event?.headers['authorization'] || event?.headers['Authorization'];

		return getUserFromToken(token);
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
