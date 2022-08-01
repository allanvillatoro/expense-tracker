import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CategoryDTO } from './dto/category.dto';
import { CategoriesService } from './categories.service';
import { ApiBadRequestResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ValidationPipe } from '../pipes/validation.pipe';
import { CategoryAlreadyExists } from '../exceptions/category-already-exists.exception';
import ParamsWithUserId from '../utils/params-with-id';
import { Category } from 'src/schemas/category.schema';

@ApiTags('Categories')
@Controller('api/categories')
export class CategoriesController {

    constructor(private readonly categoriesService: CategoriesService) {}

    @Post()
    @ApiResponse({status:201, description: 'Category was created', type: Category })
    @ApiResponse({status:400, description: 'Bad request'})
    @ApiBadRequestResponse({ description: new CategoryAlreadyExists().message, type: CategoryAlreadyExists })
    postCategory(@Body(new ValidationPipe()) category: CategoryDTO) {
        return this.categoriesService.postCategory(category);
    }

    @Get(':userId')
    getCategoriesByUser(@Param() {userId}: ParamsWithUserId) {
      return this.categoriesService.getCategoriesByUser(userId);
    }
}
