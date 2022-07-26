import React, { useEffect } from "react";
import { getCategoriesByUser } from "../categories/categoriesSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { AddExpenseForm } from "./AddExpenseForm";
import { getExpensesByUser } from "./expensesSlice";
import { ExpensesTable } from "./ExpensesTable";

export const ExpensesPage = () => {
  const loggedUser = useAppSelector((state) => state.users.user);
  const categories = useAppSelector((state) => state.categories.categories);
  const expenses = useAppSelector((state) => state.expenses.expenses);
  const expensesStatus = useAppSelector((state) => state.expenses.status);
  const categoriesStatus = useAppSelector((state) => state.categories.status);
  const dispatch = useAppDispatch();

  useEffect(() => {
    //const userId = "62e01522afcf618b284ee5d4";
    if (expensesStatus === "idle") {
      dispatch(getExpensesByUser(loggedUser._id));
    }
    if (categoriesStatus === "idle") {
      dispatch(getCategoriesByUser(loggedUser._id));
    }
  }, [categoriesStatus,dispatch, expensesStatus,loggedUser._id]);

  return (
    <div className="col-12 col-lg-10 offset-lg-1 pageContainer">
      <h3>Expenses</h3>
      {/* Button trigger modal */}
      <div style={{ alignSelf: "end" }}>
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#AddExpenseFormModal"
          style={{ width: 100 }}
        >
          Add
        </button>
      </div>
      <br />

      {/* Modal */}
      <div
        className="modal fade"
        id="AddExpenseFormModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
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
              <AddExpenseForm
                categoriesList={categories.map((category) => category.name)}
              />
            </div>
          </div>
        </div>
      </div>
      <ExpensesTable expenses={expenses} />
    </div>
  );
};
