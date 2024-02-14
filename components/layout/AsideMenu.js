"use client";

import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ExploreRoundedIcon from "@mui/icons-material/ExploreRounded";
import Image from "next/image";
import Link from "next/link";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import TimelineRoundedIcon from "@mui/icons-material/TimelineRounded";
import classNames from "classnames";
import { usePathname } from "next/navigation";

export default function AsideMenu() {
  const pathname = usePathname();
  const menuItems = [
    {
      label: "Dashboard",
      uri: "/dashboard",
      Icon: DashboardRoundedIcon,
      isActive: pathname === "/dashboard",
    },
    {
      label: "Analytics",
      uri: "/dashboard/analytics",
      Icon: TimelineRoundedIcon,
      isActive: pathname === "/dashboard/analytics",
    },
    {
      label: "Users",
      uri: "/dashboard/users",
      Icon: PeopleAltRoundedIcon,
      isActive: pathname === "/dashboard/users",
    },
    {
      label: "Overview",
      uri: "/dashboard/overview",
      Icon: ExploreRoundedIcon,
      isActive: pathname === "/dashboard/overview",
    },
  ];

  return (
    <aside className="w-2/12 h-full py-6 pl-6 flex flex-col bg-gradient-to-tr from-green-800 to-teal-500">
      <div className="h-max flex flex-col gap-12">
        <Branding />
        <menu className="h-8/12">
          <ul className="flex flex-col gap-1.5">
            {menuItems.map(({ label, uri, Icon, isActive }) => (
              <li
                key={uri}
                className={classNames({
                  "w-full group rounded-l-2xl": true,
                  "bg-white text-primary font-bold": isActive,
                  "text-white/80 hover:glass": !isActive,
                })}
              >
                <Link
                  href={uri}
                  className="w-full text-sm p-3 rounded-lg flex items-center gap-3"
                >
                  <Icon size={24} />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </menu>
      </div>
      {/* <FooterActions /> */}
    </aside>
  );
}

const Branding = () => (
  <div className="flex gap-2 items-center">
    <Image
      priority
      src="/images/cashup-logo-main-white.png"
      alt="Logo"
      width={60}
      height={60}
    />
    <div>
      <h2 className="text-3xl font-bold text-white">Cashup</h2>
      <p className="text-[8px] text-white">
        Empowering cashback & passive income
      </p>
    </div>
  </div>
);

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
