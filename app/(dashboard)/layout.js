/****
Refer: https://nextjs.org/docs/app/building-your-application/routing/route-groups
****/

import "../globals.css";

import { metadata, viewport } from "@/lib/metadata";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import AsideMenu from "@/components/layout/AsideMenu";
import Navbar from "@/components/layout/Navbar";
import ReduxProvider from "@/app/ReduxProvider";
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
        <ReduxProvider>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <main className="h-screen max-h-screen w-full grid grid-cols-10 gap-10 bg-[#f0f5f9] overflow-hidden p-5">
                <section className="col-span-2 w-full">
                  <AsideMenu />
                </section>
                <section className="col-span-8 flex flex-col flex-grow h-full overflow-hidden relative rounded-2xl">
                  <Navbar />
                  <section className="h-full overflow-scroll pt-24">
                    {children}
                  </section>
                </section>
              </main>
              <ToastProvider />
            </ThemeProvider>
          </AppRouterCacheProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
