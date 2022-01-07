import { createContext, useContext } from "react";

export const postContext = createContext({
  postTitle: {},
  setPostTitle: () => {},
  postSubtitle: {},
  setPostSubtitle: () => {},
  bannerImage: {},
  setBannerImage: () => {},
  contentImages: [],
  setContentImages: () => {},
  content: {},
  setContent: () => {},
  handleCreatePost: () => {},
});

export const useCreatePost = () => {
  return useContext(postContext);
};
