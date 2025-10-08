import { User } from '../entities/user';

export interface IUserRepository {
  getById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(user: User): Promise<void>;
}
