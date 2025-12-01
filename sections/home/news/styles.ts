
import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

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
    // Empty state styles
    emptyContainer: {
        height: 180,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    emptyText: {
        marginTop: 12,
        fontSize: 14,
        color: '#999',
    },
    scrollContent: {
        paddingHorizontal: 12,
        gap: 16,
    },
    card: {
        width: width * 0.8,
        height: 240,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#f0f0f0',
    },
    image: {
        width: '100%',
        height: 140,
    },
    placeholderImage: {
        backgroundColor: '#E8E8E8',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardContent: {
        paddingVertical: 8,
        backgroundColor: '#FFF',
        flex: 1,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
    },
    summary: {
        fontSize: 12,
        color: '#666',
        lineHeight: 16,
    },
    metaContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    authorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        flex: 1,
    },
    author: {
        fontSize: 10,
        color: '#999',
        flex: 1,
    },
    publishedDateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    publishedDate: {
        fontSize: 10,
        color: '#999',
    },
});
export default styles;