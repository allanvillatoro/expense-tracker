import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsMongoId, IsPositive, IsString, Max, Min, MinLength, isString } from 'class-validator';

export class CategoryDTO {

  @ApiProperty({
    example: 'drinks',
    description: 'Category Name',
    uniqueItems: true,
    minLength: 1
  })
  @IsString()
  @MinLength(1)
  readonly name: string;

  @ApiProperty({
    example: 100,
    description: 'Budget ($)',
    minimum: 0
  })
  @IsInt()
  @IsPositive()
  readonly budget: number;

  @ApiProperty({
    example: 75,
    description: 'Alarm Threshold (%)',
    minimum: 50,
    maximum: 80
  })
  @IsInt()
  @Min(50)
  @Max(80)
  readonly alarmThreshold: number;

  @ApiProperty({
    example: '62e01522afcf618b284ee5d4',
    description: 'User Id',
  })
  @IsString()
  @IsMongoId()
  readonly userId: string;
}
