import React from "react";

import styled from "styled-components";
import { Link } from "react-router-dom";
import { darken } from "polished";

import { shorten } from "../../utils/string-helper";

const Wraper = styled.article`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.primary};
  text-align: right;
  direction: rtl;
  padding: 0.5rem;
  border-radius: 1.2rem;
  box-shadow: 5px 5px 5px 2px ${({ theme }) => darken(0.01, theme.primary)};
  transition: all 0.3s ease;
  line-height: 1.5;
  height: 370px;
  :hover {
    box-shadow: 5px 5px 5px 6px ${({ theme }) => darken(0.01, theme.primary)};
  }
  .post-info {
    flex: 1;
    padding: 0.2rem 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .post-banner {
    height: 200px;
    background-image: url(${({ bannerSrc }) => bannerSrc});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 1rem;
  }
  .post-title {
    font-size: 1.4rem;
  }
  .post-title a {
    text-decoration: none;
    color: inherit;
  }
  .post-subtitle {
    color: ${({ theme }) => theme.accent};
  }
  .meta-data {
    display: flex;
    color: ${({ theme }) => darken(0.3, theme.text)};
    font-size: 0.72rem;
  }
  .author-profile {
    border-radius: 40%;
    margin-left: 5px;
  }
`;
const Post = ({ post }) => {
  return (
    <Wraper bannerSrc={post.bannerImage}>
      <Link className="post-banner" to={`/p/${post?._id}`} />
      <div className="post-info">
        <h3 className="post-title">
          <Link to={`/p/${post?._id}`}>{shorten(post?.title, 87)}</Link>
        </h3>
        <p className="post-subtitle">{shorten(post?.subtitle, 80)}</p>
        <div className="meta-data">
          <img
            src="https://via.placeholder.com/30x30"
            alt="profile"
            className="author-profile"
          />
          <div className="d-flex flex-column">
            <span className="author-name">{post?.author?.fullName}</span>
            <span className="create-date">1400/10/13</span>
          </div>
        </div>
      </div>
    </Wraper>
  );
};

export default Post;
