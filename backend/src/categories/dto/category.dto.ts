import { IsInt, IsMongoId, IsPositive, IsString, Max, Min, MinLength } from 'class-validator';

export class CategoryDTO {
  @IsString()
  @MinLength(1)
  readonly name: string;
  @IsInt()
  @IsPositive()
  readonly budget: number;
  @IsInt()
  @Min(50)
  @Max(80)
  readonly alarmThreshold: number;

  @IsString()
  @IsMongoId()
  readonly userId: string;
}
