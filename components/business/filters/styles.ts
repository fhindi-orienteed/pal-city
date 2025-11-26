
import { Dimensions, StyleSheet } from 'react-native';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SHEET_HEIGHT = SCREEN_HEIGHT * 0.85;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    bottomSheet: {
        height: SHEET_HEIGHT,
        backgroundColor: '#FFF',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 5,
    },
    draggableArea: {
        // This area is draggable for swipe-down-to-close
    },
    handleBar: {
        width: 40,
        height: 4,
        backgroundColor: '#DDD',
        borderRadius: 2,
        alignSelf: 'center',
        marginTop: 12,
        marginBottom: 8,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1A1A1A',
    },
    closeButton: {
        padding: 4,
        borderColor: '#E0E0E0',
        borderWidth: 1,
        borderRadius: '50%',
    },
    content: {
        flex: 1,
    },
    section: {
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
        marginBottom: 0,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    accordionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },

    option: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 14,
        paddingHorizontal: 20,
    },
    optionActive: {
        backgroundColor: '#F0F9F4',
    },
    optionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    optionText: {
        fontSize: 16,
        color: '#333',
    },
    optionTextActive: {
        color: '#009736',
        fontWeight: '600',
    },
    accordionContent: {},
    accordionContentContainer: {
        marginTop: 8
    },
    accordionHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    accordionHeaderTitle: {
        fontSize: 14,
        fontWeight: '800',
        color: '#666',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    accordionHeaderValue: {
        fontSize: 14,
        fontWeight: 'normal',
        color: '#666',
    },
    categoryOptionsContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        paddingHorizontal: 10,
    },
    categoryOption: {
        flexDirection: 'row',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#F0F0F0',
    },
    accordionHeaderTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    applyButton: {
        backgroundColor: '#009736',
        padding: 12,
        borderRadius: 20,
        alignItems: 'center',
        marginHorizontal: 20,
    },
    applyButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFF',
    },
    resetButton: {
        backgroundColor: '#FFF',
        padding: 12,
        alignItems: 'center',
        marginBottom: 5,
    },
    resetButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#009736',
    },
});

export default styles;
