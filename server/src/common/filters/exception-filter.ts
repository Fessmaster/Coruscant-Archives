import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  type LoggerService,
} from '@nestjs/common';
import type { Response, Request } from 'express';

@Catch()
@Injectable()
export class GlobalExceptionFilter implements ExceptionFilter {
  
  private readonly logger = new Logger(GlobalExceptionFilter.name)

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let statusCode: number;
    let message: string;    
    let details: any = null;

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      message =
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : (exceptionResponse as any).message || exception.message;
      
      details = (exceptionResponse as any).details || null;
    } else {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal server error';

      this.logger.error({
        message: 'Unhandled exception',
        error: exception,
        path: request.url,
        method: request.method,
        userId: (request as any).user?.id
      })      
    }
    const errorResponse = {
        success: false,
        error: {
          code: statusCode,
          message: message,
          details: details,
          timestamp: new Date().toISOString(),
          path: request.url,
          method: request.method
        }
      }

      this.logger.warn({
        statusCode,
        message,
        path: request.url,
        method: request.method,
        userId: (request as any).user?.id
      })

      response.status(statusCode).json(errorResponse)
  }
}
