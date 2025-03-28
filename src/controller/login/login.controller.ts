import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from './dto/login';
import { MessageDto } from '../chat/dto/message';


@Controller('login')
export class LoginController {
  constructor(
    private loginService: LoginService,
  ) { }

  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    return this.loginService.login(loginDto);
  }
  @Get('user')
  async GetUser(@Query('id') idUser: string) {
    return this.loginService.GetUser(parseInt(idUser));
  }

  /* aquiii modificacion */
}
