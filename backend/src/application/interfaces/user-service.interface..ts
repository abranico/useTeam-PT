import { User } from 'src/domain/entities/user';

export interface IUserService {
  getById(id: string): Promise<User>;
}
