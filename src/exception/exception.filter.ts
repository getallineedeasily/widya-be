import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { AppError } from './exception.js';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  catch(exception: any, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    let statusCode = 500;
    let responseBody = {
      message: 'Server is unavailable!',
    };

    if (exception instanceof AppError) {
      statusCode = exception.statusCode;
      responseBody = {
        message: exception.message,
      };
    } else if (exception instanceof HttpException) {
      statusCode = exception.getStatus();

      const exceptionResponse = exception.getResponse();

      responseBody =
        typeof exceptionResponse === 'string'
          ? { message: exceptionResponse }
          : (exceptionResponse as typeof responseBody);
    }
    
    httpAdapter.reply(ctx.getResponse(), responseBody, statusCode);
  }
}
