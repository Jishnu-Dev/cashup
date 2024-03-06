"use client";

import { useEffect, useState } from "react";

import Cookies from "universal-cookie";

const translations = require("@/i18n/translations");

const cookie = new Cookies();
const cookieNameSiteLang = "cashup_site_language";

const languages = { en: "en", ar: "ar" };
const defaultLang = languages.en;

cookie.set(cookieNameSiteLang, "en");

export default function t(key) {
  const [currentLang, setCurrentLang] = useState("en");
  useEffect(() => {
    const langFromCookie = cookie.get(cookieNameSiteLang);
    // const langFromDocumentRoot = document.documentElement.lang ?? "en";
    setCurrentLang(langFromCookie);
  }, []);

  try {
    const text = translations[key][currentLang];
    if (text) return text;
  } catch (e) {
    console.warn("Corresponding key not found for language: " + currentLang);
    return translations[key][defaultLang] ?? ""; // If text available in default lang, return it else empty string
  }
}

export const switchLanguage = () => {
  cookie.set(cookieNameSiteLang, languages.ar);
  document.documentElement.lang = languages.ar;
  document.documentElement.dir = "rtl";
};
