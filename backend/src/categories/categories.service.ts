import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { CategoryAlreadyExists } from '../exceptions/category-already-exists.exception';
import { Category } from '../schemas/category.schema';
import { CategoryDTO } from './dto/category.dto';
import { UserDoesntExist } from '../exceptions/user-doesnt-exist.exception';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<Category>,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async postCategory(category: CategoryDTO) {
    const existingUser = await this.userModel.findById(category.userId).exec();
    if (!existingUser) throw new UserDoesntExist();

    const existingCategory = await this.categoryModel
      .findOne({
        name: { $regex: category.name, $options: 'i' },
        userId: category.userId,
      })
      .exec();
    if (existingCategory) throw new CategoryAlreadyExists();

    const createdCategory = await new this.categoryModel(category).save();
    return createdCategory as CategoryDTO;
  }

  async getCategoriesByUser(userId: string) {
    const categories = await this.categoryModel
      .find({ userId })
      .sort({ name: 1 })
      .exec();
    return categories as Array<CategoryDTO>;
  }
}
