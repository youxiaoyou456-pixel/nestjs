import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
  import { map, Observable ,tap } from 'rxjs';
import { LoggerService } from 'src/logger/logger.service';
  
  @Injectable()
  export class TransformInterceptor implements NestInterceptor {
      constructor(private readonly logger: LoggerService) {} // 注入 LoggerService
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      // 在请求到达 Service 之前执行的逻辑
        // const request = context.switchToHttp().getRequest<any>();
        // const queryParams = new URLSearchParams(request.query);
        // console.log('orgin queryParams',queryParams);
        // queryParams.set('source', 'test'); // 添加新的参数
        // request.query = queryParams; 
        
        // const request = context.switchToHttp().getRequest<any>();
        // request.source = 'test';


    // const request = context.switchToHttp().getRequest();
    // const { method, url, headers, body, query, params } = request;
    //       // 记录请求的基本信息
    // this.logger.log('请求信息:', {
    //   url,
    //   method,
    //   headers,
    //   body,
    //   query,
    //   params,
    //   message: '请求信息',
    // });


      
      return next.handle().pipe(

      //   tap((data) => {
      //   // 记录响应时间
      //   const responseTime = Date.now() ;

      //   // 记录请求的响应时间和状态
      //   this.logger.log('响应信息:', {
      //     url,
      //     method,
      //     responseTime: `${responseTime}ms`,
      //     statusCode: data?.statusCode || 200, // 默认 200 状态码
      //     code: 0,
      //     msg: 'success',
      //   });
      // }),



        map((data) => {
          return {
            data,
            code: 0,
            msg: '请求成功',
          };
        }),
      );



    }
  }
  