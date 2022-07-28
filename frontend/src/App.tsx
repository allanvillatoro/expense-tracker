import React from "react";
import "./Styles.css";
import { ExpensesTable } from "./expenses/ExpensesTable";
import { expensesListStub } from "./expenses/expensesListStub";

function App() {
  return (
    <div>
      <header></header>
      Expense Tracker
      <ExpensesTable expenses={expensesListStub} />
    </div>
  );
}

export default App;
