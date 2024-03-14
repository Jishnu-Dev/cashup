/****
 * Why folder name - (dashboard), (public) etc ?, refer below
 * https://nextjs.org/docs/app/building-your-application/routing/route-groups
 ****/

import "@/app/globals.css";

import { NextIntlClientProvider, useMessages } from "next-intl";
import { metadata, viewport } from "@/lib/metadata";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import Authenticator from "@/lib/authenticator";
import Navbar from "@/components/layout/Navbar";
import SideNav from "@/components/layout/SideNav";
import { ThemeProvider } from "@mui/material/styles";
import ToastProvider from "@/lib/toast-provider";
import classNames from "classnames";
import { inter } from "@/lib/font";
import theme from "@/app/theme";

export { metadata, viewport };

export default function RootLayout({ children, params: { lang } }) {
  const messages = useMessages();
  return (
    <html lang={lang} id="dashboard-root">
      <body
        className={classNames(
          inter.className,
          "text-black min-h-screen flex flex-col"
        )}
      >
        <NextIntlClientProvider messages={messages}>
          <Authenticator>
            <AppRouterCacheProvider>
              <ThemeProvider theme={theme}>
                <main className="h-screen max-h-screen w-full grid grid-cols-12 gap- bg-[#f0f5f9]">
                  <section
                    className="col-span-2 w-full sticky top- overflow-y-auto border-r bg-white"
                    style={{ maxHeight: "100vh" }}
                  >
                    <SideNav />
                  </section>
                  <section className="col-span-10 flex flex-col flex-grow h-full overflow-hidden relative bg-red- px-10">
                    <Navbar />
                    <section className="h-full overflow-y-scroll scrollbar-hidden pt-28 pb-16">
                      {children}
                    </section>
                  </section>
                </main>
                <ToastProvider />
              </ThemeProvider>
            </AppRouterCacheProvider>
          </Authenticator>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
