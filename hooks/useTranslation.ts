import { useTranslation as useI18nTranslation } from 'react-i18next';
import { useLanguage } from '../contexts/LanguageContext';

/**
 * Custom hook that combines i18next translation with language context
 * Provides easy access to translations and language utilities
 */
export const useTranslation = () => {
    const { t, i18n } = useI18nTranslation();
    const { language, isRTL, changeLanguage } = useLanguage();

    return {
        t, // Translation function
        i18n, // i18n instance
        language, // Current language code
        isRTL, // Whether current language is RTL
        changeLanguage, // Function to change language
    };
};
