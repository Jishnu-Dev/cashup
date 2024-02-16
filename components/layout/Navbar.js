"use client";

import { IconButton } from "@mui/material";
import ProfileToggle from "@/components/layout/ProfileToggle";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname().replace("/", ""); // Removing first / slash
  // const breadCrumbs = pathname.replace(/\//g, " / "); // Adding space between slashes
  return (
    <nav className="w-full px-6 py-2 border-b flex justify-between items-center glass absolute top-0 right-0 z-50 rounded-2xl shadow shadow-primary/20 border">
      <h2 className="text-lg font-medium text-green-800 capitalize">
        {pathname || "Dashboard"}
      </h2>
      <div className="flex gap-3 items-center">
        <IconButton aria-label="delete" className="group">
          <span className="icon-[solar--bell-line-duotone] group-hover:icon-[solar--bell-bold-duotone]" />
        </IconButton>
        <ProfileToggle />
      </div>
    </nav>
  );
}
