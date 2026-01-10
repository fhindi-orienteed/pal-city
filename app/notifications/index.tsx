import { Colors } from '@/constants/theme';
import { Notification } from '@/types/interface';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Platform,
    RefreshControl,
    SectionList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export default function NotificationsScreen() {
    const { t } = useTranslation();
    const router = useRouter();
    const [refreshing, setRefreshing] = useState(false);

    // Mock Data
    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: '1',
            title: 'New Event Near You',
            message: 'The "Ramallah Cultural Festival" starts tomorrow. Don\'t miss out!',
            date: '2 hours ago',
            read: false,
            type: 'event',
        },
        {
            id: '2',
            title: 'Special Offer',
            message: 'Get 20% off at Al-Quds Restaurant this weekend.',
            date: '5 hours ago',
            read: false,
            type: 'offer',
        },
        {
            id: '3',
            title: 'Welcome to PalCity',
            message: 'Thanks for joining us! Start exploring the best places in Palestine.',
            date: '1 day ago',
            read: true,
            type: 'system',
        },
        {
            id: '4',
            title: 'Profile Update',
            message: 'Your profile information has been successfully updated.',
            date: '2 days ago',
            read: true,
            type: 'system',
        },
    ]);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        // Simulate fetch
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    const handleMarkAllRead = () => {
        setNotifications((prev) =>
            prev.map((n) => ({ ...n, read: true }))
        );
    };

    const handleNotificationPress = (notification: Notification) => {
        // Mark as read
        setNotifications((prev) =>
            prev.map((n) =>
                n.id === notification.id ? { ...n, read: true } : n
            )
        );
        // Navigate if actionUrl exists (not implemented yet)
    };

    const getIcon = (type: Notification['type']) => {
        switch (type) {
            case 'event':
                return 'calendar-outline';
            case 'offer':
                return 'pricetag-outline';
            case 'message':
                return 'chatbubble-outline';
            case 'system':
            default:
                return 'information-circle-outline';
        }
    };

    const getColor = (type: Notification['type']) => {
        switch (type) {
            case 'event':
                return '#FF9500';
            case 'offer':
                return '#FF3B30';
            case 'message':
                return '#007AFF';
            case 'system':
            default:
                return Colors.light.tint;
        }
    };

    const sections = [
        {
            title: t('notificationsScreen.new'),
            data: notifications.filter((n) => !n.read),
        },
        {
            title: t('notificationsScreen.earlier'),
            data: notifications.filter((n) => n.read),
        },
    ].filter((section) => section.data.length > 0);

    const renderItem = ({ item }: { item: Notification }) => (
        <TouchableOpacity
            style={[styles.item, !item.read && styles.unreadItem]}
            onPress={() => handleNotificationPress(item)}
            activeOpacity={0.7}
        >
            <View style={[styles.iconContainer, { backgroundColor: `${getColor(item.type)}15` }]}>
                <Ionicons name={getIcon(item.type)} size={24} color={getColor(item.type)} />
            </View>
            <View style={styles.contentContainer}>
                <View style={styles.itemHeader}>
                    <Text style={[styles.title, !item.read && styles.unreadTitle]}>
                        {item.title}
                    </Text>
                    <Text style={styles.date}>{item.date}</Text>
                </View>
                <Text style={styles.message} numberOfLines={2}>
                    {item.message}
                </Text>
            </View>
            {!item.read && <View style={styles.dot} />}
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={Colors.light.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{t('notificationsScreen.title')}</Text>
                <TouchableOpacity onPress={handleMarkAllRead}>
                    <Text style={styles.markReadText}>{t('notificationsScreen.markAllRead')}</Text>
                </TouchableOpacity>
            </View>

            {notifications.length === 0 ? (
                <View style={styles.emptyState}>
                    <Ionicons name="notifications-off-outline" size={64} color="#C7C7CC" />
                    <Text style={styles.emptyText}>{t('notificationsScreen.empty')}</Text>
                </View>
            ) : (
                <SectionList
                    sections={sections}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    renderSectionHeader={({ section: { title } }) => (
                        <Text style={styles.sectionHeader}>{title}</Text>
                    )}
                    contentContainerStyle={styles.listContent}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.light.tint} />
                    }
                    stickySectionHeadersEnabled={false}
                />
            )}
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
    markReadText: {
        fontSize: 14,
        color: Colors.light.tint,
        fontWeight: '600',
    },
    listContent: {
        paddingBottom: 24,
    },
    sectionHeader: {
        fontSize: 14,
        fontWeight: '600',
        color: '#8E8E93',
        marginTop: 24,
        marginBottom: 8,
        marginHorizontal: 16,
        textTransform: 'uppercase',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
        marginHorizontal: 16,
        marginBottom: 12,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    unreadItem: {
        backgroundColor: '#fff',
        borderLeftWidth: 4,
        borderLeftColor: Colors.light.tint,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    contentContainer: {
        flex: 1,
        marginRight: 8,
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.light.text,
        flex: 1,
        marginRight: 8,
    },
    unreadTitle: {
        color: '#000',
    },
    date: {
        fontSize: 12,
        color: '#8E8E93',
    },
    message: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: Colors.light.tint,
    },
    emptyState: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 32,
    },
    emptyText: {
        marginTop: 16,
        fontSize: 16,
        color: '#8E8E93',
        fontWeight: '500',
    },
});
