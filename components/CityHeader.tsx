import { useOnboarding } from '@/contexts/OnboardingContext';
import { useSelectedCity } from '@/hooks/use-selected-city';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export function CityHeader() {
    const selectedCity = useSelectedCity();
    const { resetOnboarding } = useOnboarding();
    const { i18n } = useTranslation();
    const router = useRouter();
    const isRTL = i18n.language === 'ar';

    const handleChangeCity = async () => {
        await resetOnboarding();
        router.replace('/onboarding/city-selection');
    };

    if (!selectedCity) return null;

    const cityName = isRTL ? selectedCity.nameAr : selectedCity.name;

    return (
        <View style={styles.container}>
            <View style={styles.locationInfo}>
                <Ionicons name="location" size={20} color="#009736" />
                <Text style={styles.cityName}>{cityName}</Text>
                <Text style={styles.emoji}>{selectedCity.icon || '🏙️'}</Text>
            </View>
            <TouchableOpacity onPress={handleChangeCity} style={styles.changeButton}>
                <Text style={styles.changeText}>
                    {isRTL ? 'تغيير' : 'Change'}
                </Text>
                <Ionicons name="chevron-down" size={16} color="#009736" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    locationInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    cityName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    emoji: {
        fontSize: 18,
    },
    changeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        backgroundColor: '#f0f9f4',
    },
    changeText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#009736',
    },
});
