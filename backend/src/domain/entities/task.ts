import { Column } from './column';
import { User } from './user';

export class Task {
  id: string;
  title: string;
  description: string;
  assignedTo: User;
  column: Column;
  order: number;
}
