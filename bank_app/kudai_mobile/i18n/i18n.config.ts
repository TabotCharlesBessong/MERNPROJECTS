import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./translation/en.json";
import fr from "./translation/fr.json";
import de from "./translation/de.json";

export const languageResources = {
  en: { translation: en },
  fr: { translation: fr },
  de: { translation: de },
};
i18next.use(initReactI18next).init({
  compatibilityJSON: "v3",
  lng: "en",
  fallbackLng: "en",
  resources: languageResources,
});

export default i18next;
