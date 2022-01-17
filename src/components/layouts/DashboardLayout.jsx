import React,{useEffect} from "react";

import styled from "styled-components";
import { Link, useLocation, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";

import Icon from "../shared/Icon";
import { clearPost } from "../../redux/slices/post";

const Wrper = styled.div`
  .header {
    display: flex;
    width: 200px;
    align-items: center;
    justify-content: space-between;
    flex-wrap: nowrap;
    padding: 0.5rem 1rem 0 1rem;
    font-size: 1rem;
  }
  .header i {
    padding: 0.5rem;
  }
  .navigation {
    background-color: ${({ theme }) => theme.primary};
    height: 100vh;
    width: 200px;
    transition: width 0.5s ease;
    overflow-x: hidden;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    display: flex;
    flex-direction: column;
  }
  .admin-menu {
    list-style: none;
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-bottom: 0;
    padding: 0;
  }
  .menu-item {
    display: flex;
    align-items: center;
    width: 200px;
    color: #5c7080;
    margin: 0.6rem 0;
    transition: color 0.6s ease, background-color 0.3s ease, border 0.6s ease;
  }
  .menu-item:hover:not(.active) a .icon {
    color: ${({ theme }) => theme.accent};
    transition: color 0.3s ease;
  }
  .menu-item:hover:not(.active) a span::after {
    background-color: ${({ theme }) => theme.accent};
    width: 100%;
  }
  .menu-item.active {
    color: ${({ theme }) => theme.text};
    border-right: 3px solid ${({ theme }) => theme.accent};
  }
  .menu-item a {
    text-decoration: none;
    color: inherit;
    width: 100%;
    flex: 1;
    padding: 0.5rem 1rem;
  }
  .menu-item a span {
    position: relative;
  }
  .menu-item a span::after {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 1px;
    width: 0;
    background-color: transparent;
    transition: all 0.3s ease;
  }
  .menu-item .icon {
    margin-left: 1rem;
  }
  .main-section {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 200px;
  }
  .back-icon {
    color: ${({ theme }) => theme.text};
  }
  .logo {
    transition: all 50ms ease-in-out;
    display: block;
    background: url("/logo.svg") no-repeat center center;
    background-size: contain;
    width: 50px;
    height: 39px;
    line-height: 0;
    font-size: 0;
    color: transparent;
  }
  @media (max-width: 500px) {
    .navigation {
      width: 56px;
    }
    .navigation:hover {
      width: 200px;
    }
    .main-section {
      margin-right: 56px;
    }
    .header {
      padding-right: 0.3rem;
    }
  }
`;

const DashboardLayout = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearPost());
  }, []);
  
  return (
    <Wrper className="dashboard-layout rtl">
      <nav className="navigation p-0">
        <div className="header">
          <Link to="/" className="logo p-0">
            Logo
          </Link>
          <Link to="/" replace={true}>
            <Icon className="back-icon" icon="arrow-left" size={24} />
          </Link>
        </div>
        <ul className="admin-menu">
          <li
            className={`menu-item ${
              location.pathname === "/dashboard" ? "active" : ""
            }`}
          >
            <Link to="/dashboard">
              <Icon
                className="icon"
                icon={`${
                  location.pathname === "/dashboard"
                    ? "profile-filled"
                    : "profile"
                }`}
                size={24}
              />
              <span>پروفایل</span>
            </Link>
          </li>
          <li
            className={`menu-item ${
              location.pathname.includes("/dashboard/create-post") ||
              location.pathname.includes("/dashboard/edit-post")
                ? "active"
                : ""
            }`}
          >
            <Link to="/dashboard/create-post">
              <Icon
                className="icon"
                icon={`${
                  location.pathname.includes("/dashboard/create-post") ||
                  location.pathname.includes("/dashboard/edit-post")
                    ? "create-post-filled"
                    : "create-post"
                }`}
                size={24}
              />
              <span>میز کار</span>
            </Link>
          </li>
          <li
            className={`menu-item ${
              location.pathname === "/dashboard/posts" ? "active" : ""
            }`}
          >
            <Link to="/dashboard/posts">
              <Icon
                className="icon"
                icon={`${
                  location.pathname === "/dashboard/posts"
                    ? "posts-filled"
                    : "posts"
                }`}
                size={24}
              />
              <span>پست ها</span>
            </Link>
          </li>
          <li className="menu-item mt-auto">
            <Link to="/logout">
              <Icon className="icon" icon="logout" size={24} />
              <span>خروج</span>
            </Link>
          </li>
        </ul>
      </nav>
      <section className="main-section">
        <Outlet />
      </section>
    </Wrper>
  );
};

export default DashboardLayout;
