import { Module } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserRepository } from 'src/infrastructure/data/repositories/user.repository';
@Module({
  providers: [
    UserService,
    { provide: 'IUserRepository', useClass: UserRepository },
  ],
  exports: [UserService],
})
export class UserModule {}
