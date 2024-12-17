import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { ApiTags } from '@nestjs/swagger';
import { ParseIntPipe } from '../../pipes/parse-int.pipe';
import { UserDeleteDto } from './dto/user-delete.dto';

@Controller('/api/v1/users')
@ApiTags('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  async createUser(@Body() user: UserDto) {
    return await this.userService.createUser(user);
  }

  @Get()
  async getUsers() {
    return await this.userService.getUsers();
  }

  @Delete('/clear')
  async clearUsers() {
    return await this.userService.clearUsers();
  }

  @Delete('/:id')
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.deleteUserById(id);
  }

  @Patch()
  async updateUser(@Body() user: UserDeleteDto) {
    return await this.userService.updateUser(user);
  }
}
