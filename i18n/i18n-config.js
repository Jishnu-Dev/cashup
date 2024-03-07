/******** Refer: https://next-intl-docs.vercel.app/docs/getting-started/app-router *********/
/******** Using in Server & Client Components, https://next-intl-docs.vercel.app/docs/environments/server-client-components *********/

import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

const locales = ["en", "ar"];

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale)) notFound();
  return {
    messages: (await import(`./${locale}.json`)).default,
  };
});
