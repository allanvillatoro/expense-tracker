import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Document, ObjectId } from 'mongoose';

export type ExpenseDocument = Expense & Document;

@Schema({versionKey: false})
export class Expense {

  @ApiProperty({
    example: '62e8501f550d2de3dd17eae7',
    description: 'Expense Id',
    uniqueItems: true
  })
  @Transform(({ value }) => value.toString())
  _id: string;

  @ApiProperty({
    example: 'pizza',
    description: 'Expense description'
  })
  @Prop({ required: true })
  description: string;
  
  @ApiProperty({
    example: 'food',
    description: 'Category Name'
  })
  @Prop({ required: true })
  categoryName: string;

  @ApiProperty({
    example: 5,
    description: 'Amount ($)'
  })
  @Prop({ required: true })
  amount: number;

  @ApiProperty({
    example: '2022-08-01T17:28:44.584Z',
    description: 'Expense Date'
  })
  @Prop({ required: true })
  date: Date;

  //adding user relation
  @ApiProperty({
    example: '62e8501f550d2de3dd17eae7',
    description: 'Used Id'
  })
  @Prop({ required: true })
  userId: string;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);
