import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Expense } from '../schemas/expense.schema';
import { ExpenseDTO } from './dto/expense.dto';

@Injectable()
export class ExpensesService {
    constructor(
        @InjectModel('expenses')
        private readonly expenseModel: Model<Expense>,
      ) {}
    
      async postExpense(expense: ExpenseDTO) {
        const createdExpense = await new this.expenseModel(expense).save();
        return createdExpense as ExpenseDTO;
      }
    
      async getExpenses() {
        const expenses = await this.expenseModel.find()
          .sort({date: -1})
          .exec();
        return expenses as Array<ExpenseDTO>;
      }
}
