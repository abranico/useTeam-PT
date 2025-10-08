import { Task } from '../entities/task';

export interface ITaskRepository {
  create(task: Task): Promise<Task>;
  getByColumn(columnId: string): Promise<Task[]>;
  update(task: Task): Promise<void>;
}
