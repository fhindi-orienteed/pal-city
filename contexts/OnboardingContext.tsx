import { City } from '@/types/interface';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface OnboardingContextType {
    hasCompletedOnboarding: boolean;
    selectedCity: City | null;
    setSelectedCity: (city: City) => void;
    completeOnboarding: () => Promise<void>;
    resetOnboarding: () => Promise<void>;
    isLoading: boolean;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

const ONBOARDING_KEY = '@pal_city_onboarding_completed';
const SELECTED_CITY_KEY = '@pal_city_selected_city';

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
    const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
    const [selectedCity, setSelectedCityState] = useState<City | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadOnboardingState();
    }, []);

    const loadOnboardingState = async () => {
        try {
            const [onboardingStatus, cityData] = await Promise.all([
                AsyncStorage.getItem(ONBOARDING_KEY),
                AsyncStorage.getItem(SELECTED_CITY_KEY),
            ]);

            setHasCompletedOnboarding(onboardingStatus === 'true');

            if (cityData) {
                setSelectedCityState(JSON.parse(cityData));
            }
        } catch (error) {
            console.error('Error loading onboarding state:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const setSelectedCity = async (city: City) => {
        try {
            await AsyncStorage.setItem(SELECTED_CITY_KEY, JSON.stringify(city));
            setSelectedCityState(city);
        } catch (error) {
            console.error('Error saving selected city:', error);
        }
    };

    const completeOnboarding = async () => {
        try {
            await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
            setHasCompletedOnboarding(true);
        } catch (error) {
            console.error('Error completing onboarding:', error);
        }
    };

    const resetOnboarding = async () => {
        try {
            await Promise.all([
                AsyncStorage.removeItem(ONBOARDING_KEY),
                AsyncStorage.removeItem(SELECTED_CITY_KEY),
            ]);
            setHasCompletedOnboarding(false);
            setSelectedCityState(null);
        } catch (error) {
            console.error('Error resetting onboarding:', error);
        }
    };

    return (
        <OnboardingContext.Provider
            value={{
                hasCompletedOnboarding,
                selectedCity,
                setSelectedCity,
                completeOnboarding,
                resetOnboarding,
                isLoading,
            }}
        >
            {children}
        </OnboardingContext.Provider>
    );
}

export function useOnboarding() {
    const context = useContext(OnboardingContext);
    if (context === undefined) {
        throw new Error('useOnboarding must be used within an OnboardingProvider');
    }
    return context;
}
