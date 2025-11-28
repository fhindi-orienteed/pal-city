import { Colors } from '@/constants/theme';
import { useLanguage } from '@/contexts/LanguageContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface LanguageOption {
    code: string;
    name: string;
    nativeName: string;
}

export default function LanguageSettingsScreen() {
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
                    <Text style={styles.sectionTitle}>{t('settings.selectLanguage')}</Text>
                    {languages.map((lang) => (
                        <TouchableOpacity
                            key={lang.code}
                            style={styles.languageItem}
                            onPress={() => handleLanguageChange(lang.code)}
                            activeOpacity={0.7}
                        >
                            <View style={styles.languageInfo}>
                                <Text style={styles.languageName}>{lang.name}</Text>
                                <Text style={styles.languageNativeName}>{lang.nativeName}</Text>
                            </View>
                            {language === lang.code && (
                                <Ionicons name="checkmark-circle" size={24} color={Colors.light.tint} />
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
        paddingBottom: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: Colors.light.text,
    },
    placeholder: {
        width: 40,
    },
    content: {
        flex: 1,
        paddingTop: 16,
    },
    section: {
        backgroundColor: '#fff',
        marginHorizontal: 16,
        borderRadius: 12,
        padding: 16,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#8E8E93',
        marginBottom: 16,
        textTransform: 'uppercase',
    },
    languageItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    languageInfo: {
        flex: 1,
    },
    languageName: {
        fontSize: 16,
        fontWeight: '500',
        color: Colors.light.text,
        marginBottom: 4,
    },
    languageNativeName: {
        fontSize: 14,
        color: '#8E8E93',
    },
});
