"use client";

import { blue, green } from "@mui/material/colors";

import { Inter } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const inter = Inter({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  components: {
    // Button
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
    // Card
    MuiCard: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        root: {
          border: "none",
          boxShadow:
            "rgb(67 160 71 / 0.1) 0px 10px 15px -3px, rgb(67 160 71 / 0.1) 0px 4px 6px -2px",
        },
      },
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: {
          fontSize: "1.3rem",
          fontWeight: "medium",
        },
        subheaderTypographyProps: {
          fontSize: "0.8rem",
        },
      },
    },
  },
  // Font
  typography: {
    fontFamily: inter.style.fontFamily,
  },
  // Colors
  palette: {
    primary: {
      main: green[600],
    },
    secondary: {
      main: blue[600],
    },
  },
  // Border radius
  shape: {
    borderRadius: 18,
  },
});

export default theme;
