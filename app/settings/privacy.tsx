import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function PrivacySettingsScreen() {
    const { t } = useTranslation();
    const router = useRouter();

    const privacyItems = [
        {
            id: 'terms',
            title: t('settings.termsOfService'),
            icon: 'document-text-outline' as keyof typeof Ionicons.glyphMap,
        },
        {
            id: 'privacy-policy',
            title: t('settings.privacyPolicy'),
            icon: 'shield-outline' as keyof typeof Ionicons.glyphMap,
        },
        {
            id: 'data',
            title: t('settings.dataManagement'),
            icon: 'server-outline' as keyof typeof Ionicons.glyphMap,
        },
        {
            id: 'permissions',
            title: t('settings.appPermissions'),
            icon: 'key-outline' as keyof typeof Ionicons.glyphMap,
        },
    ];

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={Colors.light.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{t('settings.privacy')}</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.section}>
                    {privacyItems.map((item, index) => (
                        <TouchableOpacity
                            key={item.id}
                            style={[
                                styles.privacyItem,
                                index === privacyItems.length - 1 && styles.lastItem,
                            ]}
                            activeOpacity={0.7}
                        >
                            <View style={styles.privacyItemLeft}>
                                <Ionicons name={item.icon} size={24} color={Colors.light.tint} />
                                <Text style={styles.privacyItemTitle}>{item.title}</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.infoSection}>
                    <Ionicons name="lock-closed-outline" size={20} color="#8E8E93" />
                    <Text style={styles.infoText}>
                        {t('settings.privacyInfo')}
                    </Text>
                </View>
            </ScrollView>
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
    scrollView: {
        flex: 1,
    },
    section: {
        backgroundColor: '#fff',
        marginTop: 16,
        marginHorizontal: 16,
        borderRadius: 12,
        overflow: 'hidden',
    },
    privacyItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    lastItem: {
        borderBottomWidth: 0,
    },
    privacyItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        gap: 12,
    },
    privacyItemTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: Colors.light.text,
    },
    infoSection: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#F8F8F8',
        marginHorizontal: 16,
        marginTop: 16,
        padding: 16,
        borderRadius: 12,
        gap: 12,
    },
    infoText: {
        flex: 1,
        fontSize: 14,
        color: '#8E8E93',
        lineHeight: 20,
    },
});
