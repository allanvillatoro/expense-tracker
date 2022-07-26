import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type ExpenseDocument = Expense & Document;

@Schema({versionKey: false})
export class Expense {
  @Prop({ required: true })
  description: string;
  
  @Prop({ required: true })
  categoryName: string;
  @Prop({ required: true })
  amount: number;
  @Prop({ required: true })
  date: Date;

  //adding user relation
  @Prop({ required: true })
  userId: string;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);
