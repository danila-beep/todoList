import React from "react";
import s from "./modal.module.css";
import { createPortal } from "react-dom";
import { useFormik } from "formik";
import CheckBox from "../CheckBox/CheckBox";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginTC } from "../../store/slices/auth.slice";
import { useAppDispatch } from "../../utils/hooks/useAppDispatch";
import { RootStateType } from "../../store/store";
import { Navigate, useNavigate } from "react-router-dom";

const LoginModal = () => {
  const isLoggedIn = useSelector(
    (state: RootStateType) => state.auth.isLoggedIn
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Required").email("Invalid email address"),
      password: Yup.string()
        .min(5, "Password length must be at least 5 charachters")
        .max(20, "Password length wouldn`t be greater than 20 charachters")
        .required("Required"),
    }),
    onSubmit: (values) => {
      dispatch(loginTC(values));
     // formik.resetForm();
    },
  });

  if(isLoggedIn){
    navigate("/")
  }

  return (
    <div className={s.modalWrapper}>
      <div className={s.modalContainer}>
        <h1>Sign In</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className={s.formInput}>
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              placeholder="type the e-mail"
              {...formik.getFieldProps("email")}
            />
          </div>
          <div className={s.formInput}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="type the password..."
              {...formik.getFieldProps("password")}
            />
          </div>
          <div className={s.checkboxWrapper24}>
            <input
              type="checkbox"
              id="check-24"
              checked={formik.values.rememberMe}
              {...formik.getFieldProps("rememberMe")}
            />
            <label htmlFor="check-24">
              <span></span>Remember Me
            </label>
          </div>
          <button type="submit" className={s.submitButton}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
