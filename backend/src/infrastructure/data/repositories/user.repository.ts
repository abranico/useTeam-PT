import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { IUserRepository } from 'src/domain/interfaces/iuser.repository';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/domain/entities/user';

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
    return new User(user.id, user.name, user.email, user.password);
  }
}
