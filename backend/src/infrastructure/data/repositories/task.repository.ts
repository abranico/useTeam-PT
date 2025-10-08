import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Task } from 'src/domain/entities/task';
import { TaskDocument } from '../models/task.model';
import { ITaskRepository } from 'src/domain/interfaces/itask.repository';

@Injectable()
export class TaskRepository implements ITaskRepository {
  constructor(
    @InjectModel(Task.name) private readonly _taskModel: Model<TaskDocument>,
  ) {}

  async create(task: Task): Promise<void> {
    const doc = new this._taskModel({
      title: task.title,
      description: task.description,
      assignedTo: task.assignedTo
        ? new Types.ObjectId(task.assignedTo.id)
        : undefined,
      column: new Types.ObjectId(task.column.id),
    });
    await doc.save();
  }

  async getByColumn(columnId: string): Promise<Task[]> {
    if (!Types.ObjectId.isValid(columnId)) return [];

    const id = new Types.ObjectId(columnId);
    const tasks = await this._taskModel
      .find({ column: id })
      .sort({ order: 1 })
      .populate([
        { path: 'assignedTo', select: 'name email' },
        { path: 'column', select: 'title' },
      ]);

    return tasks.map((t) => this.mapTask(t));
  }

  async update(task: Task): Promise<void> {
    if (!task.id || !Types.ObjectId.isValid(task.id)) return;

    await this._taskModel.updateOne(
      { _id: new Types.ObjectId(task.id) },
      {
        $set: {
          title: task.title,
          description: task.description,
          assignedTo: task.assignedTo
            ? new Types.ObjectId(task.assignedTo.id)
            : null,
          column: new Types.ObjectId(task.column.id),
          order: task.order,
        },
      },
    );
  }

  private mapTask(doc: any): Task {
    return {
      id: doc._id.toString(),
      title: doc.title,
      description: doc.description,
      assignedTo: doc.assignedTo
        ? {
            id: doc.assignedTo._id.toString(),
            name: doc.assignedTo.name,
            email: doc.assignedTo.email,
            password: doc.assignedTo.password, // opcional
          }
        : undefined,
      column: {
        id: doc.column._id.toString(),
        title: doc.column.title,
        order: doc.column.order,
        board: { id: doc.column.board.toString() } as any,
      },
      order: doc.order,
    };
  }
}
