import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBadRequestResponse } from '@nestjs/swagger';
import ParamsWithUserId from '../utils/params-with-id';
import { CategoryDoesntExist } from '../exceptions/category-doesnt-exist.exception';
import { ValidationPipe } from '../pipes/validation.pipe';
import { ExpenseDTO } from './dto/expense.dto';
import { ExpensesService } from './expenses.service';

@Controller('api/expenses')
export class ExpensesController {

    constructor(private readonly expensesService: ExpensesService) {}

    @Post()
    @ApiBadRequestResponse({ description: new CategoryDoesntExist().message })
    postExpense(@Body(new ValidationPipe()) expense: ExpenseDTO) {
        return this.expensesService.postExpense(expense);
    }

    @Get(':userId')
    getExpensesByUser(@Param() {userId}: ParamsWithUserId) {
      return this.expensesService.getExpenses(userId);
    }
}
