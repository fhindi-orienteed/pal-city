import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    FlatList,
    TouchableOpacity,
    View
} from 'react-native';
import styles from './styles';

export default function Filters({ onChange }: { onChange: (types: string[]) => void }) {
    const { t } = useTranslation();

    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

    // Categories for quick filtering
    const group = [
        { key: 'all', icon: 'square.grid.2x2' },
        { key: 'place', icon: 'location-pin' },
        { key: 'business', icon: 'store' },
        { key: 'events', icon: 'calendar' },
        { key: 'offers', icon: 'local-offer' },
    ];

    const renderCategoryChip = ({ item }: { item: typeof group[0] }) => {
        const isSelected = item.key === 'all' ? selectedTypes.length === 0 : selectedTypes.includes(item.key);

        return (
            <TouchableOpacity
                style={[styles.categoryChip, isSelected && styles.categoryChipActive]}
                onPress={() => setSelectedTypes(prev => {
                    if (item.key === 'all') {
                        return [];
                    }
                    if (prev.includes(item.key)) {
                        return prev.filter(type => type !== item.key);
                    } else {
                        return [...prev, item.key];
                    }
                })}
            >
                <IconSymbol
                    name={item.icon as any}
                    size={18}
                    color={isSelected ? '#FFFFFF' : '#009736'}
                />
                <ThemedText style={[styles.categoryText, isSelected && styles.categoryTextActive]}>
                    {t('searchTypes.' + item.key)}
                </ThemedText>
            </TouchableOpacity>
        );
    };

    useEffect(() => {
        onChange(selectedTypes);
    }, [selectedTypes]);

    return (
        < View style={styles.categoriesSection} >
            <FlatList
                horizontal
                data={group}
                renderItem={renderCategoryChip}
                keyExtractor={item => item.key}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoriesList}
            />
        </View >
    );
}
