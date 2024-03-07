/****
 * Why folder name - (dashboard) ?, refer below
 * https://nextjs.org/docs/app/building-your-application/routing/route-groups
 ****/

import "@/app/globals.css";

import { NextIntlClientProvider, useMessages } from "next-intl";
import { metadata, viewport } from "@/lib/metadata";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import AsideMenu from "@/components/layout/AsideMenu";
import Authenticator from "@/lib/authenticator";
import Navbar from "@/components/layout/Navbar";
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
                <main className="h-screen max-h-screen w-full grid grid-cols-10 gap-10 bg-[#f0f5f9] px-5 pt-5">
                  <section
                    className="col-span-2 w-full sticky top-0 pb-6 overflow-y-auto"
                    style={{ maxHeight: "100vh" }}
                  >
                    <AsideMenu />
                  </section>
                  <section className="col-span-8 flex flex-col flex-grow h-full overflow-hidden relative rounded-t-2xl">
                    <Navbar />
                    <section className="overflow-y-scroll scrollbar-hidden pt-28 pb-16">
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
