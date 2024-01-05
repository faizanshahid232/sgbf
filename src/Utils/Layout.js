import { Stack } from "@mui/material";
import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "..//Footer";

const Layout = ({ children }) => {
  return (
    <Stack>
      <Navbar />
      {children}
      <Footer />
    </Stack>
  );
};

export default Layout;
