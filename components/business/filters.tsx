import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useEffect, useRef } from 'react';
import {
    Animated,
    Dimensions,
    Modal,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';

export type SortOption = 'rating' | 'name' | 'newest';
export type RatingFilter = 'all' | '4+' | '3+';

interface FilterSidebarProps {
    visible: boolean;
    onClose: () => void;
    selectedSort: SortOption;
    onSortChange: (sort: SortOption) => void;
    selectedRating: RatingFilter;
    onRatingChange: (rating: RatingFilter) => void;
    categories: string[];
    selectedCategory: string | null;
    onCategoryChange: (category: string | null) => void;
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const SIDEBAR_WIDTH = SCREEN_WIDTH * 0.8;

export default function FilterSidebar({
    visible,
    onClose,
    selectedSort,
    onSortChange,
    selectedRating,
    onRatingChange,
    categories,
    selectedCategory,
    onCategoryChange,
}: FilterSidebarProps) {
    const slideAnim = useRef(new Animated.Value(SIDEBAR_WIDTH)).current;

    useEffect(() => {
        if (visible) {
            Animated.spring(slideAnim, {
                toValue: 0,
                useNativeDriver: true,
                tension: 65,
                friction: 11,
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: SIDEBAR_WIDTH,
                duration: 250,
                useNativeDriver: true,
            }).start();
        }
    }, [visible, slideAnim]);

    const sortOptions: { value: SortOption; label: string; icon: string }[] = [
        { value: 'rating', label: 'Highest Rated', icon: 'star.fill' },
        { value: 'name', label: 'Name (A-Z)', icon: 'textformat.abc' },
        { value: 'newest', label: 'Newest First', icon: 'clock.fill' },
    ];

    const ratingOptions: { value: RatingFilter; label: string; icon: string }[] = [
        { value: 'all', label: 'All Ratings', icon: 'star' },
        { value: '4+', label: '4+ Stars', icon: 'star.fill' },
        { value: '3+', label: '3+ Stars', icon: 'star.leadinghalf.filled' },
    ];

    return (
        <Modal
            visible={visible}
            transparent
            animationType="none"
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                {/* Backdrop */}
                <TouchableOpacity
                    style={styles.backdrop}
                    activeOpacity={1}
                    onPress={onClose}
                />

                {/* Sidebar */}
                <Animated.View
                    style={[
                        styles.sidebar,
                        {
                            transform: [{ translateX: slideAnim }],
                        },
                    ]}
                >
                    {/* Header */}
                    <View style={styles.header}>
                        <ThemedText style={styles.headerTitle}>Filters</ThemedText>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <IconSymbol name="xmark" size={24} color="#333" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                        {/* Sort By Section */}
                        <View style={styles.section}>
                            <ThemedText style={styles.sectionTitle}>Sort By</ThemedText>
                            {sortOptions.map((option) => (
                                <TouchableOpacity
                                    key={option.value}
                                    style={[
                                        styles.option,
                                        selectedSort === option.value && styles.optionActive,
                                    ]}
                                    onPress={() => onSortChange(option.value)}
                                >
                                    <View style={styles.optionLeft}>
                                        <IconSymbol
                                            name={option.icon as any}
                                            size={20}
                                            color={selectedSort === option.value ? '#009736' : '#666'}
                                        />
                                        <ThemedText
                                            style={[
                                                styles.optionText,
                                                selectedSort === option.value && styles.optionTextActive,
                                            ]}
                                        >
                                            {option.label}
                                        </ThemedText>
                                    </View>
                                    {selectedSort === option.value && (
                                        <IconSymbol name="checkmark" size={20} color="#009736" />
                                    )}
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Rating Filter Section */}
                        <View style={styles.section}>
                            <ThemedText style={styles.sectionTitle}>Rating</ThemedText>
                            {ratingOptions.map((option) => (
                                <TouchableOpacity
                                    key={option.value}
                                    style={[
                                        styles.option,
                                        selectedRating === option.value && styles.optionActive,
                                    ]}
                                    onPress={() => onRatingChange(option.value)}
                                >
                                    <View style={styles.optionLeft}>
                                        <IconSymbol
                                            name={option.icon as any}
                                            size={20}
                                            color={selectedRating === option.value ? '#009736' : '#666'}
                                        />
                                        <ThemedText
                                            style={[
                                                styles.optionText,
                                                selectedRating === option.value && styles.optionTextActive,
                                            ]}
                                        >
                                            {option.label}
                                        </ThemedText>
                                    </View>
                                    {selectedRating === option.value && (
                                        <IconSymbol name="checkmark" size={20} color="#009736" />
                                    )}
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Category Filter Section */}
                        {categories.length > 0 && (
                            <View style={styles.section}>
                                <ThemedText style={styles.sectionTitle}>Category</ThemedText>
                                <TouchableOpacity
                                    style={[
                                        styles.option,
                                        selectedCategory === null && styles.optionActive,
                                    ]}
                                    onPress={() => onCategoryChange(null)}
                                >
                                    <View style={styles.optionLeft}>
                                        <IconSymbol
                                            name="square.grid.2x2"
                                            size={20}
                                            color={selectedCategory === null ? '#009736' : '#666'}
                                        />
                                        <ThemedText
                                            style={[
                                                styles.optionText,
                                                selectedCategory === null && styles.optionTextActive,
                                            ]}
                                        >
                                            All Categories
                                        </ThemedText>
                                    </View>
                                    {selectedCategory === null && (
                                        <IconSymbol name="checkmark" size={20} color="#009736" />
                                    )}
                                </TouchableOpacity>
                                {categories.map((category) => (
                                    <TouchableOpacity
                                        key={category}
                                        style={[
                                            styles.option,
                                            selectedCategory === category && styles.optionActive,
                                        ]}
                                        onPress={() => onCategoryChange(category)}
                                    >
                                        <ThemedText
                                            style={[
                                                styles.optionText,
                                                selectedCategory === category && styles.optionTextActive,
                                            ]}
                                        >
                                            {category}
                                        </ThemedText>
                                        {selectedCategory === category && (
                                            <IconSymbol name="checkmark" size={20} color="#009736" />
                                        )}
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </ScrollView>
                </Animated.View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    sidebar: {
        width: SIDEBAR_WIDTH,
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOffset: { width: -2, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 5,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
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
    },
    content: {
        flex: 1,
    },
    section: {
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
        paddingHorizontal: 20,
        marginBottom: 12,
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
});
