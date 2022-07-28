import React from "react";
import { expensesListStub } from "./expensesListStub";
import { ExpensesTable } from "./ExpensesTable";

export const ExpensesPage = () => {
  return (
    <div className="expensesPageContainer">
      <h2>Expenses</h2>
      <div className="expensesButtonContainer" style={{alignSelf: 'end'}}>
        <button type="button" className="btn btn-primary" style={{width: 100}}>
          Add
        </button>
      </div>
      <ExpensesTable expenses={expensesListStub} />
    </div>
  );
};
