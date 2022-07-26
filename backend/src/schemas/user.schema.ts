import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Transform } from 'class-transformer';
import { Document, ObjectId } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ versionKey: false })
export class User {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop()
  @Exclude()
  password: string;

  @Prop({ required: true })
  fullName: string;
}

export const UserSchema = SchemaFactory.createForClass(User);