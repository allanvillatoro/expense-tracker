import { useFormik } from "formik";
import { postCategory } from "./categoriesSlice";
import swal from "sweetalert";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { CategoryPost } from "../interfaces/CategoryPost";

interface CategoryForm {
  name: string;
  budget: number;
  alarmThreshold: number;
}

const initialValues: CategoryForm = {
  name: "",
  budget: 0,
  alarmThreshold: 50,
};

export const AddCategoryForm = () => {
  const dispatch = useAppDispatch();
  const loggedUser = useAppSelector((state) => state.users.user);
  const errorOnCreating = useAppSelector(
    (state) => state.categories.errorOnCreating
  );
  const formik = useFormik({
    initialValues,
    onSubmit: async (values, { resetForm }) => {
      const newCategory: CategoryPost = {
        ...values,
        userId: loggedUser._id, //"62e01522afcf618b284ee5d4",
      };
      dispatch(postCategory(newCategory)).then((response) => {
        if (response.type === "categories/postCategory/fulfilled") {
          swal("Category saved successfully");
          resetForm();
        }
      });
    },
  });
  return (
    <form aria-label="form" onSubmit={formik.handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Category</label>
        <input
          type="text"
          className="form-control"
          id="name"
          placeholder="Type a category with at least 1 character"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
      </div>
      <div className="form-group">
        <label htmlFor="budget">Budget ($)</label>
        <input
          type="number"
          className="form-control"
          id="budget"
          min="0"
          onChange={formik.handleChange}
          value={formik.values.budget}
        />
      </div>
      <div className="form-group">
        <label htmlFor="alarmThreshold">
          Alarm Threshold (between 50% and 80%)
        </label>
        <input
          type="number"
          className="form-control"
          id="alarmThreshold"
          min="50"
          max="80"
          placeholder="Type a number between 50 and 80"
          onChange={formik.handleChange}
          value={formik.values.alarmThreshold}
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
