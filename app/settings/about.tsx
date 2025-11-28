import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    Linking,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function AboutScreen() {
    const { t } = useTranslation();
    const router = useRouter();

    const aboutItems = [
        {
            id: 'website',
            title: t('settings.website'),
            value: 'www.palcity.ps',
            icon: 'globe-outline' as keyof typeof Ionicons.glyphMap,
            action: () => Linking.openURL('https://www.palcity.ps'),
        },
        {
            id: 'email',
            title: t('settings.contactEmail'),
            value: 'info@palcity.ps',
            icon: 'mail-outline' as keyof typeof Ionicons.glyphMap,
            action: () => Linking.openURL('mailto:info@palcity.ps'),
        },
        {
            id: 'phone',
            title: t('settings.contactPhone'),
            value: '+970 599 123 456',
            icon: 'call-outline' as keyof typeof Ionicons.glyphMap,
            action: () => Linking.openURL('tel:+970599123456'),
        },
    ];

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={Colors.light.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{t('settings.about')}</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* App Info */}
                <View style={styles.appInfoSection}>
                    <View style={styles.appIcon}>
                        <Ionicons name="location" size={48} color={Colors.light.tint} />
                    </View>
                    <Text style={styles.appName}>PalCity</Text>
                    <Text style={styles.appVersion}>Version 1.0.0</Text>
                    <Text style={styles.appDescription}>
                        {t('settings.appDescription')}
                    </Text>
                </View>

                {/* Contact Information */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{t('settings.contactUs')}</Text>
                    {aboutItems.map((item, index) => (
                        <TouchableOpacity
                            key={item.id}
                            style={[
                                styles.aboutItem,
                                index === aboutItems.length - 1 && styles.lastItem,
                            ]}
                            onPress={item.action}
                            activeOpacity={0.7}
                        >
                            <View style={styles.aboutItemLeft}>
                                <Ionicons name={item.icon} size={24} color={Colors.light.tint} />
                                <View style={styles.aboutItemInfo}>
                                    <Text style={styles.aboutItemTitle}>{item.title}</Text>
                                    <Text style={styles.aboutItemValue}>{item.value}</Text>
                                </View>
                            </View>
                            <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Social Media */}
                <View style={styles.socialSection}>
                    <Text style={styles.sectionTitle}>{t('settings.followUs')}</Text>
                    <View style={styles.socialButtons}>
                        <TouchableOpacity style={styles.socialButton}>
                            <Ionicons name="logo-facebook" size={28} color="#1877F2" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialButton}>
                            <Ionicons name="logo-instagram" size={28} color="#E4405F" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialButton}>
                            <Ionicons name="logo-twitter" size={28} color="#1DA1F2" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialButton}>
                            <Ionicons name="logo-linkedin" size={28} color="#0A66C2" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Copyright */}
                <View style={styles.copyrightSection}>
                    <Text style={styles.copyrightText}>
                        © 2024 PalCity. All rights reserved.
                    </Text>
                    <Text style={styles.copyrightSubtext}>
                        Made with ❤️ in Palestine
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
    appInfoSection: {
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingVertical: 32,
        marginTop: 16,
    },
    appIcon: {
        width: 80,
        height: 80,
        borderRadius: 20,
        backgroundColor: `${Colors.light.tint}15`,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    appName: {
        fontSize: 24,
        fontWeight: '700',
        color: Colors.light.text,
        marginBottom: 4,
    },
    appVersion: {
        fontSize: 14,
        color: '#8E8E93',
        marginBottom: 16,
    },
    appDescription: {
        fontSize: 14,
        color: '#8E8E93',
        textAlign: 'center',
        lineHeight: 20,
        paddingHorizontal: 32,
    },
    section: {
        backgroundColor: '#fff',
        marginTop: 16,
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
    aboutItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    lastItem: {
        borderBottomWidth: 0,
    },
    aboutItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        gap: 12,
    },
    aboutItemInfo: {
        flex: 1,
    },
    aboutItemTitle: {
        fontSize: 14,
        color: '#8E8E93',
        marginBottom: 2,
    },
    aboutItemValue: {
        fontSize: 16,
        fontWeight: '500',
        color: Colors.light.text,
    },
    socialSection: {
        backgroundColor: '#fff',
        marginTop: 16,
        marginHorizontal: 16,
        borderRadius: 12,
        padding: 16,
    },
    socialButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
    },
    socialButton: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#F8F8F8',
        alignItems: 'center',
        justifyContent: 'center',
    },
    copyrightSection: {
        alignItems: 'center',
        paddingVertical: 32,
        gap: 4,
    },
    copyrightText: {
        fontSize: 12,
        color: '#8E8E93',
    },
    copyrightSubtext: {
        fontSize: 12,
        color: '#C7C7CC',
    },
});
