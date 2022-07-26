import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmailAlreadyExists } from '../exceptions/email-already-exists.exception';
import { User } from '../schemas/user.schema';
import { UserDTO } from './dto/user.dto';

@Injectable()
export class UsersService {

}
