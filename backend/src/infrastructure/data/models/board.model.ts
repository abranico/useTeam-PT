import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/domain/entities/user';

@Schema({ timestamps: true })
export class Board extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  owner: User;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
  collaborators: User[];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const BoardSchema = SchemaFactory.createForClass(Board);
