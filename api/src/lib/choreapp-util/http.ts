import { Callback } from "aws-lambda";

export enum ResponseCode {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL = 500
}

export interface AppError {
  statusCode: ResponseCode;
  message: string;
  error: Error;
}

interface AppResponse {
  body: AppResponse | AppErrorResponse;
  statusCode: number;
  headers: { [key: string]: string };
}

interface AppErrorResponse {
  statusCode: ResponseCode;
  message: string;
}

export class HttpClient {
  /**
   * Sends the response back to the client.
   * Also provides a callback filter on the request only from
   * the set application environment CORS_ORIGIN
   *
   * @param body Requests response
   * @param statusCode HTTP status code of the response from the enum
   */
  static sendResponse(
    body: AppResponse | AppErrorResponse,
    callback: Callback,
    statusCode: ResponseCode
  ) {
    const response: AppResponse = {
      body,
      statusCode,
      headers: {}
    };

    callback(null, response);
  }

  /**
   * Creates a body for the error and sends the response
   * @param error Application error
   */
  static sendErrorResponse(error: AppError, callback: Callback) {
    const response: AppErrorResponse = {
      statusCode: error.statusCode,
      message: error.message
    };

    this.sendResponse(response, callback, error.statusCode);
  }
}
