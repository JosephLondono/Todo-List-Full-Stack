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
import { UserDto } from '../users/dto/user.dto';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @ApiOperation({
    description: 'Permitir iniciar sesión',
  })
  @ApiBody({
    description: 'Permitir al usuario iniciar sesión',
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
    description: 'Usuario ha iniciado sesión',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
  })
  login(@Body() authCredentials: AuthCredentialsDto) {
    return this.authService.login(authCredentials);
  }

  @Get('data-user')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    description: 'Permitir obtener datos del usuario',
  })
  @ApiResponse({
    status: 200,
    description: 'Datos del usuario',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
  })
  @ApiBearerAuth('jwt')
  dataUser(@Req() request) {
    return request.user;
  }

  @Post('register')
  @ApiOperation({
    description: 'Permitir registrarse',
  })
  @ApiBody({
    description: 'Permitir al usuario registrarse',
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
    description: 'Usuario registrado',
  })
  register(@Body() authCredentials: UserDto) {
    return this.authService.register(authCredentials);
  }
}
