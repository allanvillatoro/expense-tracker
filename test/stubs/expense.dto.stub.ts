import { ExpenseDTO } from "src/expenses/dto/expense.dto";

export const ExpenseDTOStub = (): ExpenseDTO => {
    return {
        description: 'Coca Cola',
        categoryName: 'drinks',
        amount: 30,
        date: new Date(2022,7,23),
        userId: '62df501ee11250bb65262493'
    };
  };