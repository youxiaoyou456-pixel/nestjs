
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtherController   } from './other.controller';
import { OtherEntity } from './entitys/OtherEntity';

import { OtherService } from './other.service';


@Module({
  imports: [
      TypeOrmModule.forFeature([
          OtherEntity,
        ]),
  ],
  controllers: [OtherController],

  providers: [
    OtherService
  ],
})

export class OtherModule {}
