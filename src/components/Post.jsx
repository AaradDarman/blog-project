import React, { useEffect } from "react";
import styled from "styled-components";
import {
  createMarkup,
  convertContentToHTML,
} from "../utils/post-content-helper";
import { lighten } from "polished";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPost, clearPost } from "../redux/slices/post";

const Wraper = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => lighten(0.1, theme.primary)};
  .post-banner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    height: calc(100vh - 25px);
    background-image: url(${({ bannerSrc }) => bannerSrc});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .post-banner::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    height: 70%;
    width: 100%;
    transition: 0.3s;
    background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      #000000 70%
    );
    opacity: 0.85;
    z-index: 1;
    pointer-events: none;
  }
  .post-title {
    color: rgb(232, 230, 227);
    text-shadow: rgb(0 0 0) 2px 2px 3px;
    z-index: 1;
  }
  .post-subtitle {
    z-index: 1;
    font-size: 1rem;
  }
  .post-content {
    position: relative;
    top: -100px;
    z-index: 1;
    background: ${({ theme }) => theme.primary};
    padding: 1rem;
    border-radius: 0.5rem;
  }
  p,
  img {
    margin-bottom: 20px;
  }
  img {
    width: 100% !important;
    border-radius: 0.3rem;
  }
  span {
    color: inherit !important;
    background-color: inherit !important;
    font-family: inherit !important;
    line-height: 1.5;
  }
`;

const Post = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      // behavior: "smooth",
    });
    if (id !== post?.entity?._id) {
      dispatch(clearPost());
      dispatch(getPost(id));
    }
  }, []);

  return (
    <Wraper className="post rtl" bannerSrc={post?.entity?.bannerImage}>
      <div className="post-banner">
        <h1 className="post-title">{post?.entity?.title}</h1>
        <h3 className="post-subtitle">{post?.entity?.subtitle}</h3>
      </div>
      <div
        className="post-content w-75"
        dangerouslySetInnerHTML={createMarkup(
          convertContentToHTML(post?.entity?.content)
        )}
      ></div>
    </Wraper>
  );
};

export default Post;
