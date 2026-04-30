import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import type { Request, Response } from "express";
import { map, Observable } from "rxjs";

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const http = context.switchToHttp()
    const response = http.getResponse<Response>()
    const { method, url } = http.getRequest<Request>()
    return next.handle().pipe(
      map((data) => {
        const statusCode = response.statusCode;
        return {
          statusCode,
          method,
          url,
          data
        }
      }
      )
    )
  }
}