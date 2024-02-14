"use client";

import Image from "next/image";
import Link from "next/link";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import classNames from "classnames";
import { usePathname } from "next/navigation";

export default function AsideMenu() {
  const pathname = usePathname();
  const menuItems = [
    {
      label: "Dashboard",
      uri: "/dashboard",
      icon: "round-graph-line-duotone",
      isActive: pathname === "/dashboard",
    },
    {
      label: "Analytics",
      uri: "/analytics",
      icon: "round-graph-line-duotone",
      isActive: pathname === "/analytics",
    },
    {
      label: "Users",
      uri: "/users",
      icon: "round-graph-line-duotone",
      isActive: pathname === "/users",
    },
    {
      label: "Overview",
      uri: "/overview",
      icon: "round-graph-line-duotone",
      isActive: pathname === "/overview",
    },
  ];

  return (
    <aside className="w-2/12 h-full py-6 pl-6 flex flex-col bg-gradient-to-tr from-green-800 to-teal-500">
      <div className="h-max flex flex-col gap-12">
        <Branding />
        <menu className="h-8/12">
          <ul className="flex flex-col gap-1.5">
            {menuItems.map(({ label, uri, icon, isActive }) => {
              const iconClass = `icon-\[solar--${icon}\]`;
              return (
                <li
                  key={uri}
                  className={classNames({
                    "w-full group rounded-l-2xl": true,
                    "bg-white text-primary font-bold": isActive,
                    "text-white/80 hover:glass hover:text-white": !isActive,
                  })}
                >
                  <Link
                    href={uri}
                    className="w-full text-sm p-3 rounded-lg flex items-center gap-3"
                  >
                    <span className={`${iconClass} text-3xl`}></span>
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </menu>
      </div>
      {/* <FooterActions /> */}
    </aside>
  );
}

const Branding = () => (
  <Link href="/dashboard" className="flex gap-2 items-center">
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
  </Link>
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
