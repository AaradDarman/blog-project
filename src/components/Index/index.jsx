import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { lighten } from "polished";

import Post from "./Post";
import { getPosts } from "../../redux/slices/posts";
import Hero from "./Hero";
import LoadingSpinner from "../shared/LoadingSpinner";

const Wraper = styled.div`
  .posts {
    background-color: ${({ theme }) => lighten(0.1, theme.primary)};
    min-height: 100vh;
    padding: 1rem 4rem;
  }
`;

const Index = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  return (
    <Wraper className="row flex-column w-100 m-0 justify-content-center align-items-center">
      <LoadingSpinner show={posts?.status === "loading"} />
      <div className="col-12 p-0">
        <Hero />
      </div>
      <div className="posts col-12 col-sm-10 py-2 px-0 px-sm-5">
        <div className="row m-0 justify-content-center justify-content-sm-start">
          {posts?.entity?.map((post) => (
            <div className="col-10 col-sm-6 col-lg-4 mb-4" key={post?._id}>
              <Post post={post} />
            </div>
          ))}
        </div>
      </div>
    </Wraper>
  );
};

export default Index;
