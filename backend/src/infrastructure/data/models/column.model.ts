import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Board } from 'src/domain/entities/board';

@Schema({ timestamps: true })
export class Column extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ type: Types.ObjectId, ref: 'Board', required: true })
  board: Board;

  @Prop({ required: true })
  order: number;
}

export const ColumnSchema = SchemaFactory.createForClass(Column);
