import { Task } from '../entities/task';

export interface ITaskRepository {
  create(task: Task): Promise<void>;
  getByColumn(columnId: string): Promise<Task[]>;
  update(task: Task): Promise<void>;
}
