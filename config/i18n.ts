import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import ar from '../locales/ar/translation.json';
import en from '../locales/en/translation.json';

// Get the device's locale
const deviceLanguage = Localization.getLocales()[0]?.languageCode || 'en';

// Configure i18n
i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        // Set available languages
        resources: {
            en: {
                translation: en,
            },
            ar: {
                translation: ar,
            },
        },

        // Set default language based on device locale
        lng: deviceLanguage,

        // Fallback language if translation is missing
        fallbackLng: 'en',

        // Enable debug mode in development
        debug: __DEV__,

        // Interpolation options
        interpolation: {
            escapeValue: false, // React already escapes values
        },

        // React options
        react: {
            useSuspense: false, // Disable suspense for React Native
        },

        // Compatibility options
        compatibilityJSON: 'v3', // Use v3 format for better compatibility
    });

export default i18n;
