import { User } from './user';

export class Board {
  id: string;
  title: string;
  owner: User;
  collaborators: User[];
  createdAt: Date;
  updatedAt: Date;
}
