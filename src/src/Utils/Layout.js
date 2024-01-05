/* eslint-disable import/order */
import { Stack, useMediaQuery } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import HeaderDrawerResponsive from "../Components/HeaderDrawer";

const Layout = () => {
  const matches = useMediaQuery("(min-width:1260px)");

  return (
    <Stack>
      {matches ? <Navbar /> : <HeaderDrawerResponsive />}
      <Outlet />
      <Footer />
    </Stack>
  );
};

export default Layout;
