"use client";

import { Fragment, useState } from "react";

import { Button } from "@mui/material";
import Link from "next/link";
import Popover from "@mui/material/Popover";
import UserAvatar from "@/components/layout/UserAvatar";

const name = "Acme Doddas";

export default function ProfileToggle() {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Fragment>
      <button
        aria-describedby={id}
        onClick={handleClick}
        className="flex items-center gap-3 p-2 hover:bg-primary/10 rounded-2xl"
      >
        <UserAvatar name={name} />
        <div>
          <h2 className="font-semibold text-black">{name}</h2>
          <p className="text-sm text-black text-left">Admin</p>
        </div>
      </button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <PopoverBody />
      </Popover>
    </Fragment>
  );
}

const PopoverBody = () => {
  const menuLinks = [
    {
      label: "Profile",
      route: "/profile",
      lead: "Account settings",
      icon: "icon-[solar--user-line-duotone]",
    },
    {
      label: "Inbox",
      route: "/inbox",
      lead: "Messages & Emails",
      icon: "icon-[solar--mailbox-line-duotone]",
    },
  ];

  return (
    <div className="p-5 grid grid-flow-row gap-3">
      <div>
        <h2 className="text-lg font-medium mb-4">User Profile</h2>
        <div className="flex gap-3">
          <UserAvatar name={name} size={62} />
          <div>
            <h4 className="font-medium">{name}</h4>
            <p className="text-sm">Admin</p>
            <p className="text-sm">info@spike.com</p>
          </div>
        </div>
      </div>
      <hr />
      <menu>
        <ul className="grid grid-flow-row">
          {menuLinks.map(({ label, lead, route, icon }, i) => (
            <li key={i}>
              <Link
                href={route}
                className="flex items-center gap-3 hover:text-primary hover:bg-primary/10 rounded-2xl p-3"
              >
                <div className="w-12 h-12 p-3 rounded-full bg-primary/10 text-primary flex justify-center items-center">
                  <span className={`${icon} text-2xl`} />
                </div>
                <div className="grid grid-flow-row">
                  <p>{label}</p>
                  <p className="text-xs text-black/80">{lead}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </menu>
      <hr />
      <LogoutButton />
    </div>
  );
};

const LogoutButton = () => {
  const logoutHandler = () => {};
  return (
    <Button variant="contained" disableElevation onClick={logoutHandler}>
      Log out
    </Button>
  );
};