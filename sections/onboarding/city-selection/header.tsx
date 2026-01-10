import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Text, View } from 'react-native';

import styles from './styles';

export default function CitySelectionScreen() {
    const { t } = useTranslation();

    return (
        <LinearGradient
            colors={['#009736', '#00b341', '#009736']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.header}
        >
            <View style={styles.headerContent}>
                <Image source={require('@/assets/images/select-city.png')} style={styles.headerImage} />

                <Text style={styles.title}>
                    {t('citySelectionScreen.title')}
                </Text>
                <Text style={styles.subtitle}>
                    {t('citySelectionScreen.subtitle')}
                </Text>
            </View>
        </LinearGradient>
    );
}
