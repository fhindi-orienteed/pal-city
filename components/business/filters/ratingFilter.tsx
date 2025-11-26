import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import {
    TouchableOpacity,
    View
} from 'react-native';
import Accordion from './accordion';
import { ratingOptions } from './config';
import styles from './styles';
import { RatingOption, Section } from './types';

interface Props {
    selectedRating: RatingOption;
    onRatingChange: (rating: RatingOption) => void;
    expandedSections: { rating: boolean };
    toggleSection: (section: Section) => void;
}


export default function RatingFilter({ selectedRating, onRatingChange, expandedSections, toggleSection }: Props) {
    return (
        <Accordion
            section="rating"
            expanded={expandedSections.rating}
            toggleSection={toggleSection}
            value={selectedRating}
        >
            <View style={styles.accordionContent}>
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
        </Accordion>
    );
}
