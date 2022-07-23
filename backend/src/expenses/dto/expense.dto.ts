import { IsDate, IsInt, IsPositive, IsString, MaxDate, MinLength } from 'class-validator';

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
  //I will try this later for dates < now
  //@Transform( ({ value }) => new Date(value))
  //@MinDate(new Date())
  readonly date: Date;
}
