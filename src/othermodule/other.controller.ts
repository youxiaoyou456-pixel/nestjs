import { Body,Post,Controller, Logger, Query,Get } from "@nestjs/common";
import { OtherService } from "./other.service";
import { CreateUpdateDto } from "src/auth/dtos/creat_update.dto";
import { Public } from "src/common/public.decorator";

@Controller('other')
export class OtherController {
  constructor(private readonly otherService: OtherService) {}
  
  @Get('/inputOtherTest')
    async inputOtherTest(){
    
      return this.otherService.inputOtherTest();
    }

  @Get('/inputOther')
    async inputOther(@Query('name') name: string){
    
      return this.otherService.inputOther(name);
    }
    @Get('/updateOther')
    async updateOther(@Query('id') id: number,@Query('name') name: string){
    
      return this.otherService.updateOther(id, name);
    }

    @Get('/updateOtherBySql')
    async updateOtherBySql(@Query('id') id: number,@Query('name') name: string){
    
      return this.otherService.updateOtherBySql(id, name);
    }

}