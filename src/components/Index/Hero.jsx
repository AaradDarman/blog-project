import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import styled from "styled-components";
import { rgba } from "polished";
import { useSelector } from "react-redux";
import CarouselItem from "./CarouselItem";

const Wraper = styled.div`
  direction: ltr;
  .owl-carousel .owl-nav {
    display: flex;
    justify-content: space-between;
    position: absolute;
    margin: 0;
    top: 50%;
    left: 20px;
    right: 20px;
    pointer-events: none;
  }
  .owl-carousel .owl-nav button.owl-prev,
  .owl-carousel .owl-nav button.owl-next {
    pointer-events: all;
    background-color: rgba(0, 0, 0, 0.2);
    color: ${rgba("#f8f5ef", 0.6)};
    border-radius: 2rem;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    width: 50px;
    transition: all 300ms ease-in-out;
    box-shadow: 0 0 0 1px rgb(16 22 26 / 15%), 0 0 0 rgb(16 22 26 / 0%),
      0 0 0 rgb(16 22 26 / 0%);
  }

  button.owl-next span,
  button.owl-prev span {
    font-size: 2rem;
  }
  .owl-theme .owl-nav [class*="owl-"]:hover {
    background: ${({ theme }) => rgba(theme.accent, 0.8)};
    color: #f8f5ef;
  }
  .owl-item.active > div::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    height: 200px;
    width: 100%;
    transition: 0.3s;
    background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      #000000 70%
    );
    opacity: 0.85;
    z-index: 9;
    pointer-events: none;
  }
  .owl-dots {
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
  }
  .owl-dots .owl-dot span {
    width: 30px;
    height: 3px;
    border-radius: 0;
    transition: all 300ms ease-in-out;
  }
  .owl-dots .owl-dot span {
    width: 30px;
    transition: all 300ms ease-in-out;
  }
  .owl-dots .owl-dot.active span {
    background-color: ${({ theme }) => theme.accent};
  }
`;

const Hero = () => {
  const { posts } = useSelector((state) => state);
  return (
    <Wraper className="home-carousel">
      {posts.length && (
        <OwlCarousel
          className="owl-theme"
          loop
          nav
          dots
          autoplay
          autoplayHoverPause
          responsiveClass={true}
          autoplayTimeout={5000}
          autoplaySpeed={2000}
          navSpeed={2000}
          dotsSpeed={2000}
          navText={["<span>〈︁</span>", "<span>〉︁</span>"]}
          responsive={{
            0: {
              items: 1,
            },
            490: {
              items: 1,
            },
            576: {
              items: 1,
            },
            768: {
              items: 1,
            },
            1200: {
              items: 1,
            },
          }}
        >
          {posts?.map((post) => (
            <CarouselItem post={post} key={post?._id} />
          ))}
        </OwlCarousel>
      )}
    </Wraper>
  );
};

export default Hero;
