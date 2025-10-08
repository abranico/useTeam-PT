import { Column } from '../entities/column';

export interface IColumnRepository {
  create(column: Column): Promise<Column>;
  getByBoard(boardId: string): Promise<Column[]>;
}
