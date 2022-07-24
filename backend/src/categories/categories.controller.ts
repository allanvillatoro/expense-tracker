import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryDTO } from './dto/category.dto';
import { CategoriesService } from './categories.service';
import { ApiBadRequestResponse } from "@nestjs/swagger";
import { ValidationPipe } from '../pipes/validation.pipe';
import { CategoryAlreadyExists } from '../exceptions/category-already-exists.exception';

@Controller('api/categories')
export class CategoriesController {

    constructor(private readonly categoriesService: CategoriesService) {}

    @Post()
    @ApiBadRequestResponse({ description: new CategoryAlreadyExists().message })
    postCategory(@Body(new ValidationPipe()) category: CategoryDTO) {
        return this.categoriesService.postCategory(category);
    }

    @Get()
    getCategories() {
      return this.categoriesService.getCategories();
    }
}
