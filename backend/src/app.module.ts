import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from './config';
import { DataServicesModule } from './infrastructure/data/data-services.module';
import { UserController } from './controllers/user.controller';
import { UserService } from './application/services/user.service';

@Module({
  imports: [
    MongooseModule.forRoot(config.mongoConnectionString),
    DataServicesModule,
  ],
  controllers: [UserController],
  providers: [{ provide: 'IUserService', useClass: UserService }],
})
export class AppModule {}
