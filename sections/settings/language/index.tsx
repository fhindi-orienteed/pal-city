import { Colors } from '@/constants/theme';
import { useLanguage } from '@/contexts/LanguageContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import styles from './styles';

interface LanguageOption {
    code: string;
    name: string;
    nativeName: string;
}

export default function Language() {
    const { t } = useTranslation();
    const router = useRouter();
    const { language, changeLanguage } = useLanguage();

    const languages: LanguageOption[] = [
        { code: 'en', name: 'English', nativeName: 'English' },
        { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
    ];

    const handleLanguageChange = async (languageCode: string) => {
        await changeLanguage(languageCode);
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={Colors.light.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{t('settings.language')}</Text>
                <View style={styles.placeholder} />
            </View>

            <View style={styles.content}>
                <View style={styles.section}>
                    {languages.map((lang) => (
                        <TouchableOpacity
                            key={lang.code}
                            style={[styles.languageItem, language === lang.code && styles.languageItemActive]}
                            onPress={() => handleLanguageChange(lang.code)}
                            activeOpacity={0.7}
                        >
                            <View style={styles.languageInfo}>
                                <Text style={styles.languageName}>{lang.name}</Text>
                                <Text style={styles.languageNativeName}>{lang.nativeName}</Text>
                            </View>

                            {language === lang.code && (
                                <Ionicons name="checkmark-circle" size={24} color="#4CAA4A" />
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </View>
    );
}

