import { Colors } from '@/constants/theme';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        backgroundColor: '#4CAA4A',
    },
    placeholder: {
        width: 40,
    },
    scrollView: {
        flex: 1,
    },
    appInfoSection: {
        alignItems: 'center',
        paddingTop: 80,
        marginHorizontal: 16,
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 10,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    appIcon: {
        width: 80,
        height: 80,
        borderRadius: 20,
        backgroundColor: `${Colors.light.tint}15`,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    appName: {
        fontSize: 24,
        fontWeight: '700',
        color: Colors.light.text,
        marginBottom: 4,
    },
    appVersion: {
        fontSize: 14,
        color: '#FFFFFF',
    },
    appDescription: {
        backgroundColor: '#4CAA4A',
        fontSize: 14,
        color: '#FFFFFF',
        textAlign: 'center',
        paddingHorizontal: 45,
        paddingBottom: 16,
        lineHeight: 20,
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
    aboutItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    lastItem: {
        borderBottomWidth: 0,
    },
    aboutItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        gap: 12,
    },
    aboutItemInfo: {
        flex: 1,
    },
    aboutItemTitle: {
        fontSize: 14,
        color: '#8E8E93',
        marginBottom: 2,
    },
    aboutItemValue: {
        fontSize: 16,
        fontWeight: '500',
        color: Colors.light.text,
    },
    socialSection: {
        backgroundColor: '#fff',
        marginTop: 16,
        marginHorizontal: 16,
        borderRadius: 12,
        padding: 16,
    },
    socialButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
    },
    socialButton: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#F8F8F8',
        alignItems: 'center',
        justifyContent: 'center',
    },

});

export default styles;
