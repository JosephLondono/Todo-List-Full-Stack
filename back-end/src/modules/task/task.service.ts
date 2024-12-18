import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './entity/task.entity';
import { Repository } from 'typeorm';
import { JwtPayloadGetDto } from './dto/jwt-payload-get.dto';
import { UsersService } from '../users/users.service';
import { TaskDto } from './dto/task.dto';
import { UsersEntity } from '../users/entity/users.entity';

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

    if (!user) throw new ConflictException('User not found');

    const newTask = this.taskRepository.create({
      ...task,
      user,
    });

    const data = await this.taskRepository.save(newTask);
    if (data)
      return {
        success: true,
        message: 'Task created successfully',
      };
    throw new ConflictException('Task not created');
  }

  async deleteTask(req, id: number) {
    const payload: JwtPayloadGetDto = req.user;

    const [user] = await this.userService.findUserByEmail(payload.email);

    const task = await this.taskRepository.findOne({
      where: { id, user },
    });

    if (!task) throw new ConflictException('Task not found');

    const data = await this.taskRepository.delete(task.id);
    if (data)
      return {
        success: true,
        message: 'Task deleted successfully',
      };
    throw new ConflictException('Task not deleted');
  }
}