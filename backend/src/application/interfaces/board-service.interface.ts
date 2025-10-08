import { Board } from 'src/domain/entities/board';

export interface IBoardService {
  create(title: string, ownerId: string): Promise<void>;
  getBoardsByUser(userId: string): Promise<Board[]>;
  getBoardById(boardId: string): Promise<Board>;
  addCollaborator(
    requesterId: string,
    boardId: string,
    userId: string,
  ): Promise<void>;
}
