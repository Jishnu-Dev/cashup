import { siteBasePath } from "@/lib/constants";

export default async function sitemap() {
  const currentDate = new Date();
  const possibleSlugs = [
    "platforms",
    "solutions",
    "cloud-office",
    "resources",
    "partners",
    "company",
    "experience-platform",
    "communications-apis",
    "cloud-office",
    "spaces",
    "call-center-elite",
    "innovation-without-disruption",
    "partner-locator",
    "alliances",
    "partners",
    "agents",
    "investors",
    "about-info",
    "info-life",
    "diversity",
    "sustainability",
    "newsroom",
    "careers",
    "support",
    "blog",
    "customer-stories",
    "legal",
    "documentation-center",
    "events",
  ];

  const sitemapEntries = [
    {
      url: siteBasePath,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1,
    },
    ...possibleSlugs.map((slug) => ({
      url: `${siteBasePath}/jishnu/${slug}`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.8,
    })),
  ];

  return sitemapEntries;
}
