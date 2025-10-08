import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from './config';
import { DataServicesModule } from './infrastructure/data/data-services.module';
import { UserController } from './controllers/user.controller';
import { UserService } from './application/services/user.service';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './application/services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './infrastructure/services/auth/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forRoot(config.MONGO_URI),
    DataServicesModule,
    JwtModule.register({
      secret: config.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UserController, AuthController],
  providers: [
    { provide: 'IUserService', useClass: UserService },
    { provide: 'IAuthService', useClass: AuthService },
    JwtStrategy,
  ],
})
export class AppModule {}
