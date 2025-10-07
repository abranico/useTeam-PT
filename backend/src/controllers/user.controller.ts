import { Controller, Get, Inject, Param } from '@nestjs/common';
import { IUserService } from 'src/application/interfaces/user-service.interface.';
import { User } from 'src/domain/entities/user';

@Controller('users')
export class UserController {
  constructor(
    @Inject('IUserService')
    private readonly _userService: IUserService,
  ) {}

  // GET /users/:id
  @Get(':id')
  async getById(@Param('id') id: string): Promise<User> {
    const user = await this._userService.getById(id);

    return user;
  }
}
