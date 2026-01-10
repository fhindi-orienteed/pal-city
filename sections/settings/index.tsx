
import Copyright from '@/components/Copyright';
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

interface SettingItem {
    id: string;
    title: string;
    icon: keyof typeof Ionicons.glyphMap;
    route?: string;
    badge?: string;
    color?: string;
}

export default function Settings() {
    const { t } = useTranslation();
    const router = useRouter();

    const settingsItems: SettingItem[] = [
        {
            id: 'profile',
            title: t('profile.title'),
            icon: 'person-outline',
            route: '/profile/index',
            color: Colors.light.tint,
        },
        {
            id: 'language',
            title: t('settings.language'),
            icon: 'language-outline',
            route: '/settings/language',
            color: '#007AFF',
        },
        {
            id: 'notifications',
            title: t('settings.notifications'),
            icon: 'notifications-outline',
            route: '/settings/notifications',
            color: '#FF9500',
        },
        {
            id: 'privacy',
            title: t('settings.privacy'),
            icon: 'shield-checkmark-outline',
            route: '/settings/privacy',
            color: '#5856D6',
        },
        {
            id: 'theme',
            title: t('settings.theme'),
            icon: 'moon-outline',
            route: '/settings/theme',
            color: '#8E8E93',
        },
        {
            id: 'about',
            title: t('settings.about'),
            icon: 'information-circle-outline',
            route: '/settings/about',
            color: '#34C759',
        },
        {
            id: 'help',
            title: t('settings.help'),
            icon: 'help-circle-outline',
            route: '/settings/help',
            color: '#FF3B30',
        },
    ];

    const handleItemPress = (item: SettingItem) => {
        if (item.route) {
            router.push(item.route as any);
        }
    };

    const renderSettingItem = (item: SettingItem) => (
        <TouchableOpacity
            key={item.id}
            style={styles.settingItem}
            onPress={() => handleItemPress(item)}
            activeOpacity={0.7}
        >
            <View style={styles.settingItemLeft}>
                <View style={[styles.iconContainer, { backgroundColor: `${item.color}15` }]}>
                    <Ionicons name={item.icon} size={24} color={item.color || Colors.light.tint} />
                </View>
                <Text style={styles.settingItemTitle}>{item.title}</Text>
            </View>
            <View style={styles.settingItemRight}>
                {item.badge && (
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{item.badge}</Text>
                    </View>
                )}
                <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={Colors.light.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{t('settings.title')}</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Settings List */}
                <View style={styles.section}>
                    {settingsItems.map((item) => renderSettingItem(item))}
                </View>

                {/* App Version */}
                <View style={styles.versionContainer}>
                    <Text style={styles.versionText}>Version 1.0.0</Text>
                    <Copyright />
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
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    settingItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    settingItemTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: Colors.light.text,
        flex: 1,
    },
    settingItemRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    badge: {
        backgroundColor: '#FF3B30',
        borderRadius: 10,
        paddingHorizontal: 8,
        paddingVertical: 2,
        minWidth: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    badgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
    versionContainer: {
        alignItems: 'center',
        paddingTop: 32,
        gap: 8,
    },
    versionText: {
        fontSize: 14,
        color: '#8E8E93',
        fontWeight: '500',
    },
});
