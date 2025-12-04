import { HttpException, Injectable } from '@nestjs/common';
import { User } from 'src/entitys/user';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { ArgumentOutOfRangeError } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  firstTest(): string {
    
    return 'Hello World!';
  }

  ExceptionTest():string{

    throw new HttpException("exception test" , 200);
  //  throw new ArgumentOutOfRangeError();
    return "";
  }

  async addUser(pamas):Promise<boolean>{
    let result = false;
     if(pamas?.name && pamas?.email){      
        //不使用async await 会报错，然后就不会抛出异常，就不能全部捕获异常了
       await this.userRepository.save({
          username: pamas.name,
          email: pamas.email,
        })
        result = true
      }else{
        throw new HttpException('请输入用户名和邮箱',200);
      }
     return result;
  }
}
