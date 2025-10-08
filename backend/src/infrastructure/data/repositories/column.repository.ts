import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Column } from 'src/domain/entities/column';
import { ColumnDocument } from '../models/column.model';
import { IColumnRepository } from 'src/domain/interfaces/icolumn.repository';

@Injectable()
export class ColumnRepository implements IColumnRepository {
  private readonly _columnModel: Model<ColumnDocument>;
  constructor(@InjectModel(Column.name) columnModel: Model<ColumnDocument>) {
    this._columnModel = columnModel;
  }

  async create(column: Column): Promise<Column> {
    const doc = new this._columnModel({
      title: column.title,
      board: new Types.ObjectId(column.board.id),
      order: column.order,
    });
    await doc.save();
    return this.mapColumn(doc);
  }

  async getByBoard(boardId: string): Promise<Column[]> {
    if (!Types.ObjectId.isValid(boardId)) return [];

    const id = new Types.ObjectId(boardId);
    const columns = await this._columnModel
      .find({ board: id })
      .sort({ order: 1 });

    return columns.map((c) => this.mapColumn(c));
  }

  private mapColumn(doc: any): Column {
    return {
      id: doc._id.toString(),
      title: doc.title,
      board: { id: doc.board.toString() } as any, // si querés, podés poblar el board
      order: doc.order,
    };
  }
}
