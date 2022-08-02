import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsInt, IsMongoId, IsPositive, IsString, MaxDate, MinLength } from 'class-validator';

export class ExpenseDTO {

  @ApiProperty({
    example: 'coffee',
    description: 'Description',
    minLength: 1
  })
  @IsString()
  @MinLength(1)
  readonly description: string;

  @ApiProperty({
    example: 'drinks',
    description: 'Category Name',
    minLength: 1
  })
  @IsString()
  @MinLength(1)
  readonly categoryName: string;

  @ApiProperty({
    example: 3,
    description: 'Amount ($)',
    minimum: 0
  })
  @IsInt()
  @IsPositive()
  readonly amount: number;

  @ApiProperty({
    example: '2022-08-01T17:28:44.584Z',
    description: 'Date'
  })
  @IsDate()
  @Transform( ({ value }) => new Date(value))
  //@MaxDate(new Date())
  readonly date: Date;

  @ApiProperty({
    example: '62e01522afcf618b284ee5d4',
    description: 'User Id',
  })
  @IsString()
  @IsMongoId()
  readonly userId: string;
}
