import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Board, BoardSchema } from './models/board.model';
import { Column, ColumnSchema } from './models/column.model';
import { Task, TaskSchema } from './models/task.model';
import { User, UserSchema } from './models/user.model';
import { UserRepository } from './repositories/user.repository';
import { BoardRepository } from './repositories/board.repository';
import { ColumnRepository } from './repositories/column.repository';
import { TaskRepository } from './repositories/task.repository';

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

    ColumnRepository,
    { provide: 'IColumnRepository', useExisting: ColumnRepository },

    TaskRepository,
    { provide: 'ITaskRepository', useExisting: TaskRepository },
  ],
  exports: [
    'IUserRepository',
    'IBoardRepository',
    'IColumnRepository',
    'ITaskRepository',
    UserRepository,
    BoardRepository,
    ColumnRepository,
    TaskRepository,
  ],
})
export class DataServicesModule {}
