import { IsMongoId } from 'class-validator';

class ParamsWithUserId {
  @IsMongoId()
  userId: string;
}

export default ParamsWithUserId;