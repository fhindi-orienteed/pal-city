import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import FeatureItem from './featureItem';
import styles from './styles';

export default function Features() {
    const { t } = useTranslation();

    return (
        <View style={styles.featuresContainer}>
            <FeatureItem
                icon="location"
                title={t('welcomeScreen.features.feature_1.title')}
                description={t('welcomeScreen.features.feature_1.description')}
            />
            <FeatureItem
                icon="calendar"
                title={t('welcomeScreen.features.feature_2.title')}
                description={t('welcomeScreen.features.feature_2.description')}
            />
            <FeatureItem
                icon="business"
                title={t('welcomeScreen.features.feature_3.title')}
                description={t('welcomeScreen.features.feature_3.description')}
            />
        </View>
    );
}

