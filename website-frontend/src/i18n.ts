import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import {initReactI18next} from "react-i18next";

const resources = {
    es: {translation: require(`/static/locales/es/translation.json`)},
    en: {translation: require(`/static/locales/en/translation.json`)},
};

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: "es",
        resources,
        load: "languageOnly",
        supportedLngs: ["es", "en"],
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
