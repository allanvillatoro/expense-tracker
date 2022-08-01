import { ApiProperty } from "@nestjs/swagger";

export class LoggedInUserDTO {
  @ApiProperty({
    example: '62e01522afcf618b284ee5d4',
    description: 'User Id',
    uniqueItems: true
  })
  _id: string;
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
