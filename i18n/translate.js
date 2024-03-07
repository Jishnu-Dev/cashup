const translations = require("@/i18n/translations");

const locales = {
  en: "en",
  ar: "ar",
};

const defaultLang = locales.en;
const currentLang = locales.ar;

export default function t(key) {
  try {
    /*** What the below line does?, Eg: Splitting 'pageName.login.title.' into [pageName, login, title]
     * and constructing the string key 'login.title.main-title' to access the transation like translation[login][title][main-title]
     * ***/
    const [page, ...keys] = key.split(".");
    const translation = keys.reduce((acc, k) => acc[k], translations[page]);
    if (!translation)
      throw new Error(
        `Translation key not found for ${key} in language ${currentLang}`
      );
    return translation[currentLang];
  } catch (e) {
    console.warn(e?.message);
    return null;
  }
}

export const LocaleSwitcherNew = () => {
  const currentLocale = document.documentElement.lang;
  console.log("current locale", currentLocale);
  return Object.keys(locales).map((key, i) => (
    <button key={i} onClick={() => {}}>
      {key}
    </button>
  ));
};
