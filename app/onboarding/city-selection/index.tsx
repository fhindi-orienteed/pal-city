import { PALESTINIAN_CITIES, getPopularCities } from '@/constants/cities';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { City } from '@/types/interface';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import styles from './styles';

export default function CitySelectionScreen() {
    const { t, i18n } = useTranslation();
    const router = useRouter();
    const { setSelectedCity, completeOnboarding } = useOnboarding();
    const [selectedCityId, setSelectedCityId] = useState<string | null>(null);

    const isRTL = i18n.language === 'ar';
    const popularCities = getPopularCities();

    const handleCitySelect = (city: City) => {
        setSelectedCityId(city.id);
    };

    const handleContinue = async () => {
        if (!selectedCityId) return;

        const city = PALESTINIAN_CITIES.find(c => c.id === selectedCityId);
        if (city) {
            await setSelectedCity(city);
            await completeOnboarding();
            router.replace('/(tabs)');
        }
    };

    const getCityName = (city: City) => {
        return isRTL ? city.nameAr : city.name;
    };

    const getRegionName = (city: City) => {
        return isRTL ? city.regionAr : city.region;
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#009736', '#00b341', '#009736']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.header}
            >
                <View style={styles.headerContent}>
                    <Image source={require('@/assets/images/select-city.png')} style={styles.headerImage} />

                    <Text style={styles.title}>
                        {isRTL ? 'مرحباً بك في بال سيتي' : 'Where do you live?'}
                    </Text>
                    <Text style={styles.subtitle}>
                        {isRTL
                            ? 'اختر مدينتك لنعرض لك المحتوى المناسب'
                            : 'Select your city where you live so we can personalize your experience'}
                    </Text>
                </View>
            </LinearGradient>

            <ScrollView
                style={styles.content}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >

                {/* Popular Cities Label */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>
                        {isRTL ? '🌟 المدن الشائعة' : '🌟 Popular Cities'}
                    </Text>
                </View>


                {/* Cities Grid */}
                <View style={styles.citiesGrid}>
                    {popularCities.map(city => (
                        <TouchableOpacity
                            key={city.id}
                            style={[
                                styles.cityCard,
                                selectedCityId === city.id && styles.cityCardSelected,
                            ]}
                            onPress={() => handleCitySelect(city)}
                            activeOpacity={0.7}
                        >
                            <View style={styles.cityCardContent}>
                                <Text style={styles.cityIcon}>{city.icon || '🏙️'}</Text>
                                <Text
                                    style={[
                                        styles.cityName,
                                        selectedCityId === city.id && styles.cityNameSelected,
                                    ]}
                                >
                                    {getCityName(city)}
                                </Text>
                            </View>
                            {selectedCityId === city.id && (
                                <View style={styles.checkmark}>
                                    <Ionicons name="checkmark-circle" size={24} color="#009736" />
                                </View>
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            {/* Continue Button */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={[
                        styles.continueButton,
                        !selectedCityId && styles.continueButtonDisabled,
                    ]}
                    onPress={handleContinue}
                    disabled={!selectedCityId}
                    activeOpacity={0.8}
                >
                    <LinearGradient
                        colors={
                            selectedCityId
                                ? ['#009736', '#00b341']
                                : ['#cccccc', '#aaaaaa']
                        }
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.continueButtonGradient}
                    >
                        <Text style={styles.continueButtonText}>
                            {isRTL ? 'متابعة' : 'Continue'}
                        </Text>
                        <Ionicons
                            name={isRTL ? 'arrow-back' : 'arrow-forward'}
                            size={24}
                            color="#fff"
                        />
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    );
}
