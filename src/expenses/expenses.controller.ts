import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import ParamsWithUserId from '../utils/params-with-id';
import { CategoryDoesntExist } from '../exceptions/category-doesnt-exist.exception';
import { ValidationPipe } from '../pipes/validation.pipe';
import { ExpenseDTO } from './dto/expense.dto';
import { ExpensesService } from './expenses.service';
import { Expense } from '../schemas/expense.schema';

@ApiTags('Expenses')
@Controller('api/expenses')
export class ExpensesController {

    constructor(private readonly expensesService: ExpensesService) {}

    @Post()
    @ApiOperation({
      summary: "Create a new expense",
      description: "Create a new expense"
    })
    @ApiResponse({status:201, description: 'Expense was created', type: Expense })
    @ApiResponse({status:400, description: 'Bad request'})
    @ApiBadRequestResponse({ description: new CategoryDoesntExist().message, type: CategoryDoesntExist })
    postExpense(@Body(new ValidationPipe()) expense: ExpenseDTO) {
        return this.expensesService.postExpense(expense);
    }

    @Get(':userId')
    @ApiOperation({
      summary: "Get expenses by user",
      description: "Get expenses by user"
    })
    getExpensesByUser(@Param() {userId}: ParamsWithUserId) {
      return this.expensesService.getExpensesByUser(userId);
    }
}
