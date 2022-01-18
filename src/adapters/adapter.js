import http from "./xhr";
import config from "./xhr/config.json";

const signup = (user) => {
  return http.post(`${config.api}/signup`, JSON.stringify(user));
};

const login = (user) => {
  return http.post(`${config.api}/login`, JSON.stringify(user));
};

const verify = (verificationCode) => {
  return http.post(
    `${config.api}/verifiy-account`,
    JSON.stringify(verificationCode)
  );
};

const changePassword = (data) => {
  return http.post(`${config.api}/change-password`, JSON.stringify(data));
};

const forgetPassword = (data) => {
  return http.post(`${config.api}/forget-password`, JSON.stringify(data));
};

const resendCode = (userId) => {
  return http.post(`${config.api}/resend-code`, JSON.stringify(userId));
};

const changeProfileImage = (data) => {
  return http.post(`${config.api}/change-profile-image`, data);
};

const getPosts = () => {
  return http.get(`${config.api}/posts`);
};

const getPost = (id) => {
  return http.get(`${config.api}/post/${id}`);
};

const getCategories = () => {
  return http.get(`${config.api}/posts/categories`);
};

export default {
  signup,
  login,
  verify,
  changePassword,
  forgetPassword,
  resendCode,
  getPosts,
  getPost,
  changeProfileImage,
  getCategories,
};
