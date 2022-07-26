import { Module } from '@nestjs/common';
import { ExpensesController } from './expenses/expenses.controller';
import { ExpensesService } from './expenses/expenses.service';
import { CategoriesController } from './categories/categories.controller';
import { CategoriesService } from './categories/categories.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Expense, ExpenseSchema } from './schemas/expense.schema';
import { Category, CategorySchema } from './schemas/category.schema';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { User, UserSchema } from './schemas/user.schema';

//temporary
const connection = `mongodb+srv://allanvillatoro:Vanguardia2022@expense-tracker-db.5q8qdxt.mongodb.net/expensetracker?retryWrites=true&w=majority`;

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Expense.name, schema: ExpenseSchema },
      { name: Category.name, schema: CategorySchema },
      { name: User.name, schema: UserSchema }
    ]),
    MongooseModule.forRoot(connection)
  ],
  controllers: [ExpensesController, CategoriesController, UsersController],
  providers: [ExpensesService, CategoriesService, UsersService],
})
export class AppModule {}
