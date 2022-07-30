import React from "react";
import { useFormik } from "formik";
import { UserLoginForm } from "../interfaces/UserPost";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { login } from "./usersSlice";
import { useNavigate } from "react-router-dom";

const initialValues: UserLoginForm = {
  email: "",
  password: "",
};

export const LoginPage = () => {
  let navigate = useNavigate();
  const dispatch = useAppDispatch();
  const errorsOnLogin = useAppSelector((state) => state.users.errorsOnLogin);
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      dispatch(login(values)).then((response) => {
        if (response.type === "users/login/fulfilled") {
          //go to home
          navigate("../", { replace: true })
        }
      });
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
        {errorsOnLogin && <span>{errorsOnLogin}</span>}
      </form>
      <br />
      <div style={{ alignSelf: "center" }}>
        <span>Not registered yet? </span>
        <a href="/register">Create an account</a>
      </div>
    </div>
  );
};
