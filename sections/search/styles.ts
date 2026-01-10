
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    searchHeader: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 16,
        paddingTop: 60,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    searchInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 48,
        gap: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#1A1A1A',
    },
    clearSearchButton: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 20,
        padding: 2
    },
    categoriesSection: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    categoriesList: {
        paddingHorizontal: 16,
        gap: 8,
    },
    categoryChip: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 4,
        borderRadius: 10,
        backgroundColor: '#F0F9F4',
        borderWidth: 1,
        borderColor: '#009736',
        gap: 6,
    },
    categoryChipActive: {
        backgroundColor: '#009736',
        borderColor: '#009736',
    },
    categoryText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#009736',
    },
    categoryTextActive: {
        color: '#FFFFFF',
    },
    recentSearchesContainer: {
        backgroundColor: '#FFFFFF',
        margin: 16,
        borderRadius: 12,
        padding: 16,
    },
    recentSearchesHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    recentSearchesTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1A1A1A',
    },
    clearButton: {
        fontSize: 14,
        color: '#009736',
        fontWeight: '600',
    },
    recentSearchesList: {
        gap: 8,
    },
    recentSearchItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8,
    },
    recentSearchContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    recentSearchText: {
        fontSize: 15,
        color: '#1A1A1A',
    },
    removeButton: {
        padding: 4,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 32,
    },
    loadingText: {
        marginTop: 12,
        fontSize: 16,
        color: '#666',
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1A1A1A',
        marginTop: 16,
    },
    emptySubtitle: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginTop: 8,
    },
    resultsContainer: {
        flex: 1,
    },
    resultsCount: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    listContainer: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
});

export default styles;