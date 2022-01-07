import http from "./xhr";
import config from "./xhr/config.json";

const createPost = (post) => {
  return http.post(`${config.localapi}/post/create`, JSON.stringify(post));
};

const getPosts = () => {
  return http.get(`${config.localapi}/posts`);
};

const getPostsByAuthor = (author) => {
  return http.get(`${config.localapi}/posts/${author}`);
};

export default {
  createPost,
  getPosts,
  getPostsByAuthor,
};
