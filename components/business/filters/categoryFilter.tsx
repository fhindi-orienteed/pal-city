import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import appConfig from '@/config/appConfig';
import { useTranslation } from 'react-i18next';
import {
    TouchableOpacity,
    View
} from 'react-native';
import Accordion from './accordion';
import styles from './styles';

interface Props {
    selectedCategory: any[];
    onCategoryChange: (category: any[]) => void;
    expanded: boolean;
    toggleExpanded: () => void;
}

export default function CategoryFilter({ selectedCategory, onCategoryChange, expanded, toggleExpanded }: Props) {

    const { t } = useTranslation();

    const FilterOption = ({ category }: { category: any }) => <TouchableOpacity
        key={category.id}
        style={[
            styles.categoryOption,
            selectedCategory.includes(category.key) && styles.optionActive,
        ]}
        onPress={() => onCategoryChange(selectedCategory.includes(category.key) ? selectedCategory.filter((c) => c !== category.key) : [...selectedCategory, category.key])}
    >

        <View style={styles.optionLeft}>
            <IconSymbol
                name={category.icon}
                size={20}
                color={selectedCategory.includes(category.key) ? '#009736' : '#666'}
            />
            <ThemedText
                style={[
                    styles.optionText,
                    selectedCategory.includes(category.key) && styles.optionTextActive,
                ]}
            >
                {t("categories." + category.key)}
            </ThemedText>
        </View>
    </TouchableOpacity>

    return (
        <Accordion
            section="category"
            expanded={expanded}
            toggleSection={toggleExpanded}
            value={selectedCategory.map((category) => t("categories." + category))}
        >
            {expanded && (
                <View style={styles.categoryOptionsContainer}>
                    {appConfig.businessCategories.map((category) => (
                        <FilterOption key={category.id} category={category} />
                    ))}
                </View>
            )}
        </Accordion>
    );
}
