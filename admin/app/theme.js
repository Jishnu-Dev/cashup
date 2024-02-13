"use client";

import { Inter } from "next/font/google";
import { blue } from "@mui/material/colors";
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
      main: blue[500],
    },
    // secondary: {
    //   main: "#38b6ff",
    // },
  },
  shape: {
    borderRadius: 10,
  },
});

export default theme;
