import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmailAlreadyExists } from '../exceptions/email-already-exists.exception';
import { User } from '../schemas/user.schema';
import { UserDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('users')
    private readonly userModel: Model<User>,
  ) {}

  async register(user: UserDTO) {
    const existingUser = await this.userModel
      .findOne({ email: { $regex: user.email, $options: 'i' } })
      .exec();
    if (existingUser) throw new EmailAlreadyExists();

    const { password, ...userData } = user;
    const userPasswordHash = {
      ...userData,
      password: bcrypt.hashSync(password, 10)
    };

    await new this.userModel(userPasswordHash).save();
    delete userPasswordHash.password;
    return userPasswordHash;
  }
}
