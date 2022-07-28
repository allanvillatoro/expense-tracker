import React from 'react'
import { Expense } from '../interfaces/Expense'

interface ExpenseRowProps {
    expense: Expense
}

export const ExpenseRow = ({expense}: ExpenseRowProps) => {
  return (
    <tr>
        <td>{expense.description}</td>
        <td>{expense.categoryName}</td>
        <td>{expense.amount}</td>
        <td>{expense.date.toLocaleDateString()}</td>
    </tr>
  )
}
