import { Module } from '@nestjs/common';
import { BoardService } from '../services/board.service';
import { BoardRepository } from 'src/infrastructure/data/repositories/board.repository';

@Module({
  providers: [
    BoardService,
    { provide: 'IBoardRepository', useClass: BoardRepository },
  ],
  exports: [BoardService],
})
export class BoardModule {}
