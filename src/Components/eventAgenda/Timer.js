/* eslint-disable radix */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Box, TextField } from '@mui/material';
import React from 'react';


const Timer = ({ inputTime, setInputTime }) => {
  const handleInput = (event) => {
    const { name, value } = event.target;
    setInputTime({ ...inputTime, [name]: value ? parseInt(value) : 0,});
  };

  return (
    <Box p={2} gap={1} display="flex">
      <label>Hours:</label>
      <TextField
        type="number"
        name="hours"
        value={inputTime.hours}
        onChange={handleInput}
        id="standard-basic"
        variant="standard"
      />

      <label>Minutes:</label>
      <TextField
        type="number"
        name="minutes"
        value={inputTime.minutes}
        onChange={handleInput}
        id="standard-basic"
        variant="standard"
      />
    </Box>
  );
};

export default Timer;
