import { useOnboarding } from '@/contexts/OnboardingContext';
import { City } from '@/types/interface';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import appConfig from '@/config/appConfig';
import { useTranslation } from '@/hooks/useTranslation';
import CityList from './city-list';
import Header from './header';
import styles from './styles';

export default function CitySelectionScreen() {
    const { t, isRTL } = useTranslation();
    const router = useRouter();
    const { setSelectedCity: setOnboardingSelectedCity, completeOnboarding } = useOnboarding();
    const [selectedCity, setSelectedCity] = useState<City | null>(null);

    const popularCities = appConfig.countries['PS'].cities;

    const handleContinue = async () => {
        if (!selectedCity) return;

        await setOnboardingSelectedCity(selectedCity);
        await completeOnboarding();
        router.replace('/(tabs)');
    };

    return (
        <View style={styles.container}>
            <Header />

            <ScrollView
                style={styles.content}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >

                {/* Popular Cities Label */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>
                        🌟 {t('citySelectionScreen.popularCities')}
                    </Text>
                </View>

                <CityList onChange={setSelectedCity} selectedCity={selectedCity} />
            </ScrollView>

            {/* Continue Button */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={[
                        styles.continueButton,
                        !selectedCity && styles.continueButtonDisabled,
                    ]}
                    onPress={handleContinue}
                    disabled={!selectedCity}
                    activeOpacity={0.8}
                >
                    <LinearGradient
                        colors={
                            selectedCity
                                ? ['#009736', '#00b341']
                                : ['#cccccc', '#aaaaaa']
                        }
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.continueButtonGradient}
                    >
                        <Text style={styles.continueButtonText}>
                            {t('common.continue')}
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
