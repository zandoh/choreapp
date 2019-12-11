/**
 * Class to extend from the base functionality of Error
 */
export class AppError extends Error {
  status: number;
  name: string;

  constructor(message: string, status: number) {
    super(message);

    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    this.status = status || 500;
  }
}
