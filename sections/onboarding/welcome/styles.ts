import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 80,
    },
    logoContainer: {
        alignItems: 'center',
    },
    appNameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        gap: 10,
    },
    appName: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#fff',
    },
    emoji: {
        fontSize: 30,
    },
    messageContainer: {
        marginTop: 48,
    },
    welcomeTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 12,
    },
    welcomeSubtitle: {
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
        lineHeight: 26,
        paddingHorizontal: 20,
    },
    featuresContainer: {
        gap: 20,
        marginTop: 20,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    featureIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    featureTextContainer: {
        flex: 1,
    },
    featureTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 6,
    },
    featureDescription: {
        fontSize: 14,
        color: '#fff',
        opacity: 0.85,
        lineHeight: 20,
    },
    footer: {
        paddingHorizontal: 24,
        paddingBottom: 40,
        gap: 16,
    },
    getStartedButton: {
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 18,
        paddingHorizontal: 32,
        gap: 12,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#009736',
    },
    skipButton: {
        alignItems: 'center',
        paddingVertical: 12,
    },
    skipText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
        opacity: 0.8,
    },
    logo: {
        width: 56,
        height: 56,
    },
});

export default styles;
