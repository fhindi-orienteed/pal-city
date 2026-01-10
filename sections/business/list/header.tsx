import FilterBottomSheet from '@/components/business/filters';
import BusinessSearchBox from '@/components/business/search-box';
import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { RatingOption, SortOption } from '@/types';
import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import styles from './styles';

export default function Header() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterVisible, setFilterVisible] = useState(false);
    // Filter states
    const [sortOption, setSortOption] = useState<SortOption>('rating');
    const [ratingFilter, setRatingFilter] = useState<RatingOption>('all');
    const [selectedCategory, setSelectedCategory] = useState<any[]>([]);
    const [selectedCity, setSelectedCity] = useState<any[]>([]);

    return (
        <>
            <View style={styles.header}>
                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <BusinessSearchBox
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                    />
                </View>

                <View style={styles.filterContainer}>
                    <TouchableOpacity onPress={() => setFilterVisible(true)} style={styles.filterButton}>
                        <IconSymbol name="filter" size={22} color="#009736" /><ThemedText>Filter</ThemedText>
                    </TouchableOpacity>
                </View>
            </View>
            {/* Filter Bottom Sheet */}
            <FilterBottomSheet
                visible={filterVisible}
                onClose={() => setFilterVisible(false)}
                selectedSort={sortOption}
                onSortChange={setSortOption}
                selectedRating={ratingFilter}
                onRatingChange={setRatingFilter}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                selectedCity={selectedCity}
                onCityChange={setSelectedCity}
            />
        </>
    );
}