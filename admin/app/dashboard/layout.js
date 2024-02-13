"use client";

import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CheckIcon from "@mui/icons-material/Check";
import Checkbox from "@mui/material/Checkbox";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ExploreRoundedIcon from "@mui/icons-material/ExploreRounded";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";
import Link from "next/link";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import SampleTable from "@/components/SampleTable";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import TimelineRoundedIcon from "@mui/icons-material/TimelineRounded";
import { usePathname } from "next/navigation";

export default function DashboardLayout() {
  return (
    <section className="min-h-screen h-screen w-full flex bg-gray-100">
      <aside className="w-2/12 h-full bg-gray-50 border-r p-6 flex flex-col">
        <div className="h-max flex flex-col gap-12">
          <Branding />
          <SideMenu />
        </div>
        <FooterActions />
      </aside>
      <section className="flex flex-col flex-grow h-full bg-white rounded-l rounded-xl">
        <Navbar />
        <div className="px-10 py-6 flex flex-col gap-4">
          <div className="flex gap-4">
            <Button variant="contained" disableElevation>
              Button Primary
            </Button>
            <Button variant="outlined" disableElevation>
              Button Secondary
            </Button>
            <Button color="success" variant="outlined" disableElevation>
              Button Success
            </Button>
            <Checkbox defaultChecked />
          </div>
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
            Here is a gentle confirmation that your action was successful.
          </Alert>
          <SampleTable />
        </div>
      </section>
    </section>
  );
}

const Navbar = () => {
  const pathname = usePathname().replace("/", "");
  return (
    <nav className="w-full px-10 py-4 bg-white border-b flex justify-between items-center">
      <h2 className="text-lg font-medium text-primary capitalize">
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

const Branding = () => (
  <Image src="/images/app-logo.png" alt="Logo" width={150} height={150} />
);

const SideMenu = () => {
  const menuItems = [
    {
      label: "Dashboard",
      uri: "/dashboard",
      Icon: DashboardRoundedIcon,
    },
    {
      label: "Analytics",
      uri: "/analytics",
      Icon: TimelineRoundedIcon,
    },
    {
      label: "Users",
      uri: "/users",
      Icon: PeopleAltRoundedIcon,
    },
    {
      label: "Overview",
      uri: "/overview",
      Icon: ExploreRoundedIcon,
    },
  ];

  return (
    <menu className="h-8/12">
      <ul className="flex flex-col gap-1.5">
        {menuItems.map(({ label, uri, Icon }) => (
          <li key={uri} className="w-full group">
            <Link
              href={uri}
              className="w-full text-sm p-3 rounded-lg bg-transparent hover:bg-primary/10 group text-black/50 group-hover:text-primary flex items-center gap-3"
            >
              <Icon size={24} className="group-hover:text-primary" />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </menu>
  );
};

const FooterActions = () => {
  const actions = [
    {
      label: "Settings",
      action: () => Router.push("/settings"),
      Icon: SettingsRoundedIcon,
    },
    {
      label: "Logout",
      action: logoutHandler,
      Icon: LogoutRoundedIcon,
    },
  ];

  function logoutHandler() {}

  return (
    <menu className="mt-auto w-full">
      <ul className="flex flex-col gap-1.5 w-full">
        {actions.map(({ label, action, Icon }) => (
          <li key={label} className="w-full group">
            <button
              className="w-full flex items-center gap-3 p-3 rounded-lg group-hover:bg-primary/10 group-hover:text-primary text-black/50 text-sm"
              onClick={() => action()}
            >
              <Icon size={24} className="group-hover:text-primary" />
              {label}
            </button>
          </li>
        ))}
      </ul>
    </menu>
  );
};
