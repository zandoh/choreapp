import { AppDynamoTables } from "../../lib/choreapp-util/dynamo";
import { AppGraphQLContext } from "../../lib/choreapp-util/common";
import {
	Random,
	QueryGetRandomNumberByIdArgs,
	QueryGetRandomListArgs,
	RandomDynamoData,
	Resolvers
} from "../../schemaTypes";

export const resolvers: Resolvers = {
	Query: {
		getRandomList: (root: any, args: QueryGetRandomListArgs): Random => {
			const { length } = args;
			const dataList: number[] = [];
			for (let i = 0; i < length!; i++) {
				dataList.push(parseInt((Math.random() * 100).toString()));
			}

			return {
				list: dataList,
				length: length,
				sum: dataList.reduce((a: number, b: number) => a + b, 0)
			};
		},
		getRandomNumberById: async (
			root: any,
			args: QueryGetRandomNumberByIdArgs,
			context: AppGraphQLContext
		): Promise<RandomDynamoData[]> => {
			const { dynamoClient } = context;
			const { numberId } = args;

			const random = dynamoClient.getEnvTable(AppDynamoTables.random);
			const params: AWS.DynamoDB.DocumentClient.QueryInput = {
				TableName: random,
				KeyConditionExpression: "#id = :idVal",
				ExpressionAttributeNames: {
					"#id": "randomNumberId"
				},
				ExpressionAttributeValues: {
					":idVal": numberId
				}
			};

			const response: RandomDynamoData[] = dynamoClient.getDynamoResponse(
				await dynamoClient.docClient.query(params).promise()
			);

			return response;
		}
	}
};
