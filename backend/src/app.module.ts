import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExpensesController } from './expenses/expenses.controller';
import { ExpensesService } from './expenses/expenses.service';
import { CategoriesController } from './categories/categories.controller';
import { CategoriesService } from './categories/categories.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ExpenseSchema } from './schemas/expense.schema';
import { CategorySchema } from './schemas/category.schema';

//temporary
const connection = `mongodb+srv://allanvillatoro:Vanguardia2022@expense-tracker-db.5q8qdxt.mongodb.net/expensetracker?retryWrites=true&w=majority`;

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'expenses', schema: ExpenseSchema },
      { name: 'expensecategories', schema: CategorySchema }
    ]),
    MongooseModule.forRoot(connection)
  ],
  controllers: [AppController, ExpensesController, CategoriesController],
  providers: [AppService, ExpensesService, CategoriesService],
})
export class AppModule {}
