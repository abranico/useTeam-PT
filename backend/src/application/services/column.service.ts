import { Injectable, Inject } from '@nestjs/common';
import { Column } from 'src/domain/entities/column';
import { IColumnService } from '../interfaces/column-service.interface';
import { IColumnRepository } from 'src/domain/interfaces/icolumn.repository';

@Injectable()
export class ColumnService implements IColumnService {
  constructor(
    @Inject('IColumnRepository')
    private readonly _columnRepository: IColumnRepository,
  ) {}

  async create(title: string, boardId: string): Promise<Column> {
    const column = new Column();
    column.title = title;
    column.board = { id: boardId } as any;

    return this._columnRepository.create(column);
  }

  getByBoard(boardId: string): Promise<Column[]> {
    return this._columnRepository.getByBoard(boardId);
  }
}
