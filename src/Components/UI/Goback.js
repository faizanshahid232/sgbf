import { Button } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import React from 'react';

const Goback = ({ goBack }) => {
  return (
    <Button sx={{  width: 'auto' }} onClick={goBack}>
      <KeyboardBackspaceIcon /> &nbsp; Go Back
    </Button>
  );
};

export default Goback;
