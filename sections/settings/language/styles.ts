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
    placeholder: {
        width: 40,
    },
    content: {
        flex: 1,
        paddingTop: 16,
    },
    section: {
        flexDirection: 'column',
        paddingHorizontal: 16,
        gap: 16,
    },
    languageItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: '#FFFFFF',
    },
    languageItemActive: {
        borderColor: '#4CAA4A',
    },
    languageInfo: {
        flexDirection: 'column',
        gap: 0,
    },
    languageName: {
        fontSize: 16,
        fontWeight: '500',
        color: Colors.light.text,
    },
    languageNativeName: {
        fontSize: 14,
        color: '#8E8E93',
    },
});

export default styles;