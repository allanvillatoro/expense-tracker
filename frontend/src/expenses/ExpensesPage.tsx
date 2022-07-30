import React, { useEffect } from "react";
import { categoriesListStub } from "../categories/categoriesListStub";
import { getCategoriesByUser } from "../categories/categoriesSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { AddExpenseForm } from "./AddExpenseForm";
import { expensesListStub } from "./expensesListStub";
import { getExpensesByUser } from "./expensesSlice";
import { ExpensesTable } from "./ExpensesTable";

export const ExpensesPage = () => {

  const expenses = useAppSelector((state) => state.expenses.expenses);
  const categories = useAppSelector((state) => state.categories.categories);
  const expensesStatus = useAppSelector((state) => state.expenses.status);
  const categoriesStatus = useAppSelector((state) => state.categories.status);
  const dispatch = useAppDispatch();

  useEffect(() => {
    //update this (temporary)
    const userId = "62e01522afcf618b284ee5d4";
    if (expensesStatus === "idle") {
      dispatch(getExpensesByUser(userId));
    }
    if (categoriesStatus === "idle") {
      dispatch(getCategoriesByUser(userId));
    }
  }, [expensesStatus, dispatch]);

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
              <AddExpenseForm categories={categories.map(category=>category.name)}/>
            </div>
          </div>
        </div>
      </div>
       <ExpensesTable expenses={expenses} />
    </div>
  );
};
