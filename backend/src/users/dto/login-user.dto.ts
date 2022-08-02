import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, isString, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class LoginUserDTO {
  
  @ApiProperty({
    example: 'allanvillatoro@gmail.com',
    description: 'User Email',
    uniqueItems: true
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'NestJS2022',
    description: 'User Password',
    minLength: 6,
    maxLength: 50
  })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password: string;
}
