import React, { useEffect } from "react";

import styled from "styled-components";
import { darken, lighten } from "polished";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { toast } from "react-toastify";

import {
  createMarkup,
  convertContentToHTML,
} from "../utils/post-content-helper";
import { convetStringToUrlFormat } from "../utils/string-helper";
import { getPost, clearPost, handleLikeDislike } from "../redux/slices/post";
import Icon from "./shared/Icon";
import LoadingSpinner from "./shared/LoadingSpinner";
import { fromNow } from "../utils/date-helper";

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
    color: rgb(232, 230, 227);
  }
  .post-content {
    width: 90%;
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
  .author,
  .create-date,
  .views-count,
  .likes-count,
  .tags {
    color: inherit !important;
    background-color: inherit !important;
    font-family: inherit !important;
    line-height: 1.5;
  }
  .meta-data {
    display: flex;
    color: rgb(232, 230, 227);
    font-size: 0.8rem;
    transition: all 0.3s ease;
    z-index: 1;
  }
  .post-categories {
    display: flex;
    flex-wrap: wrap;
    margin-top: 1rem;
  }
  .post-category {
    color: ${({ theme }) => theme.text};
    text-decoration: none;
    margin: 0 2px;
    transition: all 0.3s ease;
  }
  .post-category:not(:last-child):after {
    content: "،";
  }
  .post-category:hover {
    color: ${({ theme }) => darken(0.06, theme.accent)};
  }
  .post-tags {
    display: flex;
    flex-wrap: wrap;
    margin-top: 1rem;
  }
  .post-tag {
    color: ${({ theme }) => theme.button};
    margin-left: 5px;
    text-decoration: none;
  }
  .post-tag::before {
    content: "#";
  }
  @media (min-width: 768px) {
    .post-content {
      width: 75%;
    }
  }
  .like-btn {
    cursor: pointer;
  }
  .liked-icon {
    color: #db3737;
  }
`;

const Post = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { post, user } = useSelector((state) => state);
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
    if (id !== post?.entity?._id) {
      dispatch(clearPost());
      dispatch(getPost(id));
    }
  }, []);

  return (
    <Wraper className="post rtl" bannerSrc={post?.entity?.bannerImage}>
      <LoadingSpinner show={post?.status === "loading"} />
      <div className="post-banner">
        <h1 className="post-title">{post?.entity?.title}</h1>
        <h3 className="post-subtitle mb-3">{post?.entity?.subtitle}</h3>
        <div className="meta-data">
          <div className="d-flex align-items-center">
            <Icon className="icon mr-1" icon="profile" size={15} />
            <span className="author mr-3">
              {post?.entity?.author?.fullName}
            </span>
          </div>
          <div className="d-flex align-items-center">
            <Icon className="icon mr-1" icon="calendar" size={15} />
            <span className="create-date mr-3">
              {fromNow(post?.entity?.createAt)}
            </span>
          </div>
          <div className="d-flex align-items-center">
            <Icon className="icon mr-1" icon="view" size={15} />
          </div>
          <span className="views-count">{post?.entity?.viewCount}</span>
        </div>
        <div className="d-flex align-items-center meta-data mt-3">
          <span className={post?.entity?.liked && "liked-icon"}>
            <Icon
              className="icon mr-1"
              icon={post?.entity?.liked ? "like-filled" : "like"}
              size={15}
            />
          </span>
          <span className="likes-count">{post?.entity?.likes?.length}</span>
        </div>
      </div>
      <div className="post-content">
        <div
          dangerouslySetInnerHTML={createMarkup(
            convertContentToHTML(post?.entity?.content)
          )}
        ></div>
        <div className="post-categories">
          <Icon className="icon mr-1" icon="folder" size={15} />
          {post?.entity?.categories?.map((c, index) => (
            <Link
              to={`/c/${convetStringToUrlFormat(c)}`}
              className="post-category"
              key={index}
            >
              {c}
            </Link>
          ))}
        </div>
        {post?.entity?.tags?.length > 0 && (
          <div className="post-tags">
            <span className="tags">برچسب ها: </span>
            {post?.entity?.tags?.map((t, index) => (
              <Link
                to={`/t/${convetStringToUrlFormat(t)}`}
                className="post-tag"
                key={index}
              >
                {convetStringToUrlFormat(t)}
              </Link>
            ))}
          </div>
        )}
        <div className="d-flex justify-content-end">
          <span
            className={`like-btn p-2 ${post?.entity?.liked && "liked-icon"}`}
            onClick={() => {
              _.isEmpty(user)
                ? toast.error("باید اول وارد حسابت بشی", {
                    position: "bottom-center",
                    closeOnClick: true,
                  })
                : dispatch(handleLikeDislike(post?.entity?._id));
            }}
          >
            <Icon
              icon={post?.entity?.liked ? "like-filled" : "like"}
              size={15}
            />
          </span>
        </div>
      </div>
    </Wraper>
  );
};

export default Post;
