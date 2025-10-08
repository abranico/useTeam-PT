import { Module } from '@nestjs/common';
import { TaskService } from '../services/task.service';
import { TaskRepository } from 'src/infrastructure/data/repositories/task.repository';

@Module({
  providers: [
    TaskService,
    { provide: 'ITaskRepository', useClass: TaskRepository },
  ],
  exports: [TaskService],
})
export class TaskModule {}
