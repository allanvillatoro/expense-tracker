import React from "react";
import { useFormik } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
  categories: string[];
}

export const AddExpenseForm = ({ categories }: AddExpenseFormProps) => {
  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted
  const formik = useFormik({
    initialValues,
    onSubmit: (values, {resetForm}) => {
      //if it's okay
      resetForm()
      alert(JSON.stringify(values, null, 2));
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
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="amount">Amount</label>
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
        className="btn btn-danger"
        style={{ width: "100%" }}
        type="submit"
      >
        Save
      </button>
    </form>
  );
};
