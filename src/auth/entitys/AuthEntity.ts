import { Entity, PrimaryGeneratedColumn,Column } from 'typeorm';
@Entity({ name: 'auth' })
export class AuthEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  username: string;
  @Column()
  password: string;
}