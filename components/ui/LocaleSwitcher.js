"use client";

import Link from "next/link";
import { i18n } from "@/i18n/i18n-config";
import { usePathname } from "next/navigation";

export const withLocale = (pathname, locale) => {
  if (!pathname) return "/";
  const segments = pathname.split("/");
  segments[1] = locale;
  return segments.join("/");
};

export default function LocaleSwitcher() {
  const pathname = usePathname();
  // const redirectedPathName = (locale) => {
  //   if (!pathName) return "/";
  //   const segments = pathName.split("/");
  //   segments[1] = locale;
  //   return segments.join("/");
  // };

  return (
    <div>
      <p>Locale switcher:</p>
      <ul>
        {i18n.locales.map((locale) => {
          return (
            <li key={locale}>
              <Link href={withLocale(pathname, locale)}>{locale}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
