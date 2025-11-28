import { Colors } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';
import { UserProfile } from '@/types/interface';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Alert,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function ProfileScreen() {
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

    const handleCancel = () => {
        setFormData({
            name: user?.name || '',
            email: user?.email || '',
            phoneNumber: user?.phoneNumber || '',
            dateOfBirth: user?.dateOfBirth || '',
            gender: (user?.gender as 'male' | 'female' | 'other') || '',
            city: user?.city || '',
            address: user?.address || '',
        });
        setErrors({});
    };

    const renderField = (
        label: string,
        value: string,
        key: keyof UserProfile,
        placeholder: string,
        editable: boolean = true,
        multiline: boolean = false
    ) => (
        <View style={styles.fieldContainer}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={[
                    styles.input,
                    !editable && styles.inputDisabled,
                    multiline && styles.inputMultiline,
                    errors[key] && styles.inputError,
                ]}
                value={value}
                onChangeText={(text) => setFormData({ ...formData, [key]: text })}
                placeholder={placeholder}
                editable={editable}
                multiline={multiline}
                numberOfLines={multiline ? 3 : 1}
            />
            {errors[key] && <Text style={styles.errorText}>{errors[key]}</Text>}
        </View>
    );

    const renderGenderPicker = () => (
        <View style={styles.fieldContainer}>
            <Text style={styles.label}>{t('profile.gender')}</Text>
            <View style={styles.genderContainer}>
                {['male', 'female', 'other'].map((gender) => (
                    <TouchableOpacity
                        key={gender}
                        style={[
                            styles.genderButton,
                            formData.gender === gender && styles.genderButtonActive,
                        ]}
                        onPress={() => setFormData({ ...formData, gender: gender as 'male' | 'female' | 'other' })}
                    >
                        <Text
                            style={[
                                styles.genderButtonText,
                                formData.gender === gender && styles.genderButtonTextActive,
                            ]}
                        >
                            {t(`profile.${gender}`)}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );

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

                    {renderField(
                        t('profile.name'),
                        formData.name,
                        'name',
                        t('profile.namePlaceholder')
                    )}

                    {renderField(
                        t('profile.email'),
                        formData.email,
                        'email',
                        t('profile.emailPlaceholder')
                    )}

                    {renderField(
                        t('profile.phoneNumber'),
                        formData.phoneNumber,
                        'phoneNumber',
                        '',
                        false
                    )}

                    {renderField(
                        t('profile.dateOfBirth'),
                        formData.dateOfBirth,
                        'dateOfBirth',
                        t('profile.dateOfBirthPlaceholder')
                    )}

                    {renderGenderPicker()}

                    {renderField(
                        t('profile.city'),
                        formData.city,
                        'city',
                        t('profile.cityPlaceholder')
                    )}

                    {renderField(
                        t('profile.address'),
                        formData.address,
                        'address',
                        t('profile.addressPlaceholder'),
                        true,
                        true
                    )}
                </View>

                {/* Action Buttons */}
                <View style={styles.actionButtons}>
                    <TouchableOpacity
                        style={[styles.button, styles.saveButton]}
                        onPress={handleSave}
                    >
                        <Text style={styles.saveButtonText}>{t('profile.update')}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
        paddingBottom: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: Colors.light.text,
    },
    editButton: {
        padding: 8,
    },
    scrollView: {
        flex: 1,
    },
    avatarContainer: {
        alignItems: 'center',
        paddingVertical: 32,
        marginBottom: 16,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#F0F0F0',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: Colors.light.tint,
    },
    changePhotoButton: {
        position: 'absolute',
        bottom: 32,
        right: '50%',
        marginRight: -70,
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: Colors.light.tint,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: '#fff',
    },
    section: {
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingVertical: 20,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.light.text,
        marginBottom: 20,
    },
    fieldContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#F8F8F8',
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        color: Colors.light.text,
        borderWidth: 1,
        borderColor: '#E5E5E5',
    },
    inputDisabled: {
        backgroundColor: '#F0F0F0',
        color: '#999',
    },
    inputMultiline: {
        minHeight: 80,
        textAlignVertical: 'top',
    },
    inputError: {
        borderColor: '#FF3B30',
    },
    errorText: {
        color: '#FF3B30',
        fontSize: 12,
        marginTop: 4,
    },
    genderContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    genderButton: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 12,
        backgroundColor: '#F8F8F8',
        borderWidth: 1,
        borderColor: '#E5E5E5',
        alignItems: 'center',
    },
    genderButtonActive: {
        backgroundColor: Colors.light.tint,
        borderColor: Colors.light.tint,
    },
    genderButtonDisabled: {
        opacity: 0.6,
    },
    genderButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
    },
    genderButtonTextActive: {
        color: '#fff',
    },
    actionButtons: {
        paddingHorizontal: 16,
    },
    button: {
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    saveButton: {
        backgroundColor: Colors.light.tint,
        marginBottom: 40
    },
    saveButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
});
