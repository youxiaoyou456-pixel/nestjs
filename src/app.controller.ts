import { Controller, Get, Logger, Param,Query, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { get } from 'http';
import { QueryFailedError } from 'typeorm';
import { User } from './common/user.decorator';
import { JwtPayload } from './auth/jwt-auth.strategy';
import { REQUEST } from '@nestjs/core';
import { Public } from 'src/common/public.decorator';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

 

 
  @Get('/admin/firstTest')
  firstTest(@Request() req): string {
    //  console.log('query = ',req.query); // 
    // console.log('source = ',req.source); // 获取拦截器中添加的参数
    return this.appService.firstTest();
  }

  @Get('/admin/ExceptionTest')
  ExceptionTest(@Request() req): string  {
    // console.log('source = ',req.source); // 获取拦截器中添加的参数
    return this.appService.ExceptionTest();
  }


  @Get('/admin/addUser')
  async addUser(@Query() pamas: { name: string, email: string },@User('name') User,@Request() req) {
  
    Logger.log("user.name ="+User);
    // throw new QueryFailedError('SELECT * FROM users', [], new Error('Test Error'));
    let result = await this.appService.addUser(pamas);
    if(result){
        return 'success';
    }else{
       return 'fail';
    }
    
  }
}
