import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { AuthGuard } from '@nestjs/passport';
import { TaskDto } from './dto/task.dto';
import { ParseIntPipe } from '../../pipes/parse-int.pipe';
import { TaskDtoUpdate } from './dto/taskUpdate.dto';
import {
  ApiOperation,
  ApiBearerAuth,
  ApiTags,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('tasks')
@Controller('/api/v1/task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all tasks',
    description: 'Retrieve all tasks for the authenticated user',
  })
  @ApiBearerAuth('jwt')
  @ApiResponse({ status: 200, description: 'Tasks retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(AuthGuard('jwt'))
  async getTasks(@Req() req) {
    return await this.taskService.getTasks(req);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new task',
    description: 'Create a new task for the authenticated user',
  })
  @ApiBearerAuth('jwt')
  @ApiResponse({ status: 201, description: 'Task created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 409, description: 'Conflict' })
  @ApiBody({
    description: 'Task data',
    type: TaskDto,
    examples: {
      example1: {
        summary: 'Example task',
        value: {
          title: 'New Task',
          description: 'Task description',
          status: 'incomplete',
          dateEnd: '2024-12-31',
        },
      },
    },
  })
  @UseGuards(AuthGuard('jwt'))
  async createTask(@Req() req, @Body() task: TaskDto) {
    return await this.taskService.createTask(req, task);
  }

  @Delete('/:id')
  @ApiOperation({
    summary: 'Delete a task by ID',
    description: 'Delete a task by its ID for the authenticated user',
  })
  @ApiBearerAuth('jwt')
  @ApiResponse({ status: 200, description: 'Task deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 409, description: 'Conflict' })
  @UseGuards(AuthGuard('jwt'))
  async deleteTask(@Req() req, @Param('id', ParseIntPipe) id: number) {
    return await this.taskService.deleteTask(req, id);
  }

  @Put()
  @ApiOperation({
    summary: 'Update a task',
    description: 'Update a task for the authenticated user',
  })
  @ApiBearerAuth('jwt')
  @ApiResponse({ status: 200, description: 'Task updated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 409, description: 'Conflict' })
  @ApiBody({
    description: 'Updated task data',
    type: TaskDtoUpdate,
    examples: {
      example1: {
        summary: 'Example updated task',
        value: {
          id: 1,
          title: 'Updated Task',
          description: 'Updated task description',
          status: 'inProgress',
          dateEnd: '2024-12-31',
        },
      },
    },
  })
  @UseGuards(AuthGuard('jwt'))
  async updateTask(@Req() req, @Body() task: TaskDtoUpdate) {
    return await this.taskService.updateTask(req, task);
  }
}
