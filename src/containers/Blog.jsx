import React from "react";

import { Route, Routes } from "react-router-dom";
import _ from "lodash";


import MainLayout from "../components/layouts/MainLayout";
import Index from "../components/Index";


const Blog = () => {

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Index />} />
      </Route>
    </Routes>
  );
};

export default Blog;
