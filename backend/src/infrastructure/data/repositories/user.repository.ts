import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { IUserRepository } from 'src/domain/interfaces/iuser.repository';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/domain/entities/user';
import { UserDocument } from '../models/user.model';

@Injectable()
export class UserRepository implements IUserRepository {
  private readonly _userModel: Model<User>;
  constructor(@InjectModel(User.name) userModel: Model<User>) {
    this._userModel = userModel;
  }

  async getById(id: string): Promise<User | null> {
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }
    const user = await this._userModel.findById(new Types.ObjectId(id));
    if (!user) return null;
    return this.mapUser(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const doc = await this._userModel.findOne({ email }).exec();
    if (!doc) return null;
    return this.mapUser(doc);
  }

  async create(user: User): Promise<void> {
    const created = new this._userModel(user);
    await created.save();
  }

  private mapUser(doc: UserDocument): User {
    const user = new User();
    user.id = (doc._id as string).toString();
    user.name = doc.name;
    user.email = doc.email;
    user.password = doc.password;
    return user;
  }
}
