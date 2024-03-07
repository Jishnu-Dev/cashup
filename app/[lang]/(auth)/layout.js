/****
 * Why folder name - (dashboard) ?, refer below
 * https://nextjs.org/docs/app/building-your-application/routing/route-groups
 ****/

import "@/app/globals.css";

import { NextIntlClientProvider, useMessages } from "next-intl";
import { metadata, viewport } from "@/lib/metadata";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import ToastProvider from "@/lib/toast-provider";
import classNames from "classnames";
import { inter } from "@/lib/font";
import theme from "@/app/theme";

export { metadata, viewport };

export default function RootLayout({ children, params: { lang } }) {
  const messages = useMessages();
  return (
    <html lang={lang}>
      <body
        className={classNames(
          inter.className,
          "text-black min-h-screen flex flex-col"
        )}
      >
        <NextIntlClientProvider messages={messages}>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <main className="min-h-screen w-full bg-[#f0f5f9]">
                {children}
              </main>
              <ToastProvider />
            </ThemeProvider>
          </AppRouterCacheProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
