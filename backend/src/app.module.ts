import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExpensesController } from './expenses/expenses.controller';
import { ExpensesService } from './expenses/expenses.service';
import { CategoriesController } from './categories/categories.controller';
import { CategoriesService } from './categories/categories.service';

@Module({
  imports: [],
  controllers: [AppController,ExpensesController,CategoriesController],
  providers: [AppService,ExpensesService, CategoriesService],
})
export class AppModule {}
