import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translations_es from "./translations/es/strings.json";
import translations_en from "./translations/en/strings.json";
// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: translations_en
  },

  es:{
    translation: translations_es
  } 
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "es",



    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;