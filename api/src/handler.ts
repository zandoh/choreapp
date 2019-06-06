import lambdaPlayground from "graphql-playground-middleware-lambda";
import { Handler, Context, Callback, APIGatewayEvent } from "aws-lambda";
import { makeExecutableSchema } from "graphql-tools";
import { typeDefs, resolvers } from "./graphql/server";
const { ApolloServer } = require("apollo-server-lambda");

const graphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
  logger: console
});

export const graphqlHandler: Handler = (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback
) => {
  const requestOrigin = event.headers.origin,
    callbackFilter = function(error: any, output: any) {
      if (requestOrigin === process.env.CORS_ORIGIN) {
        output.headers["Access-Control-Allow-Origin"] = process.env.CORS_ORIGIN;
        output.headers["Access-Control-Allow-Credentials"] = "true";
      }
      callback(error, output);
    };
  const handler = new ApolloServer({
    schema: graphQLSchema,
    tracing: true
  }).createHandler();

  return handler(event, context, callbackFilter);
};

export const playgroundHandler: (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback
) => void = lambdaPlayground({
  endpoint: process.env.GRAPHQL_ENDPOINT
});
