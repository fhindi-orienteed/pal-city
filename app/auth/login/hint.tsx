import { useTranslation } from '@/hooks/useTranslation';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

export default function LoginHint() {
    const { t } = useTranslation();

    return (
        <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
                <Ionicons name="shield-checkmark" size={20} color="#009736" />
                <Text style={styles.infoText}>{t('auth.secureLogin')}</Text>
            </View>
            <View style={styles.infoItem}>
                <Ionicons name="time-outline" size={20} color="#009736" />
                <Text style={styles.infoText}>{t('auth.quickAccess')}</Text>
            </View>
        </View>
    );
}
