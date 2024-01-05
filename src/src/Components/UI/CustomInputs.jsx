import { Box, InputLabel, TextField } from "@mui/material";
import React from "react";

const customTextFiled = {
  "&:-webkit-autofill": {
    "-webkit-box-shadow": "0 0 0 100px #ffff inset",
    "-webkit-text-fill-color": "#000",
  },
  "& label.Mui-focused": {
    color: "black",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "rgba(217, 217, 217, 0.35)",
    borderColor: "rgba(217, 217, 217, 0.35)",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      backgroundColor: "rgba(217, 217, 217, 0.35)",
      borderRadius: "5px",
      borderColor: "rgba(217, 217, 217, 0.35)",
    },
    "&:hover fieldset": {
      borderColor: "#43b3db",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#43b3db",
      backgroundColor: "transparent",
    },
  },
};
const CustomInputs = ({
  size = "small",
  placeholder,
  inputLabel,
  value,
  onChange,
  type = "text",
  name,
  error,
  width,
  height,
  ...other
}) => {
  return (
    <Box>
      <InputLabel
        sx={{
          fontSize: "1.25rem",
          fontWeight: 500,
          color: "black",
          fontFamily: "'Gotham', sanserif",
        }}
        htmlFor="component-simple"
      >
        {inputLabel}
      </InputLabel>
      <TextField
        sx={{ ...customTextFiled, width }}
        variant="outlined"
        name={name}
        type={type}
        width={width}
        height={height}
        placeholder={placeholder}
        size={size}
        value={value}
        onChange={onChange}
        {...other}
        {...(error && { error: true, helperText: error })}
      />
    </Box>
  );
};

export default CustomInputs;
