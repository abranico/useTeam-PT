import type { User } from "./user.model";

export interface Board {
  id: string;
  title: string;
  collaborators: User[];
}
