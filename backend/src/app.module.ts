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
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/env.config';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'), 
    }),
    ConfigModule.forRoot({
      load: [EnvConfiguration]
    }),
    MongooseModule.forFeature([
      { name: Expense.name, schema: ExpenseSchema },
      { name: Category.name, schema: CategorySchema },
      { name: User.name, schema: UserSchema }
    ]),
    MongooseModule.forRoot(process.env.MONGODB)
  ],
  controllers: [ExpensesController, CategoriesController, UsersController],
  providers: [ExpensesService, CategoriesService, UsersService],
})
export class AppModule {}
