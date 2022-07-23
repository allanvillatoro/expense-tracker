import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExpenseTrackerModule } from './expense-tracker/expense-tracker.module';
import { ExpensesController } from './expenses/expenses.controller';
import { ExpensesService } from './expenses/expenses.service';
import { CategoriesController } from './categories/categories.controller';
import { CategoriesService } from './categories/categories.service';

@Module({
  imports: [ExpenseTrackerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
