import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ExpenseDocument = Expense & Document;

@Schema()
export class Expense {
  @Prop()
  description: string;
  @Prop()
  categoryName: string;
  @Prop()
  amount: number;
  @Prop()
  date: Date;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);
