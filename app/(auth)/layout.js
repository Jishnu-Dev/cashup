import "../globals.css";

import { siteBasePath, siteName, tagline } from "@/lib/constants";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import classNames from "classnames";
import theme from "../theme";

const inter = Inter({ subsets: ["latin"] });

export const viewport = {
  themeColor: "#43A047",
};

export const metadata = {
  title: {
    template: `%s | ${siteName}`,
    default: siteName,
  },
  description: tagline,
  // metadataBase: "/",
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
            <main className="h-screen max-h-screen w-full bg-[#f0f5f9]">
              {children}
            </main>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
