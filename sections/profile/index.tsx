import { Colors } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';
import { UserProfile } from '@/types/interface';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Alert,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Field from './Filed';
import GenderPicker from './GenderPicker';
import styles from './styles';

export default function Profile() {
    const { t } = useTranslation();
    const router = useRouter();
    const { user, updateUser } = useAuth();

    const [formData, setFormData] = useState<UserProfile>({
        name: user?.name || '',
        email: user?.email || '',
        phoneNumber: user?.phoneNumber || '',
        dateOfBirth: user?.dateOfBirth || '',
        gender: (user?.gender as 'male' | 'female' | 'other') || '',
        city: user?.city || '',
        address: user?.address || '',
    });

    const [errors, setErrors] = useState<Partial<Record<keyof UserProfile, string>>>({});

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof UserProfile, string>> = {};

        if (formData.email && !validateEmail(formData.email)) {
            newErrors.email = t('profile.invalidEmail');
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (!validateForm()) {
            return;
        }

        updateUser({
            name: formData.name,
            email: formData.email,
            dateOfBirth: formData.dateOfBirth,
            gender: formData.gender || undefined,
            city: formData.city,
            address: formData.address,
        });

        Alert.alert(t('common.save'), t('profile.updateSuccess'));
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={Colors.light.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{t('profile.title')}</Text>
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Profile Avatar */}
                <View style={styles.avatarContainer}>
                    <View style={styles.avatar}>
                        <Ionicons name="person" size={60} color={Colors.light.tint} />
                    </View>
                </View>

                {/* Personal Information Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{t('profile.personalInfo')}</Text>

                    <Field
                        label={t('profile.name')}
                        value={formData.name}
                        editable
                        multiline={false}
                        error={errors['name']}
                        placeholder={t('profile.namePlaceholder')}
                        onChange={(text) => setFormData({ ...formData, ['name']: text })}
                    />

                    <Field
                        label={t('profile.email')}
                        value={formData.email}
                        editable
                        multiline={false}
                        error={errors['email']}
                        key="email"
                        placeholder={t('profile.emailPlaceholder')}
                        onChange={(text) => setFormData({ ...formData, ['email']: text })}
                    />

                    <Field
                        label={t('profile.phoneNumber')}
                        value={formData.phoneNumber}
                        editable
                        multiline={false}
                        error={errors['phoneNumber']}
                        placeholder={t('profile.phoneNumberPlaceholder')}
                        onChange={(text) => setFormData({ ...formData, ['phoneNumber']: text })}
                    />

                    <Field
                        label={t('profile.dateOfBirth')}
                        value={formData.dateOfBirth}
                        editable
                        multiline={false}
                        error={errors['dateOfBirth']}
                        placeholder={t('profile.dateOfBirthPlaceholder')}
                        onChange={(text) => setFormData({ ...formData, ['dateOfBirth']: text })}
                    />

                    <GenderPicker onChange={(text) => setFormData({ ...formData, ['gender']: text })} />

                    <Field
                        label={t('profile.city')}
                        value={formData.city}
                        editable
                        multiline={false}
                        error={errors['city']}
                        placeholder={t('profile.cityPlaceholder')}
                        onChange={(text) => setFormData({ ...formData, ['city']: text })}
                    />

                    <Field
                        label={t('profile.address')}
                        value={formData.address}
                        editable
                        multiline={false}
                        error={errors['address']}
                        placeholder={t('profile.addressPlaceholder')}
                        onChange={(text) => setFormData({ ...formData, ['address']: text })}
                    />

                    <View style={styles.actionButtons}>
                        <TouchableOpacity
                            style={[styles.button, styles.saveButton]}
                            onPress={handleSave}
                        >
                            <Text style={styles.saveButtonText}>{t('profile.update')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>


            </ScrollView>
        </View>
    );
}

