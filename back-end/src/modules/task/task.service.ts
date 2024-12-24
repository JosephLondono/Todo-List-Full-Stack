import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './entity/task.entity';
import { Repository } from 'typeorm';
import { JwtPayloadGetDto } from './dto/jwt-payload-get.dto';
import { UsersService } from '../users/users.service';
import { TaskDto } from './dto/task.dto';
import { TaskDtoUpdate } from './dto/taskUpdate.dto';
import { TaskDtoUpdateStatus } from './dto/taskUpdateStatus.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
    private userService: UsersService,
  ) {}

  async getTasks(req) {
    const payload: JwtPayloadGetDto = req.user;

    const [user] = await this.userService.findUserByEmail(payload.email);

    const taskUser = await this.taskRepository.find({
      select: ['id', 'title', 'description', 'status', 'dateEnd'],
      relations: ['user'],
      where: { user: user },
    });

    return taskUser.map((task) => {
      const { user, ...taskWithoutUser } = task;
      return taskWithoutUser;
    });
  }

  async createTask(req, task: TaskDto) {
    const payload: JwtPayloadGetDto = req.user;

    const [user] = await this.userService.findUserByEmail(payload.email);

    if (!user) throw new ConflictException('Usuario no encontrado');

    const newTask = this.taskRepository.create({
      ...task,
      user,
    });

    const data = await this.taskRepository.save(newTask);
    if (data)
      return {
        success: true,
        message: 'Tarea creada exitosamente',
      };
    throw new ConflictException('Tarea no creada');
  }

  async deleteTask(req, id: number) {
    const payload: JwtPayloadGetDto = req.user;

    const [user] = await this.userService.findUserByEmail(payload.email);

    const task = await this.taskRepository.findOne({
      where: { id, user },
    });

    if (!task) throw new ConflictException('Tarea no encontrada');

    const data = await this.taskRepository.delete(task.id);
    if (data)
      return {
        success: true,
        message: 'Tarea eliminada exitosamente',
      };
    throw new ConflictException('Tarea no eliminada');
  }

  async updateTask(req, task: TaskDtoUpdate) {
    const payload: JwtPayloadGetDto = req.user;

    if (
      task.status !== 'incomplete' &&
      task.status !== 'inProgress' &&
      task.status !== 'complete'
    ) {
      throw new ConflictException('Estado no válido');
    }

    const [user] = await this.userService.findUserByEmail(payload.email);

    const taskUpdate = await this.taskRepository.findOne({
      where: { id: task.id, user },
    });

    if (!taskUpdate) throw new ConflictException('Tarea no encontrada');

    taskUpdate.title = task.title;
    taskUpdate.description = task.description;
    taskUpdate.status = task.status;

    const dateEnd = new Date(task.dateEnd);
    dateEnd.setMinutes(dateEnd.getMinutes() + dateEnd.getTimezoneOffset());
    taskUpdate.dateEnd = dateEnd;

    const data = await this.taskRepository.save(taskUpdate);
    if (data)
      return {
        success: true,
        message: 'Tarea actualizada exitosamente',
      };
    throw new ConflictException('Tarea no actualizada');
  }

  async updateStatus(req, taskUpdate: TaskDtoUpdateStatus) {
    const payload: JwtPayloadGetDto = req.user;
    console.log(taskUpdate);

    if (
      taskUpdate.status !== 'incomplete' &&
      taskUpdate.status !== 'inProgress' &&
      taskUpdate.status !== 'complete'
    ) {
      throw new ConflictException('Estado no válido');
    }

    const [user] = await this.userService.findUserByEmail(payload.email);

    const task = await this.taskRepository.findOne({
      where: { id: taskUpdate.id, user },
    });

    if (!task) throw new ConflictException('Tarea no encontrada');

    const xd = await this.taskRepository.update(task.id, {
      status: taskUpdate.status,
    });
    console.log(xd);

    if (xd.affected > 0) {
      return {
        success: true,
        message: 'Estado de la tarea actualizado',
      };
    }
    throw new ConflictException('Estado de la tarea no actualizado');
  }
}
