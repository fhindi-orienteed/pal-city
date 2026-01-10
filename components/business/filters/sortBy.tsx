import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import {
    TouchableOpacity,
    View
} from 'react-native';
import Accordion from './accordion';
import { sortOptions } from './config';
import styles from './styles';
import { SortOption } from './types';

interface Props {
    selectedSort: SortOption;
    onSortChange: (sort: SortOption) => void;
    expanded: boolean;
    toggleExpanded: () => void;
}

export default function SortBy({ selectedSort, onSortChange, expanded, toggleExpanded }: Props) {
    const selecteValueTitle = sortOptions.find((option) => option.value === selectedSort)?.label || '';
    return (
        <Accordion section="sortBy" expanded={expanded} toggleSection={toggleExpanded} value={selecteValueTitle}>
            <View style={styles.accordionContent}>
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
        </Accordion>
    );
}
