import { Body, Controller, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EmailAlreadyExists } from '../exceptions/email-already-exists.exception';
import { ValidationPipe } from '../pipes/validation.pipe';
import { UserDTO } from './dto/user.dto';
import { UsersService } from './users.service';
import { LoginUserDTO } from './dto/login-user.dto';
import { CreatedUserDTO } from './dto/created-user.dto copy';
import { LoggedInUserDTO } from './dto/logged-in-user.dto';

@ApiTags('Users')
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @ApiResponse({status:201, description: 'User was created', type: CreatedUserDTO })
  @ApiResponse({status:400, description: 'Bad request'})
  @ApiBadRequestResponse({ description: new EmailAlreadyExists().message })
  register(@Body(new ValidationPipe()) user: UserDTO) {
    return this.usersService.register(user);
  }

  @Post('login')
  @ApiResponse({status:201, description: 'User exists', type: LoggedInUserDTO })
  @ApiResponse({status:400, description: 'Bad request'})
  @ApiResponse({status:401, description: 'Unauthorized'})
  login(@Body(new ValidationPipe()) user: LoginUserDTO) {
    return this.usersService.login(user);
  }
}
