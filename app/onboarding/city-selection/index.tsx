import { PALESTINIAN_CITIES, getPopularCities } from '@/constants/cities';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { City } from '@/types/interface';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function CitySelectionScreen() {
    const { t, i18n } = useTranslation();
    const router = useRouter();
    const { setSelectedCity, completeOnboarding } = useOnboarding();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCityId, setSelectedCityId] = useState<string | null>(null);
    const [showAllCities, setShowAllCities] = useState(false);

    const isRTL = i18n.language === 'ar';
    const popularCities = getPopularCities();

    const filteredCities = showAllCities
        ? PALESTINIAN_CITIES.filter(city =>
            searchQuery
                ? city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                city.nameAr.includes(searchQuery)
                : true
        )
        : popularCities;

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
                    <Text style={styles.emoji}>🇵🇸</Text>
                    <Text style={styles.title}>
                        {isRTL ? 'مرحباً بك في بال سيتي' : 'Welcome to Pal City'}
                    </Text>
                    <Text style={styles.subtitle}>
                        {isRTL
                            ? 'اختر مدينتك لنعرض لك المحتوى المناسب'
                            : 'Select your city to get personalized content'}
                    </Text>
                </View>
            </LinearGradient>

            <ScrollView
                style={styles.content}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <Ionicons
                        name="search"
                        size={20}
                        color="#666"
                        style={[styles.searchIcon, isRTL && styles.searchIconRTL]}
                    />
                    <TextInput
                        style={[styles.searchInput, isRTL && styles.searchInputRTL]}
                        placeholder={isRTL ? 'ابحث عن مدينة...' : 'Search for a city...'}
                        placeholderTextColor="#999"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        textAlign={isRTL ? 'right' : 'left'}
                    />
                </View>

                {/* Popular Cities Label */}
                {!showAllCities && (
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>
                            {isRTL ? '🌟 المدن الشائعة' : '🌟 Popular Cities'}
                        </Text>
                    </View>
                )}

                {/* Cities Grid */}
                <View style={styles.citiesGrid}>
                    {filteredCities.map(city => (
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
                                <Text
                                    style={[
                                        styles.cityRegion,
                                        selectedCityId === city.id && styles.cityRegionSelected,
                                    ]}
                                >
                                    {getRegionName(city)}
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

                {/* Show All Cities Button */}
                {!showAllCities && (
                    <TouchableOpacity
                        style={styles.showAllButton}
                        onPress={() => setShowAllCities(true)}
                    >
                        <Text style={styles.showAllText}>
                            {isRTL ? 'عرض جميع المدن' : 'Show All Cities'}
                        </Text>
                        <Ionicons
                            name={isRTL ? 'chevron-back' : 'chevron-forward'}
                            size={20}
                            color="#009736"
                        />
                    </TouchableOpacity>
                )}

                {/* Spacer for bottom button */}
                <View style={{ height: 100 }} />
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        paddingTop: 60,
        paddingBottom: 30,
        paddingHorizontal: 20,
    },
    headerContent: {
        alignItems: 'center',
    },
    emoji: {
        fontSize: 60,
        marginBottom: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#fff',
        opacity: 0.9,
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    content: {
        flex: 1,
    },
    contentContainer: {
        padding: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingHorizontal: 16,
        marginBottom: 24,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    searchIcon: {
        marginRight: 12,
    },
    searchIconRTL: {
        marginRight: 0,
        marginLeft: 12,
    },
    searchInput: {
        flex: 1,
        height: 50,
        fontSize: 16,
        color: '#333',
    },
    searchInputRTL: {
        textAlign: 'right',
    },
    sectionHeader: {
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#333',
    },
    citiesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -8,
    },
    cityCard: {
        width: (width - 56) / 2,
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        margin: 8,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    cityCardSelected: {
        borderColor: '#009736',
        backgroundColor: '#f0f9f4',
    },
    cityCardContent: {
        alignItems: 'center',
    },
    cityIcon: {
        fontSize: 40,
        marginBottom: 12,
    },
    cityName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
        textAlign: 'center',
    },
    cityNameSelected: {
        color: '#009736',
    },
    cityRegion: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },
    cityRegionSelected: {
        color: '#00b341',
    },
    checkmark: {
        position: 'absolute',
        top: 8,
        right: 8,
    },
    showAllButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginTop: 16,
        borderWidth: 1,
        borderColor: '#009736',
    },
    showAllText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#009736',
        marginRight: 8,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        backgroundColor: '#f8f9fa',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    continueButton: {
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },
    continueButtonDisabled: {
        elevation: 0,
        shadowOpacity: 0,
    },
    continueButtonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        paddingHorizontal: 32,
    },
    continueButtonText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#fff',
        marginRight: 12,
    },
});
