import { Body,Post,Controller, Logger } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { CreateUpdateDto } from "src/auth/dtos/creat_update.dto";
import { Public } from "src/common/public.decorator";
import { User } from "src/common/user.decorator";

@Controller()
export class AuthController {
  
  constructor(private readonly authService: AuthService) {}

  /**
   * Public endpoint for user login
   * @param loginDto - User credentials for authentication
   * @returns Authentication token upon successful login
   */
  @Public()
  @Post('/user/login')
  async login(@Body() loginDto: CreateUpdateDto){
   
    return this.authService.login(loginDto);
  }
  
  @Public()
  @Post('/user/create')
  async create(@Body() loginDto: CreateUpdateDto){
    return this.authService.create(loginDto);
  }

  @Post('/user/getTokenUserInfo')
  async getTokenUserInfo(@User("name") name: string){
    return this.authService.getTokenUserInfo(name);
  }
}