import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @ApiOperation({
    description: 'Permitted to login',
  })
  @ApiBody({
    description: 'Permit the user to login',
    type: AuthCredentialsDto,
    examples: {
      example1: {
        value: {
          email: 'example@email.com',
          password: 'password',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'User logged in',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  login(@Body() authCredentials: AuthCredentialsDto) {
    return this.authService.login(authCredentials);
  }

  @Get('data-user')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    description: 'Permitted to get data user',
  })
  @ApiResponse({
    status: 200,
    description: 'Data user',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiBearerAuth('jwt')
  dataUser(@Req() request) {
    return request.user;
  }
}
