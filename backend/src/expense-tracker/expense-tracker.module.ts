import { Module } from '@nestjs/common';
import { CategoriesController } from 'src/categories/categories.controller';
import { CategoriesService } from 'src/categories/categories.service';
import { ExpensesService } from 'src/expenses/expenses.service';
import { ExpensesController } from '../expenses/expenses.controller';

@Module({
  imports: [],
  controllers: [ExpensesController, CategoriesController],
  providers: [ExpensesService, CategoriesService],
})
export class ExpenseTrackerModule {}
