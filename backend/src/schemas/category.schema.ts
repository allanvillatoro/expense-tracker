import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema({ versionKey: false })
export class Category {
  @Prop({ unique: true, required: true })
  name: string;
  @Prop({ required: true })
  budget: number;
  @Prop({ required: true })
  alarmThreshold: number;

  //adding user relation
  @Prop({ required: true })
  userId: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
