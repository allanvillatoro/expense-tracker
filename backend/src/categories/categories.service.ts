import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryAlreadyExists } from '../exceptions/category-already-exists.exception';
import { Category } from '../schemas/category.schema';
import { CategoryDTO } from './dto/category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('expensecategories')
    private readonly categoryModel: Model<Category>,
  ) {}

  async postCategory(category: CategoryDTO) {
    const existingCategory = await this.categoryModel
      .findOne({ name: {$regex: category.name, $options: "i"} })
      .exec();
    if (existingCategory) throw new CategoryAlreadyExists();
    const createdCategory = await new this.categoryModel(category).save();
    return createdCategory as CategoryDTO;
  }

  async getCategories() {
    const categories = await this.categoryModel.find()
      .exec();
    return categories as Array<CategoryDTO>;
  }
}
