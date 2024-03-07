import { primaryColor, siteName, tagline } from "@/lib/constants";

export const viewport = {
  themeColor: primaryColor,
};

export const metadata = {
  title: {
    template: `%s | ${siteName}`,
    default: siteName,
  },
  description: tagline,
};
