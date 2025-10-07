import { IUserRepository } from 'src/domain/interfaces/iuser.repository';
import { IUserService } from '../interfaces/user-service.interface.';
import { User } from 'src/domain/entities/user';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject('IUserRepository')
    private readonly _userRepository: IUserRepository,
  ) {}

  async getById(id: string): Promise<User> {
    const user = await this._userRepository.getById(id);
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }
}
