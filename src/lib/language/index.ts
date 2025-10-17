import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocal } from "@/lib/helpers/cookie";
import { en } from './en';
import { id } from './id';

// Define the translations
const translations = {
  en: { translation: en },
  id: { translation: id },
};

// Fallback language if the preferred language is unavailable
const fallback = 'en';

const fetchLanguage= async () => {
  try {
    const language = await getLocal('language');
    console.log('language', language);
    return language || fallback;
  } catch (error) {
    console.error('Error get language :', error);
    return fallback;
  }
};

// Initialize i18next with the preferred language and fallback
const initI18n = async () => {
  const languageFromLocal = await fetchLanguage();

  i18n
    .use(initReactI18next)
    .init({
      resources: translations,
      lng: languageFromLocal, // Set language from database
      fallbackLng: fallback, // Default fallback
      interpolation: { escapeValue: false },
    });
};

// Call init function
initI18n();

export default i18n;