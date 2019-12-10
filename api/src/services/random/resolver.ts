import { APIGatewayProxyEvent, Context, Callback } from 'aws-lambda';
import { ApolloServer } from 'apollo-server-lambda';
import { buildFederatedSchema } from '@apollo/federation';
import { Query } from './random.query';
import typeDefs from './schema.graphql';
import { Resolvers } from '../../schemaTypes';
import {
	Environments,
	getUserFromId,
	AppGraphQLContext,
} from '../../lib/choreapp-util/common';
import { DynamoClient } from '../../lib/choreapp-util/dynamo';

const resolvers: Resolvers = {
	Query: Query,
};

const server = new ApolloServer({
	schema: buildFederatedSchema([
		{
			typeDefs,
			resolvers,
		},
	]),
	debug: process.env.APP_ENV === Environments.PROD ? false : true,
	context: ({ event }: { event: APIGatewayProxyEvent }): AppGraphQLContext => {
		const userID = event.headers['user-id'];
		return {
			dynamoClient: new DynamoClient(),
			user: getUserFromId(userID),
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
	})(event, context, (_err: any, data: any) => {
		callback(null, data);
	});
};
