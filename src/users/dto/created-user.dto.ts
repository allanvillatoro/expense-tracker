import { ApiProperty } from "@nestjs/swagger";

export class CreatedUserDTO {
  @ApiProperty({
    example: 'allanvillatoro@gmail.com',
    description: 'User Email',
    uniqueItems: true
  })
  email: string;
  @ApiProperty({
    example: 'Allan Villatoro',
    description: 'User Full Name'
  })
  fullName: string;
}
