import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Wraper = styled.div`
  background: url(${({ bannerSrc }) => bannerSrc}) no-repeat center center;
  background-size: cover;
  width: 100%;
  height: 100vh;
  @media (max-width: 768px) {
    max-height: 500px;
  }
  & a:hover {
    color: inherit;
  }
  .carousel-caption {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: absolute;
    text-align: right;
    width: 80%;
    margin-bottom: 30px;
    right: 15%;
    left: auto;
    direction: rtl;
  }
  @media (min-width: 993px) {
    .carousel-caption {
      width: 30%;
    }
  }
  .carousel-caption h2 {
    background-color: ${({ theme }) => theme.accent};
    clip-path: polygon(0 0, 100% 0, 100% 100%, 6% 100%);
    padding: 8px 8px 8px 30px;
    margin: 0;
    font-size: 1.3rem;
  }
  .carousel-caption div:first-of-type {
    display: flex;
    background-color: #020101;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 6% 100%);
    padding: 8px 8px 8px 30px;
    margin: 1rem 0;
    font-size: 1rem;
  }
  .carousel-caption div:last-child {
    display: inline-block;
    color: #020101;
    background-image: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      #ffffff 50%
    );
    padding: 8px 8px 8px 30px;
    font-size: 1rem;
  }
  .carousel-caption div:last-child a {
    display: flex;
    align-items: center;
    transition: all 300ms ease-in-out;
  }
  .carousel-caption div:last-child a:hover {
    color: ${({ theme }) => theme.accent};
  }
  .carousel-caption div:last-child a:hover::after {
    transform: translateX(-20%);
  }
  .carousel-caption div:last-child a:after {
    content: "";
    display: inline-block;
    width: 20px;
    height: 33px;
    clip-path: polygon(100% 0%, 75% 50%, 100% 100%, 25% 100%, 0% 50%, 25% 0%);
    background-color: ${({ theme }) => theme.accent};
    margin-right: 1rem;
    transition: all 300ms ease-in-out;
  }
`;

const CarouselItem = ({ post }) => {
  return (
    <Wraper className="m-carousel-item" bannerSrc={post?.bannerImage}>
      <div className="carousel-caption">
        <h2>
          <Link to={`/p/${post?._id}`}>{post?.title}</Link>
        </h2>
        <div className="d-none d-lg-block">
          <Link to={`/p/${post?._id}`}>{post?.subtitle}</Link>
        </div>
        <div className="d-none d-lg-block">
          <Link to={`/p/${post?._id}`}>مطالعه می‌کنم ...</Link>
        </div>
      </div>
    </Wraper>
  );
};

export default CarouselItem;
