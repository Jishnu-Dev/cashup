"use client";

/* ***** 
  Icon pack used -> 
  https://icon-sets.iconify.design/solar (Line Duotone variant) 
***** */

import { Link, usePathname } from "@/navigation";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
} from "@mui/material";

import Card from "@mui/material/Card";
import Image from "next/image";
import cn from "classnames";

export default function SideNav({ slug }) {
  const pathname = usePathname();
  const menuItems = [
    {
      label: "Home",
      uri: "/",
      icon: "icon-[solar--pie-chart-2-bold-duotone]",
    },
    {
      label: "Wallet",
      uri: "/wallet",
      icon: "icon-[solar--wallet-money-bold-duotone]",
    },
    {
      label: "My Network",
      uri: "/network",
      icon: "icon-[solar--users-group-two-rounded-bold-duotone]",
    },
    {
      label: "Manage eShop",
      uri: "/eshop",
      icon: "icon-[solar--shop-2-bold-duotone]",
    },
    {
      label: "Reports",
      uri: "/reports",
      icon: "icon-[solar--document-add-bold-duotone]",
    },
  ];

  return (
    <aside
      component="aside"
      className="h-full py-6 pr- flex flex-col rounded-2xl p-3"
    >
      {/* Original Gradient:  bg-gradient-to-t from-emerald-500 via-emerald-600/30 to-white */}
      {/* from-emerald-700/70 */}
      <div className="flex flex-col gap-12">
        <Branding />
        <List>
          <ListItemText
            primaryTypographyProps={{
              fontWeight: "bold",
              className: "text-black/50",
              fontSize: 12,
            }}
          >
            OVERVIEW
          </ListItemText>
          {menuItems.map(({ label, uri, icon }) => {
            const isActive = uri === pathname;
            return (
              <Link key={uri} href={uri}>
                <ListItemButton
                  key={uri}
                  selected={isActive}
                  sx={{
                    my: 1,
                    padding: 0,
                    borderRadius: "12px",
                  }}
                >
                  <ListItem>
                    <ListItemIcon>
                      <span
                        className={cn({
                          [icon]: true,
                          "text-2xl": true,
                          "text-primary": isActive,
                        })}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primaryTypographyProps={{
                        fontWeight: isActive ? "bold" : "normal",
                        className: isActive ? "text-primary" : null,
                        fontSize: 14,
                      }}
                    >
                      {label}
                    </ListItemText>
                  </ListItem>
                </ListItemButton>
              </Link>
            );
          })}
        </List>
      </div>
    </aside>
  );
}

const Branding = () => (
  <Link href="/" className="px-">
    <Image
      priority
      alt="Logo"
      width={180}
      height={180}
      src="/images/cashup-logo-colored.png"
      // style={{ width: "auto", height: "auto" }}
    />
  </Link>
);
