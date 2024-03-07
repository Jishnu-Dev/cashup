import { localePrefix, locales } from "./navigation";

import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  defaultLocale: "en",
  localePrefix,
  locales,
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(ar|en)/:path*"],
};
