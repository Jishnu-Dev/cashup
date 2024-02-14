"use client";

import { green, red } from "@mui/material/colors";

import { Inter } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const inter = Inter({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  typography: {
    fontFamily: inter.style.fontFamily,
  },
  palette: {
    primary: {
      main: green[600],
    },
    secondary: {
      main: red[600]
    }
  },
  shape: {
    borderRadius: 18,
  },
});

export default theme;
