import { StyleSheet } from 'react-native';

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
        color: '#4CAA4A',
        fontSize: 14,
        fontWeight: '600',
    },
    scrollContent: {
        paddingHorizontal: 12,
        gap: 16,
    },
    card: {
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#f0f0f0',
        borderColor: '#4CAA4A',
        borderWidth: 1,
    },
    eventHeader: {
        overflow: 'hidden',
        position: 'relative',
    },
    image: {
        width: 280,
        height: 180,
    },
    placeholderImage: {
        backgroundColor: '#E8E8E8',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dateBadge: {
        backgroundColor: '#FFF',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        gap: 4,
    },
    dateText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#000',
    },
    favoriteButton: {
        position: 'absolute',
        top: 12,
        right: 12,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(255,255,255,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 10,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.3)',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    title: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    eventDetails: {
        padding: 8,
        backgroundColor: '#FFF',
    },
    location: {
        color: '#009736',
        fontSize: 12,
        fontWeight: '600',
        marginBottom: 4,
    },
    name: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    timeText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#000',
    }
});

export default styles;