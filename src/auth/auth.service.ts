import { HttpException, Injectable ,Logger} from '@nestjs/common';
import { AuthEntity } from './entitys/AuthEntity';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { CreateUpdateDto } from 'src/auth/dtos/creat_update.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/auth/jwt-auth.strategy';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity)
    private readonly userRepository: Repository<AuthEntity>,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
  ) {}

  async create(loginDto: CreateUpdateDto){
    if(loginDto?.username && loginDto?.password){

      const user = await this.userRepository.findOne({
        where: {
          username: loginDto.username
        }
      })
      if(!user){
        //没有找到就开始注册
          let saveModel =  await this.userRepository.save({
            username: loginDto.username,
            password: loginDto.password,
          })
        if(saveModel){
          return saveModel
        }
      }else{
        throw new HttpException('用户名已存在',200)
      }

    }else{
      throw new HttpException('请输入用户名和密码',200)
    }
  }
  async login(loginDto: CreateUpdateDto){
    Logger.log("loginDto.username = " + loginDto.username);
    Logger.log("loginDto.password = " + loginDto.password);
    if(loginDto?.username && loginDto?.password){
        try{
            const user = await this.userRepository.findOne({
                where: {
                  username: loginDto.username,
                  password: loginDto.password,
                }
              })
              if(user){
                //找到了就返回token
                const payload:JwtPayload = { username: user.username }
                this.redisService.set(user.username , "time = " + new Date)
                return {              
                  access_token: this.jwtService.sign(payload),
                  msg: '登录成功',
                };

              }else{
                throw new HttpException('用户名或密码错误',200)
              }
        }catch(e){
          throw new HttpException(e.message,200)
        }
      
    }else{
      throw new HttpException("请输入用户名或密码",200)
    }
  }


   getTokenUserInfo(name){
     this.redisService.get(name).then((res)=>{
      Logger.log("res = " + res);
     })
    return "tokeninfo" + name ;
   }
}
