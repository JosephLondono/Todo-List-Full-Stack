import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { AuthGuard } from '@nestjs/passport';
import { TaskDto } from './dto/task.dto';

@Controller('/api/v1/task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getTasks(@Req() req) {
    return await this.taskService.getTasks(req);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createTask(@Req() req, @Body() task: TaskDto) {
    return await this.taskService.createTask(req, task);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  async deleteTask(@Req() req, @Param('id') id: number) {
    return await this.taskService.deleteTask(req, id);
  }
}