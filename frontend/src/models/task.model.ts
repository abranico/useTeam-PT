import type { Column } from "./column.model";
import type { User } from "./user.model";

export interface Task {
  id: string;
  title: string;
  description?: string;
  assignedTo?: User;
  column: Column;
  order: number;
}
