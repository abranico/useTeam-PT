import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { BoardDocument } from '../models/board.model';
import { Board } from 'src/domain/entities/board';
import { IBoardRepository } from 'src/domain/interfaces/iboard.repository';

@Injectable()
export class BoardRepository implements IBoardRepository {
  private readonly _boardModel: Model<BoardDocument>;
  constructor(@InjectModel(Board.name) boardModel: Model<BoardDocument>) {
    this._boardModel = boardModel;
  }

  async getById(boardId: string): Promise<Board | null> {
    if (!Types.ObjectId.isValid(boardId)) return null;

    const doc = await this._boardModel
      .findById(boardId)
      .populate([
        { path: 'owner', select: 'name email' },
        { path: 'collaborators', select: 'name email' },
      ])
      .exec();

    if (!doc) return null;
    return this.mapBoard(doc);
  }

  async getByUser(userId: string): Promise<Board[]> {
    if (!Types.ObjectId.isValid(userId)) return [];

    const id = new Types.ObjectId(userId);
    const boards = await this._boardModel
      .find({ $or: [{ owner: id }, { collaborators: id }] })
      .populate([
        { path: 'owner', select: 'name email' },
        { path: 'collaborators', select: 'name email' },
      ]);
    return boards.map((board) => this.mapBoard(board));
  }

  async create(board: Board): Promise<void> {
    const boardDoc = new this._boardModel({
      title: board.title,
      owner: new Types.ObjectId(board.owner.id),
    });

    await boardDoc.save();
  }

  async addCollaborator(boardId: string, userId: string): Promise<void> {
    if (!Types.ObjectId.isValid(boardId) || !Types.ObjectId.isValid(userId))
      return;

    const boardDoc = await this._boardModel.findById(boardId);
    if (!boardDoc) return;

    const userObjectId = new Types.ObjectId(userId);
    if (!boardDoc.collaborators.some((c) => c.equals(userObjectId))) {
      boardDoc.collaborators.push(userObjectId);
      await boardDoc.save();
    }
  }
  private mapBoard(doc: any): Board {
    return {
      id: doc._id.toString(),
      title: doc.title,
      owner: {
        id: doc.owner._id.toString(),
        name: doc.owner.name,
        email: doc.owner.email,
        password: doc.owner.password,
      },
      collaborators: (doc.collaborators || []).map((c: any) => ({
        id: c._id.toString(),
        name: c.name,
        email: c.email,
      })),
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }
}
