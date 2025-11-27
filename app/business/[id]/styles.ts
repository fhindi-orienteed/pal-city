
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    header: {
        height: 250,
        width: '100%',
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    favoriteButton: {
        position: 'absolute',
        top: 50,
        right: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleContainer: {
        gap: 8,
        marginBottom: 24,
    },
    titleHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 16,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF8E1',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        gap: 4,
        width: 60,
    },
    rating: {
        fontWeight: 'bold',
        color: '#B78103',
    },
    reviewCount: {
        fontSize: 12,
        color: '#B78103',
    },
    categoryBadge: {
        position: 'absolute',
        bottom: 20,
        start: 20,
        fontSize: 16,
        color: '#fff',
        backgroundColor: '#009736',
        paddingHorizontal: 12,
        paddingVertical: 2,
        borderRadius: 12,
    },
    actionButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
        paddingHorizontal: 8,
    },
    actionButton: {
        alignItems: 'center',
        gap: 8,
    },
    actionIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#FFF0EB',
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionLabel: {
        fontSize: 12,
        color: '#666',
    },
    section: {
        marginBottom: 24,
        gap: 12,
    },
    sectionTitle: {
        marginBottom: 8,
    },
    description: {
        lineHeight: 24,
        color: '#444',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    infoText: {
        flex: 1,
        color: '#444',
    },
    photosGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    photo: {
        width: '48%',
        height: 150,
        borderRadius: 12,
        marginBottom: 8,
    },
    businessName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
    },
});

export default styles;