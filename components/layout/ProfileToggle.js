"use client";

import { Fragment, useState } from "react";
import { Link, useRouter } from "@/navigation";

import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import Skeleton from "@mui/material/Skeleton";
import UserAvatar from "@/components/layout/UserAvatar";
import { clearUserCredentials } from "@/lib/authenticator";
import { toast } from "react-toastify";
import { useMerchantStore } from "@/store/merchant-store-provider";
import { useStore } from "@/store/use-store";

export default function ProfileToggle() {
  // Popover
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const open = Boolean(anchorEl);
  const id = open ? "profile-popover" : undefined;

  // Data
  const merchantData = useStore(
    useMerchantStore,
    (state) => state?.merchantData
  );

  return merchantData ? (
    <Fragment>
      <button
        aria-describedby={id}
        onClick={handleClick}
        className="flex items-center text-left gap-3 p-2 hover:bg-primary/10 rounded-2xl"
      >
        <UserAvatar name={merchantData?.merchant_name ?? "Cashup"} />
        <div className="flex flex-col">
          <h2 className="font-semibold text-black max-w-32 truncate">
            {merchantData?.merchant_name ?? "Cashup"}
          </h2>
          <small className="text-xs text-black/50 max-w-32 truncate">
            {merchantData?.email_address ?? "Merchant"}
          </small>
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
        <PopoverBody merchantData={merchantData} />
      </Popover>
    </Fragment>
  ) : (
    <LoadingSkelt />
  );
}

const PopoverBody = ({ merchantData }) => {
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
        <h2 className="text-lg font-medium mb-4">Profile</h2>
        <div className="flex gap-3">
          <UserAvatar
            name={merchantData?.merchant_name ?? "Cashup"}
            size={62}
          />
          <div className="flex flex-col">
            <h4 className="font-medium">
              {merchantData?.merchant_name ?? "Cashup"}
            </h4>
            <small>Admin</small>
            <small className="truncate max-w-42">
              {merchantData?.email_address}
            </small>
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
                  <small className="text-black/80">{lead}</small>
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
  const router = useRouter();
  const { clearStore } = useMerchantStore((state) => state);
  const logoutHandler = () => {
    clearUserCredentials();
    clearStore();
    toast.success("Logged out successfully, redirecting to login...");
    setTimeout(() => {
      router.push("/login");
    }, 1500);
  };
  return (
    <Button variant="contained" onClick={logoutHandler}>
      Log out
    </Button>
  );
};

const LoadingSkelt = () => (
  <div className="flex items-center gap-3 p-2">
    <Skeleton variant="circular" width={60} height={60} />
    <div>
      <Skeleton variant="text" width={90} />
      <Skeleton variant="text" width={50} />
    </div>
  </div>
);
