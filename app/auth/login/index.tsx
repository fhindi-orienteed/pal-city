import { useAuth } from '@/contexts/AuthContext';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';

import { IS_GUEST_KEY } from '@/constants/localStorageKey';
import { useTranslation } from '@/hooks/useTranslation';
import { AuthService } from '@/services/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginHint from './hint';
import styles from './styles';

export default function LoginScreen() {
    const { t, isRTL } = useTranslation();
    const router = useRouter();
    const { completeOnboarding } = useOnboarding();
    const { loginWithOTP } = useAuth();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSendOTP = async () => {
        if (phoneNumber.length < 9) {
            Alert.alert(t('auth.error'), t('auth.invalidPhone'));
            return;
        }

        setIsLoading(true);
        try {
            const fullPhoneNumber = `+970${phoneNumber}`;
            await AuthService.requestOTP({ mobile: fullPhoneNumber });
            setIsOtpSent(true);
            Alert.alert(t('auth.success'), t('auth.otpSent'));
        } catch (error: any) {
            Alert.alert(t('auth.error'), error.message || t('auth.otpFailed'));
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOTP = async () => {
        if (otp.length !== 4) {
            Alert.alert(t('auth.error'), t('auth.invalidOtp'));
            return;
        }

        setIsLoading(true);
        try {
            const fullPhoneNumber = `+970${phoneNumber}`;
            await loginWithOTP(fullPhoneNumber, otp);
            await completeOnboarding();
            router.replace('/(tabs)');
        } catch (error: any) {
            Alert.alert(t('auth.error'), error.message || t('auth.verificationFailed'));
        } finally {
            setIsLoading(false);
        }
    };


    const handleSkip = async () => {
        await AsyncStorage.setItem(IS_GUEST_KEY, 'true');
        await completeOnboarding();
        router.replace('/(tabs)');
    };

    const handleBack = () => {
        if (isOtpSent) {
            setIsOtpSent(false);
            setOtp('');
        } else {
            router.back();
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={handleBack}
                            activeOpacity={0.7}
                        >
                            <Ionicons
                                name={isRTL ? 'arrow-forward' : 'arrow-back'}
                                size={24}
                                color="#333"
                            />
                        </TouchableOpacity>
                    </View>

                    <ScrollView
                        style={styles.content}
                        contentContainerStyle={styles.contentContainer}
                        showsVerticalScrollIndicator={false}
                    >
                        {/* Title Section */}
                        <View style={styles.titleContainer}>
                            <View style={styles.iconContainer}>
                                <LinearGradient
                                    colors={['#009736', '#00b341']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={styles.iconGradient}
                                >
                                    <Ionicons name="phone-portrait-outline" size={40} color="#fff" />
                                </LinearGradient>
                            </View>
                            <Text style={styles.title}>
                                {isOtpSent ? t('auth.verifyOtp') : t('auth.loginOrRegister')}
                            </Text>
                            <Text style={styles.subtitle}>
                                {isOtpSent ? t('auth.otpSubtitle') : t('auth.phoneSubtitle')}
                            </Text>
                        </View>

                        {/* Form Section */}
                        <View style={styles.formContainer}>
                            {!isOtpSent ? (
                                <View style={styles.inputContainer}>
                                    <Text style={styles.label}>{t('auth.phoneNumber')}</Text>
                                    <View style={styles.phoneInputWrapper}>
                                        <View style={styles.countryCode}>
                                            <Text style={styles.countryCodeText}>🇵🇸 +970</Text>
                                        </View>
                                        <TextInput
                                            style={styles.phoneInput}
                                            placeholder={t('auth.phonePlaceholder')}
                                            placeholderTextColor="#999"
                                            value={phoneNumber}
                                            onChangeText={setPhoneNumber}
                                            keyboardType="phone-pad"
                                            maxLength={9}
                                            textAlign={isRTL ? 'right' : 'left'}
                                        />
                                    </View>
                                    <Text style={styles.hint}>{t('auth.phoneHint')}</Text>
                                </View>
                            ) : (
                                <View style={styles.inputContainer}>
                                    <Text style={styles.label}>{t('auth.otpCode')}</Text>
                                    <TextInput
                                        style={styles.otpInput}
                                        placeholder="0000"
                                        placeholderTextColor="#999"
                                        value={otp}
                                        onChangeText={setOtp}
                                        keyboardType="number-pad"
                                        maxLength={4}
                                        textAlign="center"
                                    />
                                </View>
                            )}

                            <TouchableOpacity
                                style={[
                                    styles.continueButton,
                                    ((!isOtpSent && phoneNumber.length < 9) ||
                                        (isOtpSent && otp.length !== 4) ||
                                        isLoading) &&
                                    styles.continueButtonDisabled,
                                ]}
                                onPress={isOtpSent ? handleVerifyOTP : handleSendOTP}
                                disabled={
                                    (!isOtpSent && phoneNumber.length < 9) ||
                                    (isOtpSent && otp.length !== 4) ||
                                    isLoading
                                }
                                activeOpacity={0.8}
                            >
                                <LinearGradient
                                    colors={
                                        (!isOtpSent && phoneNumber.length >= 9) ||
                                            (isOtpSent && otp.length === 4)
                                            ? ['#009736', '#00b341']
                                            : ['#cccccc', '#aaaaaa']
                                    }
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles.continueButtonGradient}
                                >
                                    <Text style={styles.continueButtonText}>
                                        {isLoading
                                            ? t('common.loading')
                                            : isOtpSent
                                                ? t('auth.verify')
                                                : t('auth.sendOtp')}
                                    </Text>
                                    {!isLoading && (
                                        <Ionicons
                                            name={isRTL ? 'arrow-back' : 'arrow-forward'}
                                            size={24}
                                            color="#fff"
                                        />
                                    )}
                                </LinearGradient>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.skipButton}
                                onPress={handleSkip}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.skipButtonText}>{t('auth.continueAsGuest')}</Text>
                            </TouchableOpacity>
                        </View>

                        <LoginHint />
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
