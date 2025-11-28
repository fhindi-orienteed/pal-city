import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Platform,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface NotificationSetting {
    id: string;
    title: string;
    description: string;
    enabled: boolean;
}

export default function NotificationsSettingsScreen() {
    const { t } = useTranslation();
    const router = useRouter();

    const [notifications, setNotifications] = useState<NotificationSetting[]>([
        {
            id: 'events',
            title: t('settings.notificationEvents'),
            description: t('settings.notificationEventsDesc'),
            enabled: true,
        },
        {
            id: 'offers',
            title: t('settings.notificationOffers'),
            description: t('settings.notificationOffersDesc'),
            enabled: true,
        },
        {
            id: 'updates',
            title: t('settings.notificationUpdates'),
            description: t('settings.notificationUpdatesDesc'),
            enabled: false,
        },
        {
            id: 'messages',
            title: t('settings.notificationMessages'),
            description: t('settings.notificationMessagesDesc'),
            enabled: true,
        },
    ]);

    const toggleNotification = (id: string) => {
        setNotifications((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, enabled: !item.enabled } : item
            )
        );
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={Colors.light.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{t('settings.notifications')}</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{t('settings.notificationPreferences')}</Text>
                    {notifications.map((item, index) => (
                        <View
                            key={item.id}
                            style={[
                                styles.notificationItem,
                                index === notifications.length - 1 && styles.lastItem,
                            ]}
                        >
                            <View style={styles.notificationInfo}>
                                <Text style={styles.notificationTitle}>{item.title}</Text>
                                <Text style={styles.notificationDescription}>{item.description}</Text>
                            </View>
                            <Switch
                                value={item.enabled}
                                onValueChange={() => toggleNotification(item.id)}
                                trackColor={{ false: '#E5E5E5', true: `${Colors.light.tint}50` }}
                                thumbColor={item.enabled ? Colors.light.tint : '#f4f3f4'}
                                ios_backgroundColor="#E5E5E5"
                            />
                        </View>
                    ))}
                </View>

                <View style={styles.infoSection}>
                    <Ionicons name="information-circle-outline" size={20} color="#8E8E93" />
                    <Text style={styles.infoText}>
                        {t('settings.notificationInfo')}
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
        padding: 16,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#8E8E93',
        marginBottom: 16,
        textTransform: 'uppercase',
    },
    notificationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    lastItem: {
        borderBottomWidth: 0,
    },
    notificationInfo: {
        flex: 1,
        marginRight: 16,
    },
    notificationTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: Colors.light.text,
        marginBottom: 4,
    },
    notificationDescription: {
        fontSize: 14,
        color: '#8E8E93',
        lineHeight: 20,
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
