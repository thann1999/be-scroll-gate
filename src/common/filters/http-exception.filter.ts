import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { formatErrorResponse } from '@common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private logger = new Logger();

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = this.getStatusCode(exception);
    const message = this.getErrorMessage(exception);
    const { originalUrl, method } = request;

    this.logger.error(
      `[Error] Code:${status} Request: ${originalUrl} method: ${method} message: ${message} `,
    );

    response.status(status).json(formatErrorResponse(status, message));
  }

  private getStatusCode = (exception: any): number => {
    return exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
  };

  private getErrorMessage = (exception: any): any => {
    const { response = null } = exception;
    if (response) {
      return response.message || String(response);
    }
    return String(exception);
  };
}
