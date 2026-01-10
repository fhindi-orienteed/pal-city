import { useOnboarding } from '@/contexts/OnboardingContext';

export function useSelectedCity() {
    const { selectedCity } = useOnboarding();
    return selectedCity;
}
