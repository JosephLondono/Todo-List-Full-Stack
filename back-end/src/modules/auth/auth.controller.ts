import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  login(@Body() authCredentials: AuthCredentialsDto) {
    return this.authService.login(authCredentials);
  }

  @Get('data-user')
  @UseGuards(AuthGuard('jwt'))
  dataUser(@Req() request) {
    return request.user;
  }
}
