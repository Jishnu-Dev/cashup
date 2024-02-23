"use client";

import { usePathname, useRouter } from "next/navigation";

import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ProfileToggle from "@/components/layout/ProfileToggle";
import Typography from "@mui/material/Typography";
import { useState } from "react";

export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = () => setIsDrawerOpen((open) => !open);

  return (
    <Card>
      <div className="w-full flex justify-between items-center glass rounded-2xl px-4 py-2 shadow absolute top-0 right-0 z-50">
        <RouteActions />
        <div className="ml-auto flex gap-3 items-center">
          <AccountStatusBadge />
          <Badge badgeContent={4} color="primary" overlap="circular">
            <IconButton aria-label="notifications" onClick={toggleDrawer}>
              <span className="icon-[solar--bell-line-duotone] group-hover:icon-[solar--bell-bold-duotone]" />
            </IconButton>
          </Badge>
          <ProfileToggle />
        </div>
        <NotificationsDrawer
          isOpen={isDrawerOpen}
          setIsOpen={setIsDrawerOpen}
        />
      </div>
    </Card>
  );
}

const AccountStatusBadge = () => (
  <Chip
    color="primary"
    variant="outlined"
    label={
      <div className="flex items-center gap-2">
        <p>Active</p>
        <div className="h-2 w-2 rounded-full bg-primary" />
      </div>
    }
  />
);

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

const RouteActions = () => {
  const router = useRouter();
  const pathname = usePathname().replace("/", ""); // Removing first / slash
  // const breadCrumbs = pathname.replace(/\//g, " / "); // Adding space between slashes

  if (!pathname) return null;
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => router.back()}
        className="h-10 w-10 p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary flex items-center justify-center"
      >
        <span className="icon-[solar--arrow-left-line-duotone] text-4xl" />
      </button>
      <h5 className="text-xl text-primary font-medium capitalize">
        {pathname}
      </h5>
    </div>
  );
};
