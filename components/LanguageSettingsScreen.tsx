import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { LanguageSelector } from '../components/LanguageSelector';
import { useTranslation } from '../hooks/useTranslation';

/**
 * Example screen demonstrating how to use translations in your app
 * This can be integrated into your Settings or More screen
 */
export const LanguageSettingsScreen: React.FC = () => {
    const { t, isRTL } = useTranslation();

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
        >
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>{t('settings.title')}</Text>
                <Text style={styles.headerSubtitle}>
                    {isRTL ? 'RTL Mode Active' : 'LTR Mode Active'}
                </Text>
            </View>

            {/* Language Selector */}
            <LanguageSelector />

            {/* Example Translations */}
            <View style={styles.exampleSection}>
                <Text style={styles.sectionTitle}>Example Translations:</Text>

                <View style={styles.exampleItem}>
                    <Text style={styles.exampleLabel}>Common:</Text>
                    <Text style={styles.exampleText}>{t('common.welcome')}</Text>
                </View>

                <View style={styles.exampleItem}>
                    <Text style={styles.exampleLabel}>Home:</Text>
                    <Text style={styles.exampleText}>{t('home.title')}</Text>
                </View>

                <View style={styles.exampleItem}>
                    <Text style={styles.exampleLabel}>Events:</Text>
                    <Text style={styles.exampleText}>{t('events.upcoming')}</Text>
                </View>

                <View style={styles.exampleItem}>
                    <Text style={styles.exampleLabel}>Pharmacies:</Text>
                    <Text style={styles.exampleText}>{t('pharmacies.openNow')}</Text>
                </View>
            </View>

            {/* Navigation Examples */}
            <View style={styles.exampleSection}>
                <Text style={styles.sectionTitle}>Navigation Tabs:</Text>
                <View style={styles.tabsExample}>
                    <Text style={styles.tabText}>{t('common.home')}</Text>
                    <Text style={styles.tabText}>{t('common.search')}</Text>
                    <Text style={styles.tabText}>{t('common.explore')}</Text>
                    <Text style={styles.tabText}>{t('common.more')}</Text>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        padding: 20,
    },
    header: {
        marginBottom: 24,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#666',
        fontStyle: 'italic',
    },
    exampleSection: {
        marginTop: 32,
        padding: 16,
        backgroundColor: '#f9f9f9',
        borderRadius: 12,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 16,
    },
    exampleItem: {
        flexDirection: 'row',
        marginBottom: 12,
        alignItems: 'center',
    },
    exampleLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
        width: 100,
    },
    exampleText: {
        fontSize: 16,
        color: '#333',
        flex: 1,
    },
    tabsExample: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 12,
        backgroundColor: '#fff',
        borderRadius: 8,
    },
    tabText: {
        fontSize: 14,
        color: '#FF6B35',
        fontWeight: '500',
    },
});
