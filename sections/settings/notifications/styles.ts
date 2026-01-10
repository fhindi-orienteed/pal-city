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
    scrollView: {
        flex: 1,
    },
    section: {
        backgroundColor: '#fff',
        marginTop: 16,
        marginHorizontal: 16,
        borderRadius: 12,
        padding: 16,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#8E8E93',
        marginBottom: 16,
        textTransform: 'uppercase',
    },
    notificationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    lastItem: {
        borderBottomWidth: 0,
    },
    notificationInfo: {
        flex: 1,
        marginRight: 16,
    },
    notificationTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: Colors.light.text,
        marginBottom: 4,
    },
    notificationDescription: {
        fontSize: 14,
        color: '#8E8E93',
        lineHeight: 20,
    },
    infoSection: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#F8F8F8',
        marginHorizontal: 16,
        marginTop: 16,
        padding: 16,
        borderRadius: 12,
        gap: 12,
    },
    infoText: {
        flex: 1,
        fontSize: 14,
        color: '#8E8E93',
        lineHeight: 20,
    },
});

export default styles;