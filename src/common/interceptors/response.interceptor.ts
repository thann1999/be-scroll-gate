import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { formatSuccessResponse } from '../utils';
import { Request } from 'express';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  private readonly logger = new Logger();

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { originalUrl, method } = context
      .switchToHttp()
      .getRequest<Request>();
    this.logger.log(`[Logging] Request to ${originalUrl} method ${method}`);

    return next
      .handle()
      .pipe(map((value) => formatSuccessResponse(null, 'Success', value)));
  }
}
