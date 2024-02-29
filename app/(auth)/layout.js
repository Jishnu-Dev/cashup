/****
 * Why folder name - (dashboard) ?, refer below
 * https://nextjs.org/docs/app/building-your-application/routing/route-groups
 ****/

import "../globals.css";

import { metadata, viewport } from "@/lib/metadata";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import ToastProvider from "@/app/ToastProvider";
import classNames from "classnames";
import { inter } from "@/lib/font";
import theme from "@/app/theme";

export { metadata, viewport };

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="emerald">
      <body
        className={classNames(
          inter.className,
          "text-black min-h-screen flex flex-col"
        )}
      >
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <main className="h-screen w-full bg-[#f0f5f9]">{children}</main>
            <ToastProvider />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
