import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import envConfig from '../config/env';
import { User } from './entitys/user';
import { AuthModule } from 'src/auth/auth.module';
import { AuthEntity } from './auth/entitys/AuthEntity';
import { jwtAuthGuard  } from './auth/jwt-auth.grard';
import JwtAuthStrategy from './auth/jwt-auth.strategy';
import { OtherModule } from 'src/othermodule/other.module';
import { OtherEntity } from 'src/othermodule/entitys/OtherEntity';
import { LoggerService } from './logger/logger.service';
import { ScheduleModule } from '@nestjs/schedule';
import { TimerService } from 'src/timer/timer.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 设置为全局
      envFilePath: [envConfig.path],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql', // 数据库类型
        entities: [User, AuthEntity, OtherEntity], // 数据表实体，synchronize为true时，自动创建表，生产环境建议关闭.不自动创建表，需要手动创建表
        host: configService.get('DB_HOST'), // 主机，默认为localhost
        port: configService.get<number>('DB_PORT'), // 端口号
        username: configService.get('DB_USER'), // 用户名
        password: configService.get('DB_PASSWD'), // 密码
        database: configService.get('DB_DATABASE'), //数据库名
        timezone: '+08:00', //服务器上配置的时区
        synchronize: false, //根据实体自动创建数据库表， 生产环境建议关闭
         // 连接池配置
        pool: {
          max: 100,          // 最大连接数
          min: 10,           // 最小保持连接数
          acquireTimeout: 30000, // 获取连接超时时间(ms)
          idleTimeout: 10000,    // 连接空闲超时时间(ms)
        },
        // // 重试配置
        // retryAttempts: 5,    // 最大重试次数
        // retryDelay: 3000,    // 重试间隔(ms)
        // autoLoadEntities: true,
      }),
    }),
    TypeOrmModule.forFeature([
          User,
        ]),
    OtherModule,
    //AuthModule,

    ScheduleModule.forRoot(),
 
  ],
 
  controllers: [AppController],
  // 注册可注入的依赖项（服务、守卫、策略等
  providers: [
    // 基础服务
    AppService,
      //认证相关
    {
      provide: 'APP_GUARD',// 自定义 token
      useClass: jwtAuthGuard, // 全局守卫
    },
    JwtAuthStrategy,//JWT 验证策略
    // LoggerService, // 日志
    // TimerService
  ]
})
export class AppModule {}


