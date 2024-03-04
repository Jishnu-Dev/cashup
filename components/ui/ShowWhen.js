import { Fragment } from "react";
import { Grow } from "@mui/material";

export default function ShowWhen({ when = false, children }) {
  // return when ? children : null;
  return when ? (
    <Grow in={when}>
      <span>{children}</span>
    </Grow>
  ) : null;
}
