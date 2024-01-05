// ----------------------------------------------------------------------

export default function Typography(theme) {
  return {
    MuiTypography: {
      styleOverrides: {
        paragraph: {
          marginBottom: theme.spacing(2),
        },
        gutterBottom: {
          marginBottom: theme.spacing(1),
        },
        semibold: {
          // Add your custom styles for the variant
          fontSize: '16px',
          fontWeight: 700,
        },
        lightInfo: {
          fontSize: '12px',
          fontWeight: 400,
        },
      },
    },
  };
}
