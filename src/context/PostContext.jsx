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
    let formData = new FormData();
    let contentImagesFiles = contentImages.map((c) => c.file);
    for (let i = 0; i < contentImagesFiles.length; i++) {
      formData.append(contentImagesFiles[i].name, contentImagesFiles[i]);
    }
    formData.append("post-banner", bannerImage);
    formData.append(
      "post",
      JSON.stringify({
        title: postTitle,
        subtitle: postSubtitle,
        content,
      })
    );
    dispatch(createNewPost(formData));
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
