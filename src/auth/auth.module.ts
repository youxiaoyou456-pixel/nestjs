
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController   } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthEntity } from './entitys/AuthEntity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../common/constants';
import { RedisModule } from '../redis/redis.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      AuthEntity
    ]),
    //jwtserver会使用这个配置进行签名
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
    RedisModule
  ],

  controllers: [AuthController],
  
  providers: [
    AuthService
  ],
})

export class AuthModule {

}