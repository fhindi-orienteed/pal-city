import { useAuth } from '@/contexts/AuthContext';
import { MoreMenuItem, TabRoute } from '@/types/interface';
import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Modal,
    ScrollView,
    Share,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MenuItem from './menu-item';
import styles from './styles';
import TabItem from './tab-item';

const mainRoutes: TabRoute[] = [
    { key: 'index', name: 'index', icon: 'home', label: 'Home' },
    { key: 'search', name: 'search', icon: 'search', label: 'Search' },
    { key: 'explore', name: 'explore', icon: 'compass', label: 'Explore' },
    { key: 'more', name: 'more', icon: 'grid', label: 'More' },
];

export default function CustomTabBar() {
    const { logout, isLogin } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const insets = useSafeAreaInsets();
    const [isMoreMenuVisible, setIsMoreMenuVisible] = useState(false);

    const getCurrentRoute = () => {
        if (pathname === '/') return 'index';
        const match = pathname.match(/\/(.+)/);
        return match ? match[1] : 'index';
    };

    const activeRoute = getCurrentRoute();

    const handleTabPress = (routeName: string) => {
        if (routeName === 'more') {
            setIsMoreMenuVisible(true);
        } else {
            if (routeName === 'index') {
                router.push('/');
            } else {
                router.push(`/(tabs)/${routeName}` as any);
            }
        }
    };

    const handleMoreMenuItemPress = (item: MoreMenuItem) => {
        setIsMoreMenuVisible(false);

        if (item.action) {
            item.action();
        } else if (item.route) {
            router.push(item.route as any);
        }
    };

    const handleLogout = () => {
        logout();
        router.replace('/auth/login');
    };

    const moreMenuItems: MoreMenuItem[] = []
    if (isLogin) {
        moreMenuItems.push(
            { key: 'profile', icon: 'person-outline', label: 'Profile', route: '/profile' },
            { key: 'favorites', icon: 'heart-outline', label: 'Favorites', route: '/favorites' },
            { key: 'bookmarks', icon: 'bookmark-outline', label: 'Bookmarks', route: '/bookmarks' },
            { key: 'notifications', icon: 'notifications-outline', label: 'Notifications', route: '/notifications' },
        )
    } else {
        moreMenuItems.push(
            { key: 'login', icon: 'log-in-outline', label: 'Login', route: '/auth/login' },
        )
    }

    const handleShare = () => {
        Share.share({
            title: 'Share App',
            url: 'https://play.google.com/store/apps/details?id=com.palcity',
        });
    };

    moreMenuItems.push(
        { key: 'settings', icon: 'settings-outline', label: 'Settings', route: '/settings' },
        { key: 'help', icon: 'help-circle-outline', label: 'Help & Support', route: '/settings/help' },
        { key: 'about', icon: 'information-circle-outline', label: 'About', route: '/settings/about' },
        { key: 'share', icon: 'share-social-outline', label: 'Share App', action: () => handleShare() }
    )

    if (isLogin) {
        moreMenuItems.push(
            { key: 'logout', icon: 'log-out-outline', label: 'Log Out', action: () => handleLogout() },
        )
    }

    return (
        <>
            <View
                style={[
                    styles.container,
                    {
                        paddingBottom: insets.bottom || 10,
                    },
                ]}
            >
                <View style={styles.tabBar}>
                    {mainRoutes.map((route) => (
                        <TabItem
                            key={route.key}
                            route={route}
                            isActive={activeRoute === route.name && !isMoreMenuVisible}
                            onPress={() => handleTabPress(route.name)}
                        />
                    ))}
                </View>
            </View>

            {/* More Menu Modal */}
            <Modal
                visible={isMoreMenuVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setIsMoreMenuVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    {/* Backdrop */}
                    <TouchableOpacity
                        style={styles.backdrop}
                        activeOpacity={1}
                        onPress={() => setIsMoreMenuVisible(false)}
                    />

                    {/* More Menu Content */}
                    <View style={[styles.moreMenuContainer, { paddingBottom: insets.bottom + 80 }]}>
                        <View style={styles.moreMenuHeader}>
                            <Text style={styles.moreMenuTitle}>More</Text>
                            <TouchableOpacity
                                onPress={() => setIsMoreMenuVisible(false)}
                                style={styles.closeButton}
                            >
                                <Ionicons name="close" size={28} color="#333" />
                            </TouchableOpacity>
                        </View>

                        <ScrollView
                            contentContainerStyle={styles.moreMenuGrid}
                            showsVerticalScrollIndicator={false}
                        >
                            {moreMenuItems.map((item) => (
                                <MenuItem
                                    key={item.key}
                                    item={item}
                                    onPress={() => handleMoreMenuItemPress(item)}
                                />
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </>
    );
}
