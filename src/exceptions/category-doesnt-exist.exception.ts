import { HttpException, HttpStatus } from "@nestjs/common";

export class CategoryDoesntExist extends HttpException {
  constructor() {
    super("Category doesn't exist!", HttpStatus.BAD_REQUEST);
  }
}