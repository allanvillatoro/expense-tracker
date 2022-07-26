import { Transform } from 'class-transformer';
import { IsDate, IsInt, IsMongoId, IsPositive, IsString, MaxDate, MinLength } from 'class-validator';

export class ExpenseDTO {
  @IsString()
  @MinLength(1)
  readonly description: string;
  @IsString()
  @MinLength(1)
  readonly categoryName: string;
  @IsInt()
  @IsPositive()
  readonly amount: number;
  @IsDate()
  @Transform( ({ value }) => new Date(value))
  @MaxDate(new Date())
  readonly date: Date;

  @IsString()
  @IsMongoId()
  readonly userId: string;
}
