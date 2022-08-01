import React from "react";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { register } from "./usersSlice";
import { UserPost } from "../interfaces/UserPost";
import { useNavigate } from "react-router-dom";

interface RegisterForm {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const initialValues: RegisterForm = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const validate = (values: RegisterForm) => {
  let errors = {};

  if (values.fullName && values.fullName.length < 1) {
    errors = {
      ...errors,
      fullName: "Full name should contain at least 1 character",
    };
  }

  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors = { ...errors, email: "Invalid email address" };
  }

  if (
    (values.password &&
      !/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(
        values.password
      )) ||
    (values.password.length >= 1 && values.password.length < 6)
  ) {
    errors = {
      ...errors,
      password:
        "It should contain at least 6 characters (uppercase, lowercase and number)",
    };
  }

  if (values.confirmPassword && values.confirmPassword !== values.password) {
    errors = { ...errors, confirmPassword: "It should match password above" };
  }

  return errors;
};

export const RegisterPage = () => {
  let navigate = useNavigate();
  const dispatch = useAppDispatch();
  const errorOnRegistering = useAppSelector((state) => state.users.errorsOnRegistering);
  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: (values) => {
      const newUserPost : UserPost = {
        email: values.email,
        fullName: values.fullName,
        password: values.password
      }
      dispatch(register(newUserPost)).then((response) => {
        if (response.type === "users/register/fulfilled") {
          //go to login page
          navigate("../login", { replace: true })
        }
      });
    },
  });

  return (
    <div
      className="col-12 col-lg-4 offset-lg-4 pageContainer"
      style={{ height: 550, padding: 20 }}
    >
      <h2 className="text-center">Create account</h2>
      <form aria-label="form" onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            className="form-control"
            id="fullName"
            placeholder="Type your full name"
            onChange={formik.handleChange}
            value={formik.values.fullName}
          />
          {formik.errors.fullName ? <div>{formik.errors.fullName}</div> : null}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Type your email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email ? <div>{formik.errors.email}</div> : null}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Type your password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password ? <div>{formik.errors.password}</div> : null}
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            placeholder="Confirm your password"
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
          />
          {formik.errors.confirmPassword ? (
            <div>{formik.errors.confirmPassword}</div>
          ) : null}
        </div>
        <br />
        <button
          className="btn btn-primary"
          style={{ width: "100%" }}
          type="submit"
        >
          Register
        </button>
        {errorOnRegistering && <span>{errorOnRegistering}</span>}
      </form>
    </div>
  );
};
