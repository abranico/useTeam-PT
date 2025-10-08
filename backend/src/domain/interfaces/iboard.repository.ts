import { Board } from '../entities/board';

export interface IBoardRepository {
  getById(boardId: string): Promise<Board | null>;
  getByUser(userId: string): Promise<Board[]>;
  create(board: Board): Promise<void>;
  addCollaborator(boardId: string, userId: string): Promise<void>;
}
