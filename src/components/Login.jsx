import React, { useContext, useRef, useState } from "react";

import { Button, FormGroup, InputGroup } from "@blueprintjs/core";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { darken } from "polished";

import Icon from "./shared/Icon";
import { useAuth } from "../context/auth-context";
import { toEnglishDigits } from "../utils/string-helper";
import LoadingSpinner from "./shared/LoadingSpinner";

const Wraper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  .login {
    min-width: 300px;
    border-radius: 0.5rem;
    font-size: 0.8rem;
    background-color: ${({ theme }) => theme.primary};
    padding: 15px 25px 25px 25px;
    position: relative;
  }
  h5.title {
    font-size: 1.2rem;
    text-align: center;
    color: ${({ theme }) => theme.text};
    margin-bottom: 1rem;
  }
  .bp3-form-group {
    margin-bottom: 1rem;
  }
  & .bp3-form-group:nth-child(3) {
    margin-bottom: 2rem;
  }

  .bp3-button {
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text};
  }
  .bp3-button,
  .bp3-button {
    background-image: none;
    box-shadow: none;
  }

  .bp3-button.bp3-active {
    background-color: ${({ theme }) => theme.darkAccent};
  }

  h5 {
    color: #5c7080;
    font-size: 0.8rem;
  }
  .changePageBtn,
  .forgetPassBtn {
    color: ${({ theme }) => theme.text};
    margin-right: 0.3rem;
    transition: all 0.3s ease-in-out;
    text-decoration: none;
  }
  .changePageBtn:hover,
  .forgetPassBtn:hover {
    color: ${({ theme }) => theme.accent};
  }
  .login-btn {
    background-color: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.text};
    padding: 0.6rem 0;
    box-shadow: 0 0 0 1px rgb(16 22 26 / 40%);
    background-image: none;
    transition: all 0.3s ease;
  }
  .cancel-btn {
    background-color: transparent;
    border: 1px solid #606262;
    color: #606262;
    padding: 0.6rem 0;
    box-shadow: 0 0 0 1px rgb(16 22 26 / 40%);
    background-image: none;
    transition: all 0.3s ease;
  }
  .login-btn,
  .cancel-btn {
    flex: 1;
  }
  .login-btn:hover {
    background-color: ${({ theme }) => darken(0.1, theme.accent)};
  }
  .cancel-btn:hover {
    background-color: transparent;
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const { handleLogin, email, setEmail, password, setPassword, authLoading } =
    useAuth();

  const VerifySchema = Yup.object().shape({
    email: Yup.string()
      .email("???????? ???????? ?????? ???????? ?????? ????????")
      .required("???? ???????? ?????? ???????? ???????????? ???? ????????"),
    password: Yup.string()
      .label("Password")
      .required("???? ???????? ?????? ???????? ???????????? ???? ????????"),
  });
  const passElem = useRef(null);

  return (
    <Wraper>
      <LoadingSpinner show={authLoading} />
      <Formik
        initialValues={{
          email,
          password,
        }}
        enableReinitialize={false}
        validationSchema={VerifySchema}
        onSubmit={handleLogin}
      >
        {({
          values,
          handleBlur,
          errors,
          touched,
          setFieldValue,
          handleSubmit,
        }) => (
          <form noValidate className="login rtl">
            <h5 className="title">????????</h5>
            <FormGroup
              helperText={errors.email && touched.email ? errors.email : ""}
              labelInfo="*"
              label="??????????"
            >
              <InputGroup
                intent={
                  errors.email && touched.email
                    ? "danger"
                    : touched.email && "success"
                }
                onChange={(e) => {
                  setEmail(toEnglishDigits(e.target.value));
                  setFieldValue("email", toEnglishDigits(e.target.value));
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    passElem.current.focus();
                  }
                }}
                value={values.email}
                onBlur={handleBlur("email")}
                placeholder="?????????? ?????? ???? ???????? ????????"
                rightElement={<Icon className="icon" icon="name" size={20} />}
                type="email"
              />
            </FormGroup>
            <FormGroup
              helperText={
                errors.password && touched.password ? errors.password : ""
              }
              labelInfo="*"
              label="?????? ????????"
            >
              <InputGroup
                intent={
                  errors.password && touched.password
                    ? "danger"
                    : touched.password && "success"
                }
                onChange={(e) => {
                  setPassword(e.target.value);
                  setFieldValue("password", e.target.value);
                }}
                value={values.password}
                onBlur={handleBlur("password")}
                placeholder="?????? ???????? ?????? ???? ???????? ????????"
                rightElement={
                  <Icon className="icon" icon="password" size={20} />
                }
                type="password"
                inputRef={passElem}
              />
            </FormGroup>
            <div className="d-flex">
              <Button className="login-btn mr-1" onClick={handleSubmit}>
                ????????
              </Button>
              <Button
                className="cancel-btn ml-1"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/", { replace: true });
                }}
              >
                ????????????
              </Button>
            </div>
            <h5 className="mt-3 mb-2">
              ???????? ?????? ?????? ????????????
              <Link className="changePageBtn" to={"/signup"}>
                ?????? ??????
              </Link>
            </h5>
            <h5>
              ?????????? ???????????? ??????????
              <Link className="forgetPassBtn" to="/forget-password">
                ??????????????
              </Link>
            </h5>
          </form>
        )}
      </Formik>
    </Wraper>
  );
};

export default Login;
