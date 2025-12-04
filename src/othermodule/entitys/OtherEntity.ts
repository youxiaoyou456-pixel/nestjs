import { Entity, PrimaryGeneratedColumn,Column } from 'typeorm';
@Entity({ name: 'other' })
export class OtherEntity {
  @PrimaryGeneratedColumn({name: 'id'})
  id: number;
  @Column()
  name: string;
}