import CircularProgress from "@mui/material/CircularProgress";

export default function FullPageLoader({
  label = "Loading, please wait...",
  onlySpinner = false,
}) {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center gap-4">
      <CircularProgress className="my-6" />
      {!onlySpinner && <p className="text-sm text-black/80">{label}</p>}
    </div>
  );
}
