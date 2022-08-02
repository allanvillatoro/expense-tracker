import { HttpException, HttpStatus } from "@nestjs/common";

export class CategoryAlreadyExists extends HttpException {
  constructor() {
    super("Category already exists!", HttpStatus.BAD_REQUEST);
  }
}