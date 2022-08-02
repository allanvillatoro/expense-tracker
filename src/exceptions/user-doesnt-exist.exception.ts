import { HttpException, HttpStatus } from "@nestjs/common";

export class UserDoesntExist extends HttpException {
  constructor() {
    super("User doesn't exist!", HttpStatus.BAD_REQUEST);
  }
}