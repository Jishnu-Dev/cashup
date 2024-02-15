import "./globals.css";

import { siteBasePath, siteName, tagline } from "@/lib/constants";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import AsideMenu from "@/components/layout/AsideMenu";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import { ThemeProvider } from "@mui/material/styles";
import classNames from "classnames";
import theme from "./theme";

const inter = Inter({ subsets: ["latin"] });

export const viewport = {
  themeColor: "#dc2626",
};

export const metadata = {
  title: {
    template: `%s | ${siteName}`,
    default: siteName,
  },
  description: tagline,
  metadataBase: new URL(siteBasePath),
  keywords: [siteName, tagline],
  openGraph: {
    title: siteName,
    description: tagline,
    url: siteBasePath,
    siteName: siteName,
    publishedTime: new Date().getTime(),
  },
};

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
            <main className="max-h-screen h-screen w-full overflow-hidden flex gap-10 bg-[#f0f5f9] p-5">
              <AsideMenu />
              <section className="flex flex-col flex-grow h-full rounded-l rounded-xl relative">
                <Navbar />
                <div className="flex flex-col gap-4 overflow-scroll rounded-t-2xl py-28">
                  {children}
                </div>
              </section>
            </main>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
