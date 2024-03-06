"use client";

import { blue, green } from "@mui/material/colors";

import { createTheme } from "@mui/material/styles";
import { dir } from "@/i18n/translate";
import { inter } from "@/lib/font";

const theme = createTheme({
  components: {
    // Button
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
    // Card
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: {
          fontSize: "1.3rem",
          fontWeight: "medium",
          dir: dir,
        },
        subheaderTypographyProps: {
          fontSize: "0.8rem",
          dir: dir,
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
