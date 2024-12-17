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
import { ApiTags } from '@nestjs/swagger';
import { ParseIntPipe } from '../../pipes/parse-int.pipe';
import { UserDeleteDto } from './dto/user-delete.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('/api/v1/users')
@ApiTags('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createUser(@Body() user: UserDto) {
    return await this.userService.createUser(user);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getUsers() {
    return await this.userService.getUsers();
  }

  @Delete('/clear')
  @UseGuards(AuthGuard('jwt'))
  async clearUsers() {
    return await this.userService.clearUsers();
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.deleteUserById(id);
  }

  @Patch()
  @UseGuards(AuthGuard('jwt'))
  async updateUser(@Body() user: UserDeleteDto) {
    return await this.userService.updateUser(user);
  }
}
