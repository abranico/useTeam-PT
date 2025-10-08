import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Board, BoardSchema } from './models/board.model';
import { Column, ColumnSchema } from './models/column.model';
import { Task, TaskSchema } from './models/task.model';
import { User, UserSchema } from './models/user.model';
import { UserRepository } from './repositories/user.repository';
import { BoardRepository } from './repositories/board.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Board.name, schema: BoardSchema },
      { name: Column.name, schema: ColumnSchema },
      { name: Task.name, schema: TaskSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [
    UserRepository,
    { provide: 'IUserRepository', useExisting: UserRepository },

    BoardRepository,
    { provide: 'IBoardRepository', useExisting: BoardRepository },
  ],
  exports: [
    'IUserRepository',
    'IBoardRepository',
    UserRepository,
    BoardRepository,
  ],
})
export class DataServicesModule {}
