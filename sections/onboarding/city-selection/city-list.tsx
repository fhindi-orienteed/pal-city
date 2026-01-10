import { City } from '@/types/interface';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import appConfig from '@/config/appConfig';
import { useTranslation } from '@/hooks/useTranslation';
import styles from './styles';

export default function CityList({ onChange, selectedCity }: { onChange: (city: City) => void, selectedCity: City | null }) {
    const { t, isRTL } = useTranslation();
    const popularCities = appConfig.countries['PS'].cities;

    return (
        <View style={styles.citiesGrid}>
            {popularCities.map(city => (
                <TouchableOpacity
                    key={city.id}
                    style={[
                        styles.cityCard,
                        selectedCity?.key === city.key && styles.cityCardSelected,
                    ]}
                    onPress={() => onChange(city)}
                    activeOpacity={0.7}
                >
                    <View style={styles.cityCardContent}>
                        <Text
                            style={[
                                styles.cityName,
                                selectedCity?.key === city.key && styles.cityNameSelected,
                            ]}
                        >
                            {t('cities.' + city.key)}
                        </Text>
                    </View>
                    {selectedCity?.key === city.key && (
                        <View style={styles.checkmark}>
                            <Ionicons name="checkmark-circle" size={24} color="#009736" />
                        </View>
                    )}
                </TouchableOpacity>
            ))}
        </View>
    );
}
