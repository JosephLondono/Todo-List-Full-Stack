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
import { TaskDtoUpdateStatus } from './dto/taskUpdateStatus.dto';

@ApiTags('tareas')
@Controller('/api/v1/task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  @ApiOperation({
    summary: 'Obtener todas las tareas',
    description: 'Recuperar todas las tareas para el usuario autenticado',
  })
  @ApiBearerAuth('jwt')
  @ApiResponse({ status: 200, description: 'Tareas recuperadas exitosamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @UseGuards(AuthGuard('jwt'))
  async getTasks(@Req() req) {
    return await this.taskService.getTasks(req);
  }

  @Post()
  @ApiOperation({
    summary: 'Crear una nueva tarea',
    description: 'Crear una nueva tarea para el usuario autenticado',
  })
  @ApiBearerAuth('jwt')
  @ApiResponse({ status: 201, description: 'Tarea creada exitosamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 409, description: 'Conflicto' })
  @ApiBody({
    description: 'Datos de la tarea',
    type: TaskDto,
    examples: {
      example1: {
        summary: 'Ejemplo de tarea',
        value: {
          title: 'Nueva Tarea',
          description: 'Descripción de la tarea',
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
    summary: 'Eliminar una tarea por ID',
    description: 'Eliminar una tarea por su ID para el usuario autenticado',
  })
  @ApiBearerAuth('jwt')
  @ApiResponse({ status: 200, description: 'Tarea eliminada exitosamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 409, description: 'Conflicto' })
  @UseGuards(AuthGuard('jwt'))
  async deleteTask(@Req() req, @Param('id', ParseIntPipe) id: number) {
    return await this.taskService.deleteTask(req, id);
  }

  @Put()
  @ApiOperation({
    summary: 'Actualizar una tarea',
    description: 'Actualizar una tarea para el usuario autenticado',
  })
  @ApiBearerAuth('jwt')
  @ApiResponse({ status: 200, description: 'Tarea actualizada exitosamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 409, description: 'Conflicto' })
  @ApiBody({
    description: 'Datos de la tarea actualizada',
    type: TaskDtoUpdate,
    examples: {
      example1: {
        summary: 'Ejemplo de tarea actualizada',
        value: {
          id: 1,
          title: 'Tarea Actualizada',
          description: 'Descripción de la tarea actualizada',
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

  @Patch('/updateStatus')
  @ApiOperation({
    summary: 'Actualizar el estado de una tarea',
    description:
      'Actualizar el estado de una tarea para el usuario autenticado',
  })
  @ApiBody({
    description: 'Datos para actualizar el estado de la tarea',
    type: TaskDtoUpdateStatus,
    examples: {
      example1: {
        summary: 'Ejemplo de tarea actualizada',
        value: {
          id: 1,
          status: 'complete',
        },
      },
    },
  })
  @ApiBearerAuth('jwt')
  @ApiResponse({ status: 200, description: 'Estado de la tarea actualizado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 409, description: 'Conflicto' })
  @UseGuards(AuthGuard('jwt'))
  async updateStatus(@Req() req, @Body() taskUpdate: TaskDtoUpdateStatus) {
    return await this.taskService.updateStatus(req, taskUpdate);
  }
}
