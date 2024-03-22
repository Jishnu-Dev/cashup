import { Fragment } from "react";
import { Grow } from "@mui/material";

export default function ShowWhen({ when = false, children }) {
  // return when ? children : null;
  return when ? (
    <Grow in={true}>
      <span>{children}</span>
    </Grow>
  ) : null;
}
