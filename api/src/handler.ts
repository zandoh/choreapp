import { Context, Callback, APIGatewayProxyEvent } from "aws-lambda";
import { ApolloServer, makeExecutableSchema } from "apollo-server-lambda";
import { resolvers, typeDefs } from "./graphql/app";
import { DynamoClient } from "./lib/dynamo";
import { HttpClient } from "./lib/http";

/**
 * User data parsed out of the JWT
 */
export interface AppUserContext {
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

/**
 * Creates a new ApolloServer and injects
 * data into the context that is needed by the application on ApolloServer's
 * callback for context
 */
const server = new ApolloServer({
  schema: makeExecutableSchema({
    typeDefs,
    resolvers
  }),
  debug: process.env.APP_ENV === "prod" ? false : true,
  context: ({
    event,
    context
  }: {
    event: AppGraphQLEvent;
    context: AppGraphQLContext;
  }): AppGraphQLContext => {
    return {
      dynamoClient: new DynamoClient(),
      user: event.user
    };
  }
});

/**
 * Handler function for GraphQL
 * @param event
 * @param context
 * @param callback
 */
export const handler = (
  event: APIGatewayProxyEvent,
  context: Context,
  callback: Callback
) => {
  if (
    event.headers &&
    event.headers["Content-Type"] &&
    event.headers["Content-Type"] === "application/graphql"
  ) {
    event.body = JSON.stringify({ query: event.body });
  }

  server.createHandler({
    cors: {
      origin: process.env.CORS_ORIGIN,
      credentials: true
    }
  })(event, context, (err: any, data: any) => {
    if (err) {
      HttpClient.sendErrorResponse(err, callback);
    } else {
      callback(null, data);
    }
  });
};
