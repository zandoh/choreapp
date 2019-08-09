import AWS from "aws-sdk";
import { PromiseResult } from "aws-sdk/lib/request";

/**
 * Enum of all the DynamoDB tables the system interacts with
 */
export enum AppDynamoTables {
  random = "Random"
}

/**
 * Helper abstraction of aws-sdk DynamoDB functionality
 */
export class DynamoClient {
  docClientInstance?: AWS.DynamoDB.DocumentClient;

  /**
   * Maintains a cached instance of the aws-sdk document client
   * for DynamoDB operations
   */
  get docClient(): AWS.DynamoDB.DocumentClient {
    if (!this.docClientInstance) {
      this.docClientInstance = new AWS.DynamoDB.DocumentClient({
        maxRetries: 1,
        httpOptions: { connectTimeout: 200 }
      });
    }
    return this.docClientInstance;
  }

  getEnvTable(name: AppDynamoTables): string {
    return `${name}-${process.env.DYNAMO_DB_ENV}`;
  }

  /**
   * Helper function to ensure the scan searches the entirety of a DynamoDB
   *
   * @param params parameters by which to scan the table
   */
  async scanTable<T>(
    params: AWS.DynamoDB.DocumentClient.ScanInput
  ): Promise<T[]> {
    let response: T[] = [];
    let startKey, currentScanResponse;
    const docClient = this.docClient;

    do {
      if (startKey) {
        params = {
          ...params,
          ExclusiveStartKey: startKey
        };
      }
      currentScanResponse = await docClient.scan(params).promise();
      response = [...response, ...(currentScanResponse.Items as T[])];
      startKey = currentScanResponse.LastEvaluatedKey;
    } while (currentScanResponse.LastEvaluatedKey);

    return response;
  }

  /**
   * Used to determine if a Dynamo Get or Dynamo Query
   * response returned an no item (get) or an empty set (query)
   */
  getDynamoResponse(
    data:
      | PromiseResult<AWS.DynamoDB.DocumentClient.QueryOutput, AWS.AWSError>
      | PromiseResult<AWS.DynamoDB.DocumentClient.GetItemOutput, AWS.AWSError>
  ): any | any[] {
    if (DynamoClient.isDyanmoItems(data)) {
      return data.Items;
    } else if (DynamoClient.isDynamoItem(data)) {
      return data.Item;
    }
    return;
  }

  static isDyanmoItems = (
    data: any
  ): data is PromiseResult<
    AWS.DynamoDB.DocumentClient.QueryOutput,
    AWS.AWSError
  > => {
    return data.Items || false;
  };

  static isDynamoItem = (
    data: any
  ): data is PromiseResult<
    AWS.DynamoDB.DocumentClient.GetItemOutput,
    AWS.AWSError
  > => {
    return data.Item || false;
  };
}
