import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ParseIntPipe } from '../../pipes/parse-int.pipe';
import { UserDeleteDto } from './dto/user-delete.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('/api/v1/users')
@ApiTags('Usuarios')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  // @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ description: 'Crear un nuevo usuario' })
  @ApiBody({
    description: 'Crear un nuevo usuario',
    type: UserDto,
    examples: {
      example1: {
        value: {
          name: 'John Doe',
          email: 'johnDoe@gmail.com',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'El usuario ha sido creado exitosamente.',
  })
  @ApiResponse({
    status: 409,
    description: 'El usuario ya existe.',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
  })
  async createUser(@Body() user: UserDto) {
    return await this.userService.createUser(user);
  }

  @Get()
  // @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ description: 'Obtener todos los usuarios' })
  @ApiResponse({
    status: 200,
    description: 'Usuarios recuperados exitosamente.',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
  })
  async getUsers() {
    return await this.userService.getUsers();
  }

  @Delete('/clear')
  // @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ description: 'Eliminar todos los usuarios' })
  @ApiResponse({
    status: 200,
    description: 'Usuarios eliminados exitosamente.',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
  })
  async clearUsers() {
    return await this.userService.clearUsers();
  }

  @Delete('/:id')
  // @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ description: 'Eliminar un usuario por ID' })
  @ApiResponse({
    status: 200,
    description: 'Usuario eliminado exitosamente.',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no encontrado.',
  })
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.deleteUserById(id);
  }

  @Put()
  // @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ description: 'Actualizar un usuario' })
  @ApiBody({
    description: 'Actualizar un usuario',
    type: UserDeleteDto,
    examples: {
      example1: {
        value: {
          id: 1,
          name: 'John Doe Updated',
          email: 'johnDoeUpdated@gmail.com',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario actualizado exitosamente.',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no encontrado.',
  })
  async updateUser(@Body() user: UserDeleteDto) {
    return await this.userService.updateUser(user);
  }
}
