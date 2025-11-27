import React from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useTranslation } from '../hooks/useTranslation';

interface LanguageSelectorProps {
    style?: any;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ style }) => {
    const { t, language, changeLanguage } = useTranslation();

    const languages = [
        { code: 'en', name: t('settings.english'), flag: '🇬🇧' },
        { code: 'ar', name: t('settings.arabic'), flag: '🇵🇸' },
    ];

    const handleLanguageChange = async (langCode: string) => {
        if (langCode === language) return;

        // Show confirmation for RTL change
        if (langCode === 'ar' || language === 'ar') {
            Alert.alert(
                t('settings.language'),
                'The app will reload to apply the language change.',
                [
                    {
                        text: t('common.cancel'),
                        style: 'cancel',
                    },
                    {
                        text: t('common.submit'),
                        onPress: async () => {
                            await changeLanguage(langCode);
                        },
                    },
                ]
            );
        } else {
            await changeLanguage(langCode);
        }
    };

    return (
        <View style={[styles.container, style]}>
            <Text style={styles.title}>{t('settings.selectLanguage')}</Text>
            <View style={styles.languageList}>
                {languages.map((lang) => (
                    <TouchableOpacity
                        key={lang.code}
                        style={[
                            styles.languageButton,
                            language === lang.code && styles.selectedLanguage,
                        ]}
                        onPress={() => handleLanguageChange(lang.code)}
                    >
                        <Text style={styles.flag}>{lang.flag}</Text>
                        <Text
                            style={[
                                styles.languageName,
                                language === lang.code && styles.selectedLanguageName,
                            ]}
                        >
                            {lang.name}
                        </Text>
                        {language === lang.code && (
                            <Text style={styles.checkmark}>✓</Text>
                        )}
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 16,
        color: '#333',
    },
    languageList: {
        gap: 12,
    },
    languageButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f5f5f5',
        borderRadius: 12,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    selectedLanguage: {
        backgroundColor: '#fff',
        borderColor: '#FF6B35',
    },
    flag: {
        fontSize: 24,
        marginRight: 12,
    },
    languageName: {
        fontSize: 16,
        color: '#666',
        flex: 1,
    },
    selectedLanguageName: {
        color: '#FF6B35',
        fontWeight: '600',
    },
    checkmark: {
        fontSize: 20,
        color: '#FF6B35',
        fontWeight: 'bold',
    },
});
