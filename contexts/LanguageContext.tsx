import * as Updates from 'expo-updates';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { I18nManager } from 'react-native';
import i18n from '../config/i18n';

interface LanguageContextType {
    language: string;
    isRTL: boolean;
    changeLanguage: (lang: string) => Promise<void>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
    children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
    const [language, setLanguage] = useState(i18n.language);
    const [isRTL, setIsRTL] = useState(I18nManager.isRTL);

    useEffect(() => {
        // Sync RTL with current language
        const rtl = language === 'ar';
        setIsRTL(rtl);

        // Update i18n language
        i18n.changeLanguage(language);
    }, [language]);

    const changeLanguage = async (lang: string) => {
        const newIsRTL = lang === 'ar';

        // If RTL direction needs to change, we need to reload the app
        if (newIsRTL !== I18nManager.isRTL) {
            I18nManager.forceRTL(newIsRTL);

            // In production with Expo, reload the app
            try {
                if (!__DEV__) {
                    await Updates.reloadAsync();
                } else {
                    // In development, just show a warning
                    console.warn(
                        'RTL direction changed. Please reload the app manually for the changes to take full effect.'
                    );
                }
            } catch (error) {
                console.error('Error reloading app:', error);
            }
        }

        // Change language
        await i18n.changeLanguage(lang);
        setLanguage(lang);
    };

    return (
        <LanguageContext.Provider value={{ language, isRTL, changeLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
