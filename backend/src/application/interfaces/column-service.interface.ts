import { Column } from 'src/domain/entities/column';

export interface IColumnService {
  create(title: string, boardId: string): Promise<Column>;
  getByBoard(boardId: string): Promise<Column[]>;
}
