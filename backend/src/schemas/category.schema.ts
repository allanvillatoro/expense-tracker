import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema({ versionKey: false })
export class Category {

  @ApiProperty({
    example: '62e8501f550d2de3dd17eae7',
    description: 'Category Id',
    uniqueItems: true
  })
  @Transform(({ value }) => value.toString())
  _id: string;

  @ApiProperty({
    example: 'food',
    description: 'Category Name',
    uniqueItems: true
  })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    example: 500,
    description: 'Category Budget'
  })
  @Prop({ required: true })
  budget: number;

  @ApiProperty({
    example: 50,
    description: 'Category Alarm Threshold (between 50% and 80%)'
  })
  @Prop({ required: true })
  alarmThreshold: number;

  //adding user relation
  @ApiProperty({
    example: '62e01522afcf618b284ee5d4',
    description: 'User ID'
  })
  @Prop({ required: true })
  userId: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
