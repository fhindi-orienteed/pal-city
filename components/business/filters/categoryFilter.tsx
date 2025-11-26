import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import {
    TouchableOpacity,
    View
} from 'react-native';
import Accordion from './accordion';
import styles from './styles';
import { Section } from './types';

interface Props {
    categories: string[];
    selectedCategory: string[];
    onCategoryChange: (category: string[]) => void;
    expandedSections: { category: boolean };
    toggleSection: (section: Section) => void;
}

export default function CategoryFilter({ categories, selectedCategory, onCategoryChange, expandedSections, toggleSection }: Props) {
    return (
        <Accordion
            section="category"
            expanded={expandedSections.category}
            toggleSection={toggleSection}
            value={selectedCategory}
        >
            {expandedSections.category && (
                <View>
                    <TouchableOpacity
                        style={[
                            styles.option,
                            selectedCategory.length === 0 && styles.optionActive,
                        ]}
                        onPress={() => onCategoryChange([])}
                    >
                        <View style={styles.optionLeft}>
                            <IconSymbol
                                name="square.grid.2x2"
                                size={20}
                                color={selectedCategory.length === 0 ? '#009736' : '#666'}
                            />
                            <ThemedText
                                style={[
                                    styles.optionText,
                                    selectedCategory.length === 0 && styles.optionTextActive,
                                ]}
                            >
                                All Categories
                            </ThemedText>
                        </View>
                        {selectedCategory.length === 0 && (
                            <IconSymbol name="checkmark" size={20} color="#009736" />
                        )}
                    </TouchableOpacity>
                    {categories.map((category) => (
                        <TouchableOpacity
                            key={category}
                            style={[
                                styles.option,
                                selectedCategory.includes(category) && styles.optionActive,
                            ]}
                            onPress={() => onCategoryChange(selectedCategory.includes(category) ? selectedCategory.filter((c) => c !== category) : [...selectedCategory, category])}
                        >
                            <ThemedText
                                style={[
                                    styles.optionText,
                                    selectedCategory.includes(category) && styles.optionTextActive,
                                ]}
                            >
                                {category}
                            </ThemedText>
                            {selectedCategory.includes(category) && (
                                <IconSymbol name="checkmark" size={20} color="#009736" />
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </Accordion>
    );
}
