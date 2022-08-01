import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

class ParamsWithUserId {

  @ApiProperty({
    example: '62e01463afcf618b284ee5bd',
    description: 'User Id'
  })
  @IsMongoId()
  userId: string;
}

export default ParamsWithUserId;