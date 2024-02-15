"use client";

// Icons used - https://icon-sets.iconify.design/solar/ (Line Duotone)

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
      uri: "/",
      isActive: pathname === "/",
      icon: "icon-[solar--soundwave-square-line-duotone]",
    },
    {
      label: "Analytics",
      uri: "/analytics",
      isActive: pathname === "/analytics",
      icon: "icon-[solar--pie-chart-3-line-duotone]",
    },
    {
      label: "Users",
      uri: "/users",
      isActive: pathname === "/users",
      icon: "icon-[solar--user-line-duotone]",
    },
    {
      label: "Overview",
      uri: "/overview",
      isActive: pathname === "/overview",
      icon: "icon-[solar--checklist-line-duotone]",
    },
  ];

  return (
    <aside className="w-[23%] h-full py-6 pr-6 flex flex-col bg-white rounded-2xl shadow shadow-primary/20">
      <div className="h-max flex flex-col gap-12">
        <Branding />
        <menu className="h-8/12">
          <p className="font-medium text-sm text-black/50 pl-6 mb-2">Home</p>
          <ul className="flex flex-col gap-0.5">
            {menuItems.map(({ label, uri, icon, isActive }) => {
              return (
                <li
                  key={uri}
                  className={classNames({
                    "w-full group rounded-r-full": true,
                    "bg-primary/10 text-primary": isActive,
                    "text-black hover:bg-primary/10": !isActive,
                  })}
                >
                  <Link
                    href={uri}
                    className="w-full text-sm rounded-lg flex items-center gap-3 p-4"
                  >
                    <span className={`${icon} text-2xl`}></span>
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
  <Link href="/dashboard" className="px-6">
    <Image
      priority
      src="/images/cashup-logo-colored.png"
      alt="Logo"
      width={200}
      height={200}
    />
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
