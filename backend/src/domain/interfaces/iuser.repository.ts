import { User } from '../entities/user';

export interface IUserRepository {
  getById(id: string): Promise<User | null>;
}
