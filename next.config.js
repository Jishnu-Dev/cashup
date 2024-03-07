const createNextIntlPlugin = require("next-intl/plugin");

/** @type {import('next').NextConfig} */

const withNextIntl = createNextIntlPlugin("./i18n/i18n-config.js");

const nextConfig = {
  transpilePackages: ["mui-tel-input"],
};

module.exports = withNextIntl(nextConfig);
