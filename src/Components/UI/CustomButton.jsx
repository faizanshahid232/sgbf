import { Button } from "@mui/material";
import React from "react";

const CustomButton = ({
  onClick,
  variant,
  children,
  width,
  height = "35px",
  fontSize = "1.125rem",
  type = "",
}) => {
  const variants = {
    primaryOutlined: {
      height: height,
      width: width,
      color: "#fff",
      textTransform: "none",
      border: "none",
      backgroundColor: "#C82334",
      fontSize: 12,
      fontWeight: 10,
      "&:hover": {
        backgroundColor: "#C82334",
      },
    },
    secondaryOutlined: {
      borderRadius: 28,

      width: width,
      color: "#000000",
      variant: "outlined",
      borderColor: "#000000",
      fontFamily: '"Gotham", sans-serif',
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: fontSize,
      lineHeight: "1.063rem",
      "&:hover": {
        backgroundColor: "#000000",
        color: "#ffffff",
        borderColor: "#000000",
      },
    },
    primaryContained: {
      borderRadius: 28,
      color: "#000000",
      height: height,
      width: width,
      variant: "outlined",
      backgroundColor: "#FFB6C1",
      borderColor: "#FFB6C1",
      fontFamily: '"Gotham", sans-serif',
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: fontSize,
      lineHeight: "1.063rem",
      "&:hover": {
        color: "#FFB6C1",
        borderColor: "#FFB6C1",
      },
    },
  };

  return (
    <Button
      sx={variants[variant]}
      width
      type={type}
      variant={variants[variant].variant}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
