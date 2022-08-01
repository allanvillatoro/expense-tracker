import React from "react";
import { useFormik } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ExpensePost } from "../interfaces/ExpensePost";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { postExpense } from "./expensesSlice";
import swal from "sweetalert";
import { Expense } from "../interfaces/Expense";

interface ExpenseForm {
  description: string;
  categoryName: string;
  amount: number;
  date: Date;
}

const initialValues: ExpenseForm = {
  description: "",
  categoryName: "",
  amount: 0,
  date: new Date(),
};

interface AddExpenseFormProps {
  categoriesList: string[];
}

export const AddExpenseForm = ({ categoriesList }: AddExpenseFormProps) => {
  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted
  const loggedUser = useAppSelector((state) => state.users.user);
  const expenses = useAppSelector((state) => state.expenses.expenses);
  const categories = useAppSelector((state) => state.categories.categories);
  const dispatch = useAppDispatch();
  const errorOnCreating = useAppSelector(
    (state) => state.expenses.errorOnCreating
  );

  const triggerAlarms = (newExpense: ExpensePost) => {
    const today = new Date();
    const newExpenseDate = new Date(newExpense.date);
    if (
      newExpenseDate.getMonth() === today.getMonth() &&
      newExpenseDate.getFullYear() === today.getFullYear()
    ) {
      //filtered by month and category
      const filteredExpensesByMonthCategory = expenses.filter(
        (currentExpense) => {
          const currentDate = new Date(currentExpense.date);
          return (
            currentDate.getMonth() === today.getMonth() &&
            currentDate.getFullYear() &&
            today.getFullYear() &&
            currentExpense.categoryName === newExpense.categoryName
          );
        }
      );
      const sumExpensesCurrentMonthCategory =
        filteredExpensesByMonthCategory.reduce(
          (previous: number, current: Expense) => previous + current.amount,
          newExpense.amount
        );
      const foundCategory = categories.find(
        (current) => current.name === newExpense.categoryName
      );
      if (foundCategory) {
        if (
          sumExpensesCurrentMonthCategory >=
          foundCategory.budget * (foundCategory.alarmThreshold / 100)
        ) {
          swal("Saved, but you are spending too much on " + foundCategory.name);
        }
      }
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values, { resetForm }) => {
      const newExpense: ExpensePost = {
        ...values,
        userId: loggedUser._id, //"62e01522afcf618b284ee5d4",
      };
      dispatch(postExpense(newExpense)).then((response) => {
        if (response.type === "expenses/postExpense/fulfilled") {
          swal("Expense saved successfully");
          triggerAlarms(newExpense);
          resetForm();
        }
      });
    },
  });
  return (
    <form aria-label="form" onSubmit={formik.handleSubmit}>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input
          type="text"
          className="form-control"
          id="description"
          placeholder="Type a description with at least 1 character"
          onChange={formik.handleChange}
          value={formik.values.description}
        />
      </div>
      <div className="form-group">
        <label htmlFor="categoryName">Category</label>
        <select
          id="categoryName"
          className="form-control"
          aria-label="Select a category"
          value={formik.values.categoryName}
          onChange={formik.handleChange}
        >
          <option value="" disabled>
            Select a category
          </option>
          {categoriesList.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="amount">Amount ($)</label>
        <input
          type="number"
          className="form-control"
          id="amount"
          min="0"
          onChange={formik.handleChange}
          value={formik.values.amount}
        />
      </div>
      <div className="form-group">
        <label htmlFor="date">Date</label>
        <DatePicker
          id="date"
          selected={formik.values.date}
          dateFormat="MMMM d, yyyy"
          className="form-control"
          maxDate={new Date()}
          onChange={(date) => formik.setFieldValue("date", date)}
        />
      </div>
      <br />
      <button
        className="btn btn-primary"
        style={{ width: "100%" }}
        type="submit"
      >
        Save
      </button>
      {errorOnCreating && <span>{errorOnCreating}</span>}
    </form>
  );
};
