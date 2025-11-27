import { ThemedText } from '@/components/themed-text';
import appConfig from '@/config/appConfig';
import { useTranslation } from 'react-i18next';
import {
    TouchableOpacity,
    View
} from 'react-native';
import Accordion from './accordion';
import styles from './styles';

interface Props {
    selectedCity: any[];
    onCityChange: (city: any[]) => void;
    expanded: boolean;
    toggleExpanded: () => void;
}

export default function CityFilter({ selectedCity, onCityChange, expanded, toggleExpanded }: Props) {

    const { t } = useTranslation();
    const cities = appConfig.countries['PS'].cities;

    const FilterOption = ({ city }: { city: any }) => <TouchableOpacity
        key={city.id}
        style={[
            styles.categoryOption,
            selectedCity.includes(city.key) && styles.optionActive,
        ]}
        onPress={() => onCityChange(selectedCity.includes(city.key) ? selectedCity.filter((c) => c !== city.key) : [...selectedCity, city.key])}
    >

        <View style={styles.optionLeft}>
            <ThemedText
                style={[
                    styles.optionText,
                    selectedCity.includes(city.key) && styles.optionTextActive,
                ]}
            >
                {t("cities." + city.key)}
            </ThemedText>
        </View>
    </TouchableOpacity>

    return (
        <Accordion
            section="city"
            expanded={expanded}
            toggleSection={toggleExpanded}
            value={selectedCity.map((city) => t("cities." + city))}
        >
            {expanded && (
                <View style={styles.categoryOptionsContainer}>
                    {cities.map((city) => (
                        <FilterOption key={city.id} city={city} />
                    ))}
                </View>
            )}
        </Accordion>
    );
}
