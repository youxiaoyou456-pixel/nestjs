import { isEmpty, IsNotEmpty } from 'class-validator';
export class CreateUpdateDto {
  @IsNotEmpty({ message: '用户名必填' })
  username:string
  password:string
}