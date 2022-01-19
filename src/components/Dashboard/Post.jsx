import React from "react";

import styled from "styled-components";
import { Link } from "react-router-dom";
import { darken } from "polished";

import { convetStringToUrlFormat, shorten } from "../../utils/string-helper";
import Icon from "../shared/Icon";
import { useCreatePost } from "../../context/post-context";
import { fromNow } from "../../utils/date-helper";

const Wraper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: right;
  direction: rtl;
  transition: all 0.3s ease;
  line-height: 1.5;
  margin-bottom: 5px;
  padding: 5px;
  border-bottom: 0.5px solid ${({ theme }) => theme.secondary};

  .post-banner {
    height: 60px;
    width: 60px;
    background-image: url(${({ bannerSrc }) => bannerSrc});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 1rem;
    transition: all 0.3s ease;
    align-self: baseline;
  }
  .post-info {
    flex: 1;
    height: 100%;
    padding: 0 0.3rem;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
  .post-title {
    flex: 1;
    font-size: 0.9rem;
    transition: all 0.3s ease;
  }
  .post-title a {
    text-decoration: none;
    color: inherit;
  }
  .post-subtitle {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.accent};
  }
  .meta-data {
    display: flex;
    color: ${({ theme }) => darken(0.3, theme.text)};
    font-size: 0.72rem;
    transition: all 0.3s ease;
  }
  .icon {
    color: ${({ theme }) => darken(0.3, theme.text)};
  }
  .delete-icon {
    color: #bd1e1e;
  }
  .views-count {
    width: 32px;
  }
  .post-categories {
    display: flex;
    flex-wrap: wrap;
    flex: 1;
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
  @media (max-width: 950px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const Post = ({ post }) => {
  const { handleDeletePost } = useCreatePost();

  return (
    <Wraper bannerSrc={post?.bannerImage} className="post">
      <div className="d-flex align-items-center">
        <Link className="post-banner" to={`/p/${post?._id}`} />
        <div className="post-info">
          <h3 className="post-title">
            <Link to={`/p/${post?._id}`}>{shorten(post?.title, 87)}</Link>
          </h3>
          <div className="meta-data">
            <div className="d-flex align-items-center">
              <Icon className="icon mr-1" icon="calendar" size={15} />
              <span className="create-date mr-2">
                {fromNow(post?.createAt)}
              </span>
            </div>
            <div className="d-flex align-items-center">
              <Icon className="icon mr-1" icon="view" size={15} />
            </div>
            <span className="views-count">{post?.viewCount}</span>
          </div>
        </div>
      </div>
      <div className="d-flex align-items-center mt-1 mt-lg-0">
        <div className="post-categories">
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
        <div className="post-actions d-flex justify-content-end">
          <Link
            className="d-flex align-items-center p-1"
            to={`/dashboard/edit-post/${post?._id}`}
          >
            <Icon className="icon mr-1" icon="edit" size={22} />
          </Link>
          <Link
            className="p-1"
            to={`/dashboard/delete-post/${post?._id}`}
            onClick={(e) => {
              e.preventDefault();
              handleDeletePost(post._id);
            }}
          >
            <Icon
              className="delete-icon mr-1"
              icon="delete"
              size={24}
              onClick={() => handleDeletePost(post._id)}
            />
          </Link>
        </div>
      </div>
    </Wraper>
  );
};

export default Post;
