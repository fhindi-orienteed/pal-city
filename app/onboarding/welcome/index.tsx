import Logo from '@/components/logo';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';
import Features from './features';
import styles from './styles';


export default function WelcomeScreen() {
    const { t, i18n } = useTranslation();
    const router = useRouter();
    const isRTL = i18n.language === 'ar';

    const handleGetStarted = () => {
        router.push('/onboarding/city-selection');
    };

    return (
        <LinearGradient
            colors={['#009736', '#00b341', '#009736']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}
        >
            <View style={styles.content}>
                {/* Logo/Icon Section */}
                <View style={styles.logoContainer}>
                    <Logo type="white" />
                    <View style={styles.appNameContainer}>
                        <Text style={styles.emoji}>🇵🇸</Text>
                        <Text style={styles.appName}>PalCity</Text>
                    </View>
                </View>

                {/* Welcome Message */}
                <View style={styles.messageContainer}>
                    <Text style={styles.welcomeTitle}>{t('welcomeScreen.title')}</Text>
                    <Text style={styles.welcomeSubtitle}>{t('welcomeScreen.subtitle')}</Text>
                </View>

                <Features />
            </View>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.getStartedButton} onPress={handleGetStarted} activeOpacity={0.9}>
                    <View style={styles.buttonContent}>
                        <Text style={styles.buttonText}>{t('welcomeScreen.getStarted')}</Text>
                        <Ionicons name={isRTL ? 'arrow-back' : 'arrow-forward'} size={24} color="#009736" />
                    </View>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
}
