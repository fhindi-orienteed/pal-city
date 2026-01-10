import AppName from '@/components/AppName';
import Copyright from '@/components/Copyright';
import Logo from '@/components/logo';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    Linking,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import styles from './styles';

export default function About() {
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
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
                <View style={styles.appInfoSection}>

                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => router.back()}
                    >
                        <IconSymbol name="chevron.left" size={28} color="#fff" />
                    </TouchableOpacity>

                    <Logo style={styles.appIcon} type="white" width={100} height={100} />

                    <AppName />
                </View>
            </View>

            <Text style={styles.appDescription}>
                {t('settings.appDescription')}
            </Text>


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

            <Text style={styles.appVersion}>Version 1.0.0</Text>
            <Copyright />
        </ScrollView >
    );
}
