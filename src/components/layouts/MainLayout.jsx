import React from "react";

import { Outlet } from "react-router-dom";

import Header from "../Header";

const MainLayout = () => {
  return (
    <>
      {/* Header */}
      <Header />
      <Outlet />
    </>
  );
};

export default MainLayout;
