import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Board } from 'src/domain/entities/board';
import { IBoardRepository } from 'src/domain/interfaces/iboard.repository';
import { IBoardService } from '../interfaces/board-service.interface';

@Injectable()
export class BoardService implements IBoardService {
  constructor(
    @Inject('IBoardRepository')
    private readonly _boardRepository: IBoardRepository,
  ) {}

  async create(title: string, ownerId: string): Promise<Board> {
    const board = new Board();
    board.title = title;
    board.owner = { id: ownerId } as any;

    return await this._boardRepository.create(board);
  }

  async getBoardsByUser(userId: string): Promise<Board[]> {
    return this._boardRepository.getByUser(userId);
  }

  async getBoardById(boardId: string): Promise<Board> {
    const board = await this._boardRepository.getById(boardId);
    if (!board) throw new NotFoundException('Board not found');
    return board;
  }

  async addCollaborator(
    requesterId: string,
    boardId: string,
    userId: string,
  ): Promise<void> {
    const board = await this._boardRepository.getById(boardId);
    if (!board) throw new NotFoundException('Board not found');

    if (board.owner.id !== requesterId) {
      throw new ForbiddenException('Only the owner can add collaborators');
    }

    await this._boardRepository.addCollaborator(boardId, userId);
  }
}
