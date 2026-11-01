export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class ServerError extends AppError {
  constructor(message: string = 'Server is unavailable') {
    super(message, 500);
  }
}

export class UserError extends AppError {
  constructor(message: string = 'Please try again!') {
    super(message, 400);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Not found!') {
    super(message, 404);
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Please login first!') {
    super(message, 401);
  }
}
export class AuthorizationError extends AppError {
  constructor(message: string = 'Forbidden!') {
    super(message, 403);
  }
}
