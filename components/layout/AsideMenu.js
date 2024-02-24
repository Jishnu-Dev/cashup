"use client";
/* ***** Icon pack used -> https://icon-sets.iconify.design/solar (Line Duotone variant) ***** */

import Image from "next/image";
import Link from "next/link";
import cn from "classnames";
import { usePathname } from "next/navigation";

export default function AsideMenu() {
  const pathname = usePathname();
  const menuItems = [
    {
      label: "Dashboard",
      uri: "/",
      isActive: pathname === "/",
      icon: "icon-[solar--pie-chart-2-bold-duotone]",
    },
    {
      label: "Wallet",
      uri: "/wallet",
      isActive: pathname === "/wallet",
      icon: "icon-[solar--wallet-money-bold-duotone]",
    },
    {
      label: "My Network",
      uri: "/network",
      isActive: pathname === "/network",
      icon: "icon-[solar--users-group-two-rounded-bold-duotone]",
    },
    {
      label: "Manage eShop",
      uri: "/manage/eshop",
      isActive: pathname === "/manage/eshop",
      icon: "icon-[solar--shop-2-bold-duotone]",
    },
    {
      label: "Messages",
      uri: "/chat",
      isActive: pathname === "/chat",
      icon: "icon-[solar--chat-unread-bold-duotone]",
    },
    {
      label: "Reports",
      uri: "/reports",
      isActive: pathname === "/reports",
      icon: "icon-[solar--document-add-bold-duotone]",
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
                  className={cn({
                    "w-full group rounded-r-full": true,
                    "bg-green-400/80 text-black/50": isActive,
                    "text-black hover:bg-green-400/20": !isActive,
                  })}
                >
                  <Link
                    prefetch
                    href={uri}
                    className="w-full text-sm rounded-lg flex items-center gap-3 p-4"
                  >
                    <span
                      className={cn({
                        [icon]: true,
                        "text-2xl": true,
                        "text-green-900": isActive,
                        "text-lime-800": !isActive,
                      })}
                    />
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
