import { Body, Controller, Post } from '@nestjs/common';
import { ApiBadRequestResponse } from '@nestjs/swagger';
import { EmailAlreadyExists } from '../exceptions/email-already-exists.exception';
import { ValidationPipe } from '../pipes/validation.pipe';
import { UserDTO } from './dto/user.dto';
import { UsersService } from './users.service';
import { LoginUserDTO } from './dto/login-user.dto';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @ApiBadRequestResponse({ description: new EmailAlreadyExists().message })
  register(@Body(new ValidationPipe()) user: UserDTO) {
    return this.usersService.register(user);
  }

  @Post('login')
  login(@Body(new ValidationPipe()) user: LoginUserDTO) {
    return this.usersService.login(user);
  }
}
