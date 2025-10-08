import { Column } from '../entities/column';

export interface IColumnRepository {
  create(column: Column): Promise<void>;
  getByBoard(boardId: string): Promise<Column[]>;
}
