import React from "react";
import { Expense } from "../interfaces/Expense";
import { ExpenseRow } from "./ExpenseRow";

interface ExpensesTableProps {
  expenses: Expense[];
}

export const ExpensesTable = ({ expenses }: ExpensesTableProps) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Description</th>
          <th>Category</th>
          <th>Amount</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense) => (
          <ExpenseRow expense={expense} key={expense._id} />
        ))}
      </tbody>
    </table>
  );
};
