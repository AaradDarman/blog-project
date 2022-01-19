import React from "react";

import styled from "styled-components";
import { Link } from "react-router-dom";
import { darken } from "polished";

import { convetStringToUrlFormat, shorten } from "../../utils/string-helper";
import { fromNow } from "../../utils/date-helper";
import Icon from "../shared/Icon";

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
    padding: 0.4rem;
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
    align-items: center;
    color: ${({ theme }) => darken(0.3, theme.text)};
    font-size: 0.72rem;
  }
  .author-profile {
    width: 30px;
    height: 30px;
    border-radius: 40%;
    margin-left: 5px;
  }
  .post-categories {
    display: flex;
    flex-wrap: wrap;
  }
  .post-category {
    background-color: ${({ theme }) => theme.button};
    border: 1px solid ${({ theme }) => darken(0.2, theme.button)};
    color: ${({ theme }) => theme.text};
    border-radius: 0.3rem;
    padding: 3px 5px;
    margin: 0 2px;
    text-decoration: none;
  }
`;
const Post = ({ post }) => {
  return (
    <Wraper bannerSrc={post?.bannerImage}>
      <Link className="post-banner" to={`/p/${post?._id}`} />
      <div className="post-info">
        <h3 className="post-title">
          <Link to={`/p/${post?._id}`}>{shorten(post?.title, 87)}</Link>
        </h3>
        <p className="post-subtitle">{shorten(post?.subtitle, 80)}</p>
        <div className="meta-data">
          {post?.author?.profileImage ? (
            <img
              src={post?.author?.profileImage}
              alt="profile"
              className="author-profile"
            />
          ) : (
            <img
              src={
                post?.author?.gender === "مرد"
                  ? "/images/male-avatar.png"
                  : "/images/female-avatar.png"
              }
              alt="profile"
              className="author-profile"
            />
          )}
          <div className="d-flex flex-column">
            <span className="author-name">{post?.author?.fullName}</span>
            <span className="create-date">{fromNow(post?.createAt)}</span>
          </div>
          <div className="post-categories mr-auto">
            {post?.categories?.map((c, index) => (
              <Link
                to={`/c/${convetStringToUrlFormat(c)}`}
                className="post-category"
                key={index}
              >
                {c}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Wraper>
  );
};

export default Post;
