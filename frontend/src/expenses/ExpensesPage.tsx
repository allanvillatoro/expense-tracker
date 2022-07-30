import React from "react";
import { categoriesListStub } from "../categories/categoriesListStub";
import { AddExpenseForm } from "./AddExpenseForm";
import { expensesListStub } from "./expensesListStub";
import { ExpensesTable } from "./ExpensesTable";

export const ExpensesPage = () => {
  return (
    <div className="col-12 col-lg-10 offset-lg-1 pageContainer">
      <h2>Expenses</h2>
      {/* Button trigger modal */}
      <div style={{ alignSelf: "end" }}>
        <button
          type="button"
          className="btn btn-danger"
          data-bs-toggle="modal"
          data-bs-target="#AddExpenseFormModal"
          style={{ width: 100 }}
        >
          Add
        </button>
      </div>
      <br/>

      {/* Modal */}
      <div
        className="modal fade"
        id="AddExpenseFormModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add Expense
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <AddExpenseForm categories={categoriesListStub.map(category=>category.name)}/>
            </div>
          </div>
        </div>
      </div>
      <ExpensesTable expenses={expensesListStub} />
    </div>
  );
};
