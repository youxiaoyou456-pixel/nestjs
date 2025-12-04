// src/users/user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' }) // 指定实际表名
export class User {
  @PrimaryGeneratedColumn({name: 'user_id'})
  userid: number;

  @Column({ name: 'username' }) // 如果字段名不同需要指定
  username: string;

  
  @Column()
  email: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({default: 1})
  is_active:number
}