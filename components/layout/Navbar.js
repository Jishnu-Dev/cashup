'use client'

import Avatar from "@mui/material/Avatar";
import { IconButton } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname().replace("/", "");
    return (
      <nav className="w-full px-10 py-4 border-b flex justify-between items-center glass absolute top-0 right-0">
        <h2 className="text-lg font-medium text-green-800 capitalize">
          {pathname}
        </h2>
        <div className="flex gap-3 items-center">
          <IconButton aria-label="delete">
            <NotificationsNoneIcon />
          </IconButton>
          <Avatar alt="Remy Sharp" />
        </div>
      </nav>
    );
  };
  