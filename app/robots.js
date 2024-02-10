import { siteBasePath } from "@/lib/constants";

export default function robots() {
  return {
    rules: {
      allow: "/",
      userAgent: "*",
      disallow: "/private/",
    },
    sitemap: `${siteBasePath}/sitemap.xml`,
  };
}
