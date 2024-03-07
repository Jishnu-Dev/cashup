import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function LoadingBackdrop({
  isOpen = false,
  message = "Loading, please wait...",
}) {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={isOpen}
      className="flex flex-col gap-3"
      // onClick={handleClose}
    >
      <CircularProgress color="inherit" />
      <p>{message}</p>
    </Backdrop>
  );
}
