import { Dimensions, Platform, StyleSheet } from "react-native";

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E5E5EA',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: -2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
            },
            android: {
                elevation: 8,
            },
        }),
    },
    tabBar: {
        flexDirection: 'row',
        paddingTop: 8,
        paddingHorizontal: 8,
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
    },
    tabContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 12,
        minWidth: 60,
    },
    tabLabel: {
        fontSize: 11,
        fontWeight: '600',
        marginTop: 4,
        textAlign: 'center',
    },
    // More Menu Styles
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    moreMenuContainer: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: height * 0.7,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: -4 },
                shadowOpacity: 0.15,
                shadowRadius: 12,
            },
            android: {
                elevation: 16,
            },
        }),
    },
    moreMenuHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    moreMenuTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    closeButton: {
        padding: 4,
    },
    moreMenuGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 16,
    },
    moreMenuItem: {
        width: (width - 64) / 4, // 3 columns with padding
        alignItems: 'center',
        marginBottom: 24,
        paddingHorizontal: 0,
    },
    moreMenuIconContainer: {
        width: 60,
        height: 60,
        borderRadius: 10,
        backgroundColor: '#F0F9F4',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    moreMenuLabel: {
        fontSize: 12,
        fontWeight: '500',
        color: '#333',
        textAlign: 'center',
    },
});

export default styles;
