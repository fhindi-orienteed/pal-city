import { Colors } from '@/constants/theme';
import { Platform, StyleSheet } from 'react-native';

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
        paddingHorizontal: 16,
    },
    avatarContainer: {
        alignItems: 'center',
        paddingVertical: 32,

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
        marginBottom: 32,
        borderRadius: 10,
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
        paddingHorizontal: 16,
        paddingVertical: 8,
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

    },
    button: {
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    saveButton: {
        backgroundColor: Colors.light.tint,
    },
    saveButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
});

export default styles;