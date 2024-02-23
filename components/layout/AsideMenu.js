"use client";
/* ***** Icon pack used -> https://icon-sets.iconify.design/solar (Line Duotone variant) ***** */

import Image from "next/image";
import Link from "next/link";
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
    <aside
      className="h-full py-6 pr-6 flex flex-col rounded-2xl shadow shadow-primary/20
      bg-gradient-to-t from-emerald-500 via-emerald-600/30 to-white"
    >
      {/* from-emerald-700/70 */}
      <div className="flex flex-col gap-12">
        <Branding />
        <menu className="h-8/12">
          <ul className="flex flex-col gap-0.5">
            {menuItems.map(({ label, uri, icon, isActive }) => {
              return (
                <li
                  key={uri}
                  className={classNames({
                    "w-full group rounded-r-full": true,
                    "bg-green-400/80 text-black": isActive,
                    "text-black hover:bg-green-400/20": !isActive,
                  })}
                >
                  <Link
                    prefetch
                    href={uri}
                    className="w-full text-sm rounded-lg flex items-center gap-3 p-4"
                  >
                    <span className={`${icon} text-2xl`} />
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </menu>
      </div>
    </aside>
  );
}

const Branding = () => (
  <Link href="/" className="px-6">
    <Image
      priority
      alt="Logo"
      width={160}
      height={160}
      src="/images/cashup-logo-colored.png"
      style={{ width: "auto", height: "auto" }}
    />
  </Link>
);
