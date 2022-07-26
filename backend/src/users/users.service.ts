import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmailAlreadyExists } from '../exceptions/email-already-exists.exception';
import { User } from '../schemas/user.schema';
import { UserDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDTO } from './dto/login-user.dto';
import { LoggedInUserDTO } from './dto/logged-in-user.dto';
import { CreatedUserDTO } from './dto/created-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
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
      password: bcrypt.hashSync(password, 10),
    };

    await new this.userModel(userPasswordHash).save();
    //delete userPasswordHash.password;

    const createdUser : CreatedUserDTO = {
      email: user.email,
      fullName: user.fullName
    }

    return createdUser;
  }

  async login(loginUserDTO: LoginUserDTO) {
    const { password, email } = loginUserDTO;
    const user = await this.userModel.findOne({ email })
    .exec();

    if (!user)
      throw new UnauthorizedException('Credentials are not valid (email)');

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credentials are not valid (password)');
    const loggedInUser : LoggedInUserDTO = {
      _id: user._id,
      email: user.email,
      fullName: user.fullName
    }
    return loggedInUser;
  }
}
