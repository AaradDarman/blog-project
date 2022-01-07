import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createNewPost } from "../redux/slices/posts";
import { postContext } from "./post-context";

const PostContext = ({ children }) => {
  const [postTitle, setPostTitle] = useState("");
  const [postSubtitle, setPostSubtitle] = useState("");
  const [bannerImage, setBannerImage] = useState();
  const [contentImages, setContentImages] = useState([]);
  const [content, setContent] = useState({});

  const dispatch = useDispatch();

  const handleCreatePost = () => {
    dispatch(
      createNewPost({
        post: {
          title: postTitle,
          bannerImage: `/images/${bannerImage.name}`,
          content,
        },
      })
    );
  };

  return (
    <postContext.Provider
      value={{
        postTitle,
        setPostTitle,
        postSubtitle,
        setPostSubtitle,
        bannerImage,
        setBannerImage,
        contentImages,
        setContentImages,
        content,
        setContent,
        handleCreatePost,
      }}
    >
      {children}
    </postContext.Provider>
  );
};

export default PostContext;
