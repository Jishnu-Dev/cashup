/****
 * Why folder name - (dashboard) ?, refer below
 * https://nextjs.org/docs/app/building-your-application/routing/route-groups
 ****/

import "../globals.css";

import { metadata, viewport } from "@/lib/metadata";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import Image from "next/image";
import Link from "next/link";
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
            <main className="h-screen w-full bg-[#f0f5f9] grid grid-cols-12">
              <section className="col-span-12 lg:col-span-5">
                {children}
              </section>
              <section
                className="col-span-0 lg:col-span-7 h-full w-full border-l flex justify-center items-center
              bg-[url('/images/illust/circle-scatter-green-bg.svg')] bg-cover bg-no-repeat"
              >
                <Image
                  src="/images/illust/ranking-two-color.svg"
                  alt="welcome"
                  width={600}
                  height={600}
                />
              </section>
            </main>
            {/* <BlankLayoutFooter /> */}
            <ToastProvider />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

const BlankLayoutFooter = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full p-5 fixed bottom-0 text-xs text-white/80 flex gap-4 justify-center items-center bg-gradient-to-t from-black/20 via-black/10 to-transparent">
      <p>{`All rights reserved. ${currentYear} Cashup.`}</p>
      <Link className="hover:text-white hover:underline" href="/privacy-policy">
        Privacy Policy
      </Link>
    </footer>
  );
};
