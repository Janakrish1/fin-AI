import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translations from './translations';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: translations.en },
    fr: { translation: translations.fr },
    es: { translation: translations.es },
    zh: { translation: translations.zh }
  },
  lng: "en", // Default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
