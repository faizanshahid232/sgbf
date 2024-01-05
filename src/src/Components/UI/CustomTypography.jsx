import { Typography } from '@mui/material';
import React from 'react';

function CustomTypography({ variant, children, fontWeight, fontSize = '1.125rem' }) {
  const variants = {
    mainHeading: {
      color: '#000',
      fontFamily: '"Gotham", sans-serif',
      fontWeight: 800,
      lineHeight: '1.063rem',
      fontSize: 25,
    },
    subHeading: {
      color: '#000',
      fontFamily: '"Gotham", sans-serif',
      fontWeight: 500,
      lineHeight: '1.063rem',
      fontSize: 15,
      olor: '#000000',
    },
    secondaryOutlined: {
      borderRadius: 28,

      color: '#000000',
      variant: 'outlined',
      borderColor: '#000000',
      fontFamily: '"Gotham", sans-serif',
      fontStyle: 'normal',
      fontWeight: 500,

      lineHeight: '1.063rem',
      '&:hover': {
        backgroundColor: '#000000',
        color: '#ffffff',
        borderColor: '#000000',
      },
    },
    noBorderOutlined: {
      borderRadius: 28,

      color: 'rgba(0, 0, 0, 0.6)',
      variant: 'outlined',
      border: 'none',
      fontFamily: '"Gotham", sans-serif',
      fontStyle: 'normal',
      fontWeight: 500,

      lineHeight: '1.063rem',
    },
    typographyOutlined: {
      color: '#49A7EB',
      variant: 'outlined',
      border: 'none',
      borderRadius: 0,
      textTransform: 'none',
      fontFamily: '"Gotham", sans-serif',
      fontStyle: 'normal',

      backgroundColor: 'transparent',
      minWidth: 0,
      padding: 0,
      '&:hover': {
        borderColor: '#49A7EB',
        border: 'none',
        borderRadius: 0,
        borderBottom: 1,
        backgroundColor: 'transparent',
      },
    },
    secondaryContained: {
      borderRadius: 28,

      color: '#000000',
      variant: 'outlined',
      borderColor: '#000000',
      fontFamily: '"Gotham", sans-serif',
      fontStyle: 'normal',
      fontWeight: 500,

      lineHeight: '1.063rem',
      '&:hover': {
        backgroundColor: '#000000',
        color: '#ffffff',
        borderColor: '#000000',
      },
    },
  };

  return (
    <Typography sx={variants[variant]} width variant={variants[variant].variant}>
      {children}
    </Typography>
  );
}

export default CustomTypography;
