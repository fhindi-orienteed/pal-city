
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
        gap: 8,
    },
    ratingContainer: {
        position: 'absolute',
        bottom: 20,
        start: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF8E1',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        gap: 4,
    },
    rating: {
        fontWeight: 'bold',
        color: '#B78103',
    },
    reviewCount: {
        fontSize: 12,
        color: '#B78103',
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
        backgroundColor: '#E8F5E9',
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
        width: '31%',
        height: 100,
        borderRadius: 12,
        marginBottom: 8,
    },
    businessNameContainer: {
        flex: 1
    },
    businessName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
    },
    businessAddress: {
        fontSize: 12,
        color: '#666',
    },
    businessLogo: {
        width: 60,
        height: 60,
        borderRadius: 5,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'black',
    },
    modalCloseButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 1,
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 20,
    },
    modalImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    navButton: {
        position: 'absolute',
        top: '50%',
        zIndex: 1,
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 20,
        transform: [{ translateY: -20 }],
    },
    navButtonLeft: {
        left: 20,
    },
    navButtonRight: {
        right: 20,
    },
    imageCounter: {
        position: 'absolute',
        bottom: 40,
        alignSelf: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    imageCounterText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default styles;