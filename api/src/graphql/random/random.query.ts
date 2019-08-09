import { AppGraphQLContext } from "../../handler";
import { AppDynamoTables } from "../../lib/dynamo";

interface AppRandomList {
  list: number[];
  length: number;
  sum: number;
}

interface AppRandomDynamoData {
  randomNumberId: string;
  username: string;
}

export const Query = {
  getRandomList: (root: any, args: { length: number }): AppRandomList => {
    const dataList: number[] = [];
    for (let i = 0; i < args.length; i++) {
      dataList.push(parseInt((Math.random() * 100).toString()));
    }

    return {
      list: dataList,
      length: args.length,
      sum: dataList.reduce((a: number, b: number) => a + b, 0)
    };
  },
  getRandomNumberById: async (
    root: any,
    args: { numberId: string },
    context: AppGraphQLContext
  ): Promise<AppRandomDynamoData[]> => {
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

    const response: AppRandomDynamoData[] = dynamoClient.getDynamoResponse(
      await dynamoClient.docClient.query(params).promise()
    );

    return response;
  }
};
