import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { WebResponse } from 'src/model/web.model';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const errorResponse: WebResponse<null> = {
      message:
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : (exceptionResponse as any).message || 'An error occurred',
      errors: this.getErrors(exceptionResponse),
    };

    res.status(status).json(errorResponse);
  }

  private getErrors(
    exceptionResponse: any,
  ): Record<string, string[]> | undefined {
    if (
      typeof exceptionResponse === 'object' &&
      'message' in exceptionResponse
    ) {
      return {
        general: [exceptionResponse.message],
      };
    }
    return undefined;
  }
}
