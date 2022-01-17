import http from "./xhr";
import config from "./xhr/config.json";

const createPost = (post) => {
  return http.post(`${config.localapi}/post/create`, post);
};

const editPost = (id, data) => {
  return http.put(`${config.localapi}/post/edit/${id}`, data);
};

const deletePost = (id) => {
  return http.delete(`${config.localapi}/post/delete/${id}`);
};

const getPosts = () => {
  return http.get(`${config.localapi}/posts`);
};

const getPostsByAuthor = (author) => {
  return http.get(`${config.localapi}/posts/author/${author}`);
};

const getPostsByCategory = (category) => {
  return http.get(`${config.localapi}/posts/category/${category}`);
};

const getPostsByTag = (tag) => {
  return http.get(`${config.localapi}/posts/tag/${tag}`);
};

const getAuthorInfo = () => {
  return http.get(`${config.localapi}/get-author-info`);
};

export default {
  createPost,
  editPost,
  deletePost,
  getPosts,
  getPostsByAuthor,
  getPostsByCategory,
  getPostsByTag,
  getAuthorInfo,
};
