import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBadRequestResponse } from '@nestjs/swagger';
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

    @Get()
    getExpenses() {
      return this.expensesService.getExpenses();
    }
}
