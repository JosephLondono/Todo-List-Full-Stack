import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
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
@ApiTags('Users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  // @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ description: 'Create a new user' })
  @ApiBody({
    description: 'Create a new user',
    type: UserDto,
    examples: {
      example1: {
        value: {
          name: 'John Doe',
          email: 'johnDoe@gmail.com',
          password: '1234',
        },
      },
    },
  })
  @ApiBearerAuth('jwt')
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({
    status: 409,
    description: 'The user already exists.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async createUser(@Body() user: UserDto) {
    return await this.userService.createUser(user);
  }

  @Get()
  // @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ description: 'Get all users' })
  @ApiBearerAuth('jwt')
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved users.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async getUsers() {
    return await this.userService.getUsers();
  }

  @Delete('/clear')
  // @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ description: 'Clear all users' })
  @ApiBearerAuth('jwt')
  @ApiResponse({
    status: 200,
    description: 'Successfully cleared users.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async clearUsers() {
    return await this.userService.clearUsers();
  }

  @Delete('/:id')
  // @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ description: 'Delete a user by ID' })
  @ApiBearerAuth('jwt')
  @ApiResponse({
    status: 200,
    description: 'Successfully deleted user.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
  })
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.deleteUserById(id);
  }

  @Patch()
  // @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ description: 'Update a user' })
  @ApiBody({
    description: 'Update a user',
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
  @ApiBearerAuth('jwt')
  @ApiResponse({
    status: 200,
    description: 'Successfully updated user.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
  })
  async updateUser(@Body() user: UserDeleteDto) {
    return await this.userService.updateUser(user);
  }
}
