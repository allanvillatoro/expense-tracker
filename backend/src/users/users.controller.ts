import { Body, Controller, Post } from '@nestjs/common';
import { ApiBadRequestResponse } from '@nestjs/swagger';
import { EmailAlreadyExists } from '../exceptions/email-already-exists.exception';
import { ValidationPipe } from '../pipes/validation.pipe';
import { UserDTO } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {

}
