import React from "react";

import { Link } from "react-router-dom";
import styled from "styled-components";
import { darken } from "polished";

const Wraper = styled.nav`
  transition: all 200ms ease-in-out;
  line-height: 2;
  * {
    transition: all 200ms ease-in-out;
  }
  & > ul {
    display: flex;
    justify-content: start;
    align-items: center;
    list-style: none;
    width: 100%;
    margin: 0;
    transition: all 200ms ease-in-out;
  }
  & a {
    display: block;
    padding: 0.5rem 0.75rem;
    transition: all 200ms linear;
    color: ${({ float, theme }) => (float ? theme.accent : "inherit")};
    font-weight: bold;
  }
  & a:hover {
    color: ${({ float, theme }) =>
      float ? darken(0.1, theme.accent) : "inherit"};
    text-decoration: none;
  }
`;

const Nav = ({ float, className }) => {
  return (
    <Wraper className={`${className} navigation-menu`} float={float}>
      <ul>
        <li>
          <Link to="#">اخبار و مقالات</Link>
        </li>
        <li>
          <Link to="#">علمی</Link>
        </li>
        <li>
          <Link to="#">فیلم و سریال</Link>
        </li>
        <li>
          <Link to="#">بررسی بازی ها</Link>
        </li>
        <li>
          <Link to="#">فناوری</Link>
        </li>
        <li>
          <Link to="#">سلامت</Link>
        </li>
      </ul>
    </Wraper>
  );
};

export default Nav;
