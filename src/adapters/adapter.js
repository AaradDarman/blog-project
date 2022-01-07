import http from "./xhr";
import config from "./xhr/config.json";

const signup = (user) => {
  return http.post(`${config.localapi}/signup`, JSON.stringify(user));
};

const login = (user) => {
  return http.post(`${config.localapi}/login`, JSON.stringify(user));
};

const verify = (verificationCode) => {
  return http.post(
    `${config.localapi}/verifiy-account`,
    JSON.stringify(verificationCode)
  );
};

const changePassword = (data) => {
  return http.post(`${config.localapi}/changepassword`, JSON.stringify(data));
};

const forgetPassword = (data) => {
  return http.post(`${config.localapi}/forgetpassword`, JSON.stringify(data));
};

const resendCode = (userId) => {
  return http.post(`${config.localapi}/resend-code`, JSON.stringify(userId)); 
};

export default {
  signup,
  login,
  verify,
  changePassword,
  forgetPassword,
  resendCode,
};
