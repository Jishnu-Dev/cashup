"use client";

import { Fragment, useState } from "react";

import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ProfileToggle from "@/components/layout/ProfileToggle";
import Typography from "@mui/material/Typography";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname().replace("/", ""); // Removing first / slash
  // const breadCrumbs = pathname.replace(/\//g, " / "); // Adding space between slashes

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = () => setIsDrawerOpen((open) => !open);

  return (
    <Card className="w-full px-6 py-2 border-b flex justify-between items-center glass absolute top-0 right-0 z-50 rounded-2xl shadow shadow-primary/20 border">
      <h2 className="text-lg font-medium text-green-800 capitalize">
        {pathname || "Dashboard"}
      </h2>
      <div className="flex gap-3 items-center">
        <Badge badgeContent={4} color="primary" overlap="circular">
          <IconButton aria-label="notifications" onClick={toggleDrawer}>
            <span className="icon-[solar--bell-line-duotone] group-hover:icon-[solar--bell-bold-duotone]" />
          </IconButton>
        </Badge>
        <ProfileToggle />
      </div>
      <NotificationsDrawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} />
    </Card>
  );

  // return (
  //   <nav className="w-full px-6 py-2 border-b flex justify-between items-center glass absolute top-0 right-0 z-50 rounded-2xl shadow shadow-primary/20 border">
  //     <h2 className="text-lg font-medium text-green-800 capitalize">
  //       {pathname || "Dashboard"}
  //     </h2>
  //     <div className="flex gap-3 items-center">
  //       <IconButton aria-label="delete" className="group">
  //         <span className="icon-[solar--bell-line-duotone] group-hover:icon-[solar--bell-bold-duotone]" />
  //       </IconButton>
  //       <ProfileToggle />
  //     </div>
  //   </nav>
  // );
}

const NotificationsDrawer = ({ isOpen, setIsOpen }) => {
  return (
    <Drawer anchor="right" open={isOpen} onClose={() => setIsOpen(false)}>
      <Box sx={{ width: 300 }}>
        <Box px={4} py={2}>
          <Typography variant="h5">Notifications</Typography>
        </Box>
        <Divider />
        <ul>
          {[...Array(6)].map((_, i) => (
            <NotificationContent key={i} />
          ))}
        </ul>
      </Box>
    </Drawer>
  );
};

const NotificationContent = ({ title, content }) => {
  return (
    <li className="hover:bg-primary/5">
      <button className="text-left">
        <Box px={4} py={2}>
          <div className="flex flex-col gap-2">
            <h4>You got a new cashback</h4>
            <p className="text-sm text-black/50">
              Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.
            </p>
          </div>
        </Box>
        <Divider />
      </button>
    </li>
  );
};
