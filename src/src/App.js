import { ThemeProvider, createTheme } from "@mui/material";
import Routers from "./Utils/Routers";
import Layout from "./Utils/Layout";
import { colors } from "./theme/colors";

const theme = createTheme({
  palette: {
    gray: {
      50: colors.gray[50],
      100: colors.gray[100],
      200: colors.gray[200],
      300: colors.gray[300],
      400: colors.gray[400],
      500: colors.gray[500],
      600: colors.gray[600],
      700: colors.gray[700],
      800: colors.gray[800],
      900: colors.gray[900],
    },
    primary: {
      50: colors.primary[50],
      100: colors.primary[100],
      200: colors.primary[200],
      300: colors.primary[300],
      400: colors.primary[400],
      500: colors.primary[500],
      600: colors.primary[600],
      700: colors.primary[700],
      800: colors.primary[800],
      900: colors.primary[900],
    },
    bgColors: {
      primary: "#313131",
      secondary: "#1580BE",
      white: "#ffffff",
    },
    borderColors: {
      gray: "#D3D3D3",
    },
  },
  typography: {
    display: {
      fontSize: "64px",
      lineHeight: "120%",
      "@media (min-width:600px)": {
        fontSize: "44px",
      },
    },
    h1: {
      fontSize: "54px",
      lineHeight: "120%",
      "@media (min-width:600px)": {
        fontSize: "34px",
      },
    },
    h2: {
      fontSize: "48px",
      lineHeight: "130%",
      "@media (min-width:600px)": {
        fontSize: "28px",
      },
    },
    h3: {
      fontSize: "32px",
      lineHeight: "120%",
      "@media (min-width:600px)": {
        fontSize: "12px",
      },
    },
    h4: {
      fontSize: "24px",
      lineHeight: "120%",
      "@media (min-width:600px)": {
        fontSize: "12px",
      },
    },
    basic: {
      fontSize: "16px",
      lineHeight: "120%",
    },
  },
  // spacing:{
  //   vertical : {
  //     8: "8px",
  //     12: "12px",
  //     16: "16px",
  //     20: "20px",
  //     24: "24px",
  //     32: "32px",
  //     40: "40px"
  //   },
  //   horizontally : {
  //     4: "4px",
  //     8: "8px",
  //     12: "12px"
  //   }
  // }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Routers />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
