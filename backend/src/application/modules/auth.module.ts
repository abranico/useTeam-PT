import { Module } from '@nestjs/common';
import { UserRepository } from 'src/infrastructure/data/repositories/user.repository';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { config } from 'src/config';
import { AuthService } from '../services/auth.service';
import { DataServicesModule } from 'src/infrastructure/data/data-services.module';

@Module({
  providers: [
    AuthService,
    { provide: 'IUserRepository', useClass: UserRepository },
  ],
  exports: [AuthService],
})
export class AuthModule {}
