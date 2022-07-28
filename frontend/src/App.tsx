import React from "react";
import "./Styles.css";
import { ExpensesPage } from "./expenses/ExpensesPage";

function App() {
  return (
    <div>
      <header>Expense Tracker</header>
      <ExpensesPage />
    </div>
  );
}

export default App;
