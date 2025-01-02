import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './entity/task.entity';
import { Repository } from 'typeorm';
import { JwtPayloadGetDto } from './dto/jwt-payload-get.dto';
import { UsersService } from '../users/users.service';
import { TaskDto } from './dto/task.dto';
import { TaskDtoUpdate } from './dto/taskUpdate.dto';
import { TaskDtoUpdateStatus } from './dto/taskUpdateStatus.dto';

interface UserGoogle {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
}

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
    private userService: UsersService,
  ) {}

  async getTasks(req) {
    const userGoogle: UserGoogle = await getUserGoogle(
      req.headers.authorization,
    );

    if (!userGoogle) {
      throw new ConflictException('Usuario no encontrado');
    }

    const [user] = await this.userService.findUserByEmail(userGoogle.email);

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    const taskUser = await this.taskRepository.find({
      select: ['id', 'title', 'description', 'status', 'dateEnd', 'style'],
      relations: ['user'],
      where: { user: user },
    });

    return taskUser.map((task) => {
      const { user, ...taskWithoutUser } = task;
      return taskWithoutUser;
    });
  }

  async createTask(req, task: TaskDto) {
    const userGoogle: UserGoogle = await getUserGoogle(
      req.headers.authorization,
    );

    if (!userGoogle) {
      throw new ConflictException('Usuario no encontrado');
    }

    const [user] = await this.userService.findUserByEmail(userGoogle.email);

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
    const userGoogle: UserGoogle = await getUserGoogle(
      req.headers.authorization,
    );

    if (!userGoogle) {
      throw new ConflictException('Usuario no encontrado');
    }

    const [user] = await this.userService.findUserByEmail(userGoogle.email);

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
    const userGoogle: UserGoogle = await getUserGoogle(
      req.headers.authorization,
    );

    if (!userGoogle) {
      throw new ConflictException('Usuario no encontrado');
    }

    if (
      task.status !== 'incomplete' &&
      task.status !== 'inProgress' &&
      task.status !== 'complete'
    ) {
      throw new ConflictException('Estado no válido');
    }

    if (
      task.style !== 'default' &&
      task.style !== 'blue' &&
      task.style !== 'green' &&
      task.style !== 'red' &&
      task.style !== 'yellow' &&
      task.style !== 'purple' &&
      task.style !== 'pink' &&
      task.style !== 'orange'
    ) {
      throw new ConflictException('Estilo no válido');
    }

    const [user] = await this.userService.findUserByEmail(userGoogle.email);

    const taskUpdate = await this.taskRepository.findOne({
      where: { id: task.id, user },
    });

    if (!taskUpdate) throw new ConflictException('Tarea no encontrada');

    taskUpdate.title = task.title;
    taskUpdate.description = task.description;
    taskUpdate.status = task.status;
    taskUpdate.style = task.style;

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
    const userGoogle: UserGoogle = await getUserGoogle(
      req.headers.authorization,
    );

    if (!userGoogle) {
      throw new ConflictException('Usuario no encontrado');
    }
    if (
      taskUpdate.status !== 'incomplete' &&
      taskUpdate.status !== 'inProgress' &&
      taskUpdate.status !== 'complete'
    ) {
      throw new ConflictException('Estado no válido');
    }

    const [user] = await this.userService.findUserByEmail(userGoogle.email);

    const task = await this.taskRepository.findOne({
      where: { id: taskUpdate.id, user },
    });

    if (!task) throw new ConflictException('Tarea no encontrada');

    const xd = await this.taskRepository.update(task.id, {
      status: taskUpdate.status,
    });

    if (xd.affected > 0) {
      return {
        success: true,
        message: 'Estado de la tarea actualizado',
      };
    }
    throw new ConflictException('Estado de la tarea no actualizado');
  }
}

const getUserGoogle = async (acessToken: string) => {
  const url = 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json';
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${acessToken}`,
    },
  });

  const data = await response.json();

  if (data.error) {
    return null;
  }
  return data;
};
