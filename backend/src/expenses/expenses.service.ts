import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from '../schemas/category.schema';
import { Expense } from '../schemas/expense.schema';
import { ExpenseDTO } from './dto/expense.dto';
import { CategoryDoesntExist } from '../exceptions/category-doesnt-exist.exception';
import { User } from '../schemas/user.schema';
import { UserDoesntExist } from '../exceptions/user-doesnt-exist.exception';
import ParamsWithUserId from '../utils/params-with-id';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectModel(Expense.name)
    private readonly expenseModel: Model<Expense>,
    @InjectModel(Category.name)
    private readonly categoryModel: Model<Category>,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async postExpense(expense: ExpenseDTO) {

    //validating user
    const existingUser = await this.userModel
      .findById(expense.userId)
      .exec();
    if (!existingUser) throw new UserDoesntExist();

    //case insensitive, validating category
    const existingCategory = await this.categoryModel
      .findOne({ name: {$regex: expense.categoryName, $options: "i"}, userId: expense.userId  })
      .exec();
    if (!existingCategory) throw new CategoryDoesntExist();

    const createdExpense = await new this.expenseModel(expense).save();
    return createdExpense;
  }

  async getExpensesByUser(userId: string) {

    const expenses = await this.expenseModel.find({userId}).sort({ date: -1 }).exec();
    return expenses;
  }
}
