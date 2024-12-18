import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './entity/task.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity]), UsersModule],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
