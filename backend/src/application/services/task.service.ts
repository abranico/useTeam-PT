import { Injectable, Inject } from '@nestjs/common';
import { Task } from 'src/domain/entities/task';
import { ITaskRepository } from 'src/domain/interfaces/itask.repository';
import { ITaskService } from '../interfaces/task-service.interface';

@Injectable()
export class TaskService implements ITaskService {
  constructor(
    @Inject('ITaskRepository')
    private readonly _taskRepository: ITaskRepository,
  ) {}

  async create(
    title: string,
    columnId: string,
    description?: string,
    assignedToId?: string,
  ): Promise<void> {
    const task = new Task();
    task.title = title;
    task.column = { id: columnId } as any;
    task.description = description || '';
    task.assignedTo = assignedToId ? ({ id: assignedToId } as any) : null;

    await this._taskRepository.create(task);
  }

  getByColumn(columnId: string): Promise<Task[]> {
    return this._taskRepository.getByColumn(columnId);
  }

  async moveTask(taskId: string, newColumnId: string): Promise<void> {
    const task = new Task();
    task.id = taskId;
    task.column = { id: newColumnId } as any;

    await this._taskRepository.update(task);
  }
}
