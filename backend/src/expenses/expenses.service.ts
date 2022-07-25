import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from '../schemas/category.schema';
import { Expense } from '../schemas/expense.schema';
import { ExpenseDTO } from './dto/expense.dto';
import { CategoryDoesntExist } from '../exceptions/category-doesnt-exist.exception';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectModel('expenses')
    private readonly expenseModel: Model<Expense>,
    @InjectModel('expensecategories')
    private readonly categoryModel: Model<Category>,
  ) {}

  async postExpense(expense: ExpenseDTO) {
    //case insensitive
    const existingCategory = await this.categoryModel
      .findOne({ name: {$regex: expense.categoryName, $options: "i"} })
      .exec();
    if (!existingCategory) throw new CategoryDoesntExist();
    const createdExpense = await new this.expenseModel(expense).save();
    return createdExpense as ExpenseDTO;
  }

  async getExpenses() {
    const expenses = await this.expenseModel.find().sort({ date: -1 }).exec();
    return expenses as Array<ExpenseDTO>;
  }
}
