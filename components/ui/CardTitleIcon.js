import Avatar from "@mui/material/Avatar";
import { green } from "@mui/material/colors";

export default function CardTitleIcon({
  icon = "icon-[solar--info-circle-line-duotone]",
}) {
  return (
    <Avatar sx={{ backgroundColor: green[50], width: 45, height: 45 }}>
      <span className={`${icon} text-primary text-3xl`} />
    </Avatar>
  );
}
