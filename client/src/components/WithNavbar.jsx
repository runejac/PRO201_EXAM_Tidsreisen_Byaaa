// WithNav.js (Stand-alone Functional Component)
import React from "react";
import { Navbar } from "./Navbar.jsx";
import { Outlet } from "react-router-dom";

export default () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
