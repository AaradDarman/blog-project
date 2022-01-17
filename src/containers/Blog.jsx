import React, { useState, useEffect } from "react";

import { Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import MainLayout from "../components/layouts/MainLayout";
import Index from "../components/Index";
import AuthContext from "../context/AuthContext";
import Singup from "../components/Singup";
import Login from "../components/Login";
import Logout from "../components/Logout";
import { setHeader } from "../adapters/xhr";
import { decodeToken } from "../utils/token-helper";
import { setUser, logout } from "../redux/slices/user";
import DashboardLayout from "../components/layouts/DashboardLayout";
import Dashboard from "../components/Dashboard";
import CreatePost from "../components/Dashboard/CreatePost";
import DashboardPosts from "../components/Dashboard/Posts";
import PostContext from "../context/PostContext";
import Post from "../components/Post";
import Posts from "../components/Posts";
import LoadingSpinner from "../components/shared/LoadingSpinner";

const Blog = () => {
  const { user } = useSelector((state) => state);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        setHeader(token);
        const decodedToken = decodeToken(token);
        if (decodedToken) {
          dispatch(setUser(decodedToken.user));
        } else {
          localStorage.removeItem("token");
          dispatch(logout());
          setIsLoading(false);
        }
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner show={true} />
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <AuthContext>
                <MainLayout />
              </AuthContext>
            }
          >
            <Route index element={<Index />} />
            <Route
              path="/signup"
              element={
                _.isEmpty(user) ? <Singup /> : <Navigate to="/" replace />
              }
            />
            <Route
              path="/login"
              element={
                _.isEmpty(user) ? <Login /> : <Navigate to="/" replace />
              }
            />
            <Route
              path="/logout"
              element={
                !_.isEmpty(user) ? <Logout /> : <Navigate to="/" replace />
              }
            />
            <Route path="/p/:id" element={<Post />} />
            <Route path="/c/:category" element={<Posts />} />
            <Route path="/t/:tag" element={<Posts />} />
          </Route>
          <Route
            path="/dashboard"
            element={
              _.isEmpty(user) || !user.isAdmin ? (
                <Navigate to="/" replace />
              ) : (
                <AuthContext>
                  <DashboardLayout />
                </AuthContext>
              )
            }
          >
            <Route index element={<Dashboard />} />
            <Route
              path="create-post"
              element={
                <PostContext>
                  <CreatePost />
                </PostContext>
              }
            />
            <Route
              path="edit-post/:id"
              element={
                <PostContext>
                  <CreatePost />
                </PostContext>
              }
            />
            <Route
              path="posts"
              element={
                <PostContext>
                  <DashboardPosts />
                </PostContext>
              }
            />
          </Route>
        </Routes>
      )}
    </>
  );
};

export default Blog;
