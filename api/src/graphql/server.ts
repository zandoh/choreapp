// @ts-ignore
import { importSchema } from "graphql-import";
import { randomResolver } from "./random/resolver";
const randomSchema = require("./random/schema.graphql");

export const typeDefs = importSchema(randomSchema);

export const resolvers = {
  ...randomResolver
};
