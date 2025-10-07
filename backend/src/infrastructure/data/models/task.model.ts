import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Column } from 'src/domain/entities/column';
import { User } from 'src/domain/entities/user';

@Schema({ timestamps: true })
export class Task extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  assignedTo?: User;

  @Prop({ type: Types.ObjectId, ref: 'Column', required: true })
  column: Column;

  @Prop({ required: true })
  order: number;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
