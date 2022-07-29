import React from "react";
import { useFormik } from "formik";

interface UserLoginForm {
  email: string;
  password: string;
}

const initialValues: UserLoginForm = {
  email: "",
  password: "",
};
/*
const validate = (values: UserLoginForm) => {
  let errors = {};
  if (!values.email) {
    errors = { ...errors, email: "Required" };
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors = { ...errors, email: "Invalid email address" };
  }
  return errors;
};*/

export const LoginPage = () => {
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div
      className="col-12 col-lg-4 offset-lg-4 pageContainer"
      style={{ height: 400 }}
    >
      <h2 className="text-center">Login</h2>
      <form aria-label="form" onSubmit={formik.handleSubmit}>
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
        </div>
        <br />
        <button
          className="btn btn-danger"
          style={{ width: "100%" }}
          type="submit"
        >
          Login
        </button>
      </form>
      <br />
      <div style={{ alignSelf: "center" }}>
          <span>Not registered yet? </span>
          <a href="/register">Create an account</a>
        </div>
    </div>
  );
};
