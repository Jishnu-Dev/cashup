import "./globals.css";

import { siteBasePath, siteName, tagline } from "@/lib/constants";

import Aos from "@/components/ui/Aos";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { Inter } from "next/font/google";
import classNames from "classnames";

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
  generator: "Next.js",
  applicationName: "Next.js",
  referrer: "origin-when-cross-origin",
  keywords: [siteName, tagline],
  creator: "Jishnu Raj",
  publisher: "Jishnu Raj",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: siteName,
    description: tagline,
    url: siteBasePath,
    siteName: siteName,
    locale: "en_US",
    type: "article",
    publishedTime: new Date().getTime(),
    authors: ["Jishnu Raj"],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: tagline,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  sitemap: `${siteBasePath}/sitemap.xml`,
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
        <main className="flex-grow bg-white">{children}</main>
        <Aos />
      </body>
    </html>
  );
}
