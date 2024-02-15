"use client";

import Avatar from "@mui/material/Avatar";
import { IconButton } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname().replace("/", "");
  return (
    <nav className="w-full px-6 py-2 border-b flex justify-between items-center glass absolute top-0 right-0 rounded-2xl shadow shadow-primary/20 border">
      <h2 className="text-lg font-medium text-green-800 capitalize">
        {pathname}
      </h2>
      <div className="flex gap-3 items-center">
        <IconButton aria-label="delete" className="group">
          {/* <NotificationsNoneIcon /> */}
          <span className="icon-[solar--bell-line-duotone] group-hover:icon-[solar--bell-bold-duotone]" />
        </IconButton>
        <ProfileToggle />
      </div>
    </nav>
  );
}

const ProfileToggle = () => {
  return (
    <button className="flex items-center gap-3 p-2 hover:bg-primary/10 rounded-2xl">
      <Avatar alt="Remy Sharp" />
      <div>
        <h2 className="font-semibold text-black">Jonathan</h2>
        <p className="text-sm text-black text-left">Admin</p>
      </div>
    </button>
  );
};
