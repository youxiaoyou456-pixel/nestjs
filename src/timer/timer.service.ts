import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entitys/user';
import { Repository } from 'typeorm';


@Injectable()
export class TimerService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

   @Cron('0 30 15 * * *') 
  async executeDailyTask() {
    // 插入一条数据到 user 表
   let u = new User()
   u.username = 'Daily User'
   u.email = '123@qq.com'
   
    await this.userRepository.insert(u);
    console.log('Daily task executed: Inserting a new user');
  }
}
