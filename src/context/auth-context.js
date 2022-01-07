import { createContext, useContext } from "react";

export const authContext = createContext({
  fullName: "",
  setFullName: () => {},
  email: "",
  setEmail: () => {},
  birthdayDate: "",
  setBirthdayDate: () => {},
  gender: "",
  setGender: () => {},
  password: "",
  setPassword: () => {},
  handleSignUp: () => {},
  handleVerify: () => {},
  handleLogin: () => {},
  handleChangePassword: () => {},
  handleForgetPassword: () => {},
  handleResendVerificationCode: () => {},
});

export const useAuth = () => {
  return useContext(authContext);
};
