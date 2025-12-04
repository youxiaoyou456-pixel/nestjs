// database-error.filter.ts
import { ArgumentsHost,Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export  class DatabaseErrorFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    Logger.log(`11111111111111111111`);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
   
    let msg ="数据库操作异常"
   // 特殊处理连接错误
   if (this.isConnectionError(exception)) {
    msg="数据库连接异常，正在尝试重连..."
   }else{
    msg=exception.message;
   }

    const errorResponse = {
        data: {},
        message: msg,
        code: -1,
      };
  
    // 设置返回的状态码， 请求头，发送错误信息
    response.status(200);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);

    
  }

  private isConnectionError(exception: QueryFailedError): boolean {
    return exception.message.includes('ECONNREFUSED') 
      || exception.message.includes('ETIMEDOUT');
  }
}

