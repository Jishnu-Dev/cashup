import { primaryColor, siteBasePath, siteName, tagline } from "@/lib/constants";

export const viewport = {
  themeColor: primaryColor,
};

export const metadata = {
  title: {
    template: `%s | ${siteName}`,
    default: siteName,
  },
  description: tagline,
  metadataBase: new URL("http://localhost:3000"),
  keywords: [siteName, tagline],
  openGraph: {
    images: "/og-image.png",
    title: siteName,
    description: tagline,
    url: siteBasePath,
    siteName: siteName,
    publishedTime: new Date().getTime(),
  },
};
