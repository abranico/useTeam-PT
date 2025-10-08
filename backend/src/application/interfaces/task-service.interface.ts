import { Task } from 'src/domain/entities/task';

export interface ITaskService {
  create(
    title: string,
    columnId: string,
    description?: string,
    assignedToId?: string,
  ): Promise<Task>;
  getByColumn(columnId: string): Promise<Task[]>;
  moveTask(taskId: string, newColumnId: string): Promise<void>;
}
