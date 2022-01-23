import React, { useEffect } from "react";

import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { lighten } from "polished";
import _ from "lodash";

import { getPostsByCategory, getPostsByTag } from "../redux/slices/posts";
import { convetUrlToStringFormat } from "../utils/string-helper";
import Post from "./shared/Post";
import LoadingSpinner from "./shared/LoadingSpinner";
import EmptyState from "./shared/EmptyState";

const Wraper = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .posts-container {
    display: flex;
    flex-wrap: wrap;
    background-color: ${({ theme }) => lighten(0.1, theme.primary)};
    min-height: calc(100vh - 60px);
    padding: 1rem 4rem;
    margin-top: 60px;
  }
  .empty-state-text {
    position: absolute;
    bottom: 100px;
  }
`;

const Posts = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state);

  const { category, tag } = useParams();

  useEffect(() => {
    if (category) {
      dispatch(getPostsByCategory(convetUrlToStringFormat(category)));
    } else {
      dispatch(getPostsByTag(tag));
    }
  }, [category, tag]);

  return (
    <Wraper>
      <LoadingSpinner show={posts?.status === "loading"} />
      <div className="posts-container justify-content-center justify-content-sm-start col-12 col-sm-10 py-2 px-0 px-sm-5">
        {_.isEmpty(posts?.entity) ? (
          <EmptyState>
            <h6 className="text-center empty-state-text">
              {category
                ? "در این دسته بندی پستی وجود ندارد"
                : "پستی با این هشتگ وجود ندارد"}
            </h6>
          </EmptyState>
        ) : (
          posts?.entity?.map((post) => (
            <div className="col-11 col-sm-6 col-lg-4 mb-4" key={post?._id}>
              <Post post={post} />
            </div>
          ))
        )}
      </div>
    </Wraper>
  );
};

export default Posts;
