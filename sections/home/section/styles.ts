
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        paddingVertical: 16,
    },
    centerContent: {
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 200,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    viewAll: {
        color: '#009736',
        fontSize: 14,
        fontWeight: '600',
    },
    // Error state styles
    errorContainer: {
        height: 180,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    errorText: {
        marginTop: 12,
        fontSize: 16,
        fontWeight: '600',
        color: '#4CAA4A',
        textAlign: 'center',
    },
    errorDetail: {
        marginTop: 4,
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },
    scrollContent: {
        paddingHorizontal: 12,
        gap: 16,
    },
});

export default styles;
