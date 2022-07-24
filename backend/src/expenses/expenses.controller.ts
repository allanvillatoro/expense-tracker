import { Body, Controller, Get, Post } from '@nestjs/common';
import { ValidationPipe } from '../pipes/validation.pipe';
import { ExpenseDTO } from './dto/expense.dto';
import { ExpensesService } from './expenses.service';

@Controller('api/expenses')
export class ExpensesController {

    constructor(private readonly expensesService: ExpensesService) {}

    @Post()
    postExpense(@Body(new ValidationPipe()) expense: ExpenseDTO) {
        return this.expensesService.postExpense(expense);
    }

    @Get()
    getExpenses() {
      return this.expensesService.getExpenses();
    }
}
