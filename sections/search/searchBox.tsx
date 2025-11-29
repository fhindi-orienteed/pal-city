import { IconSymbol } from '@/components/ui/icon-symbol';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TextInput, TouchableOpacity, View } from 'react-native';
import styles from './styles';

export default function SearchBox({ onChange }: { onChange: (query: string) => void }) {
    const { t } = useTranslation();
    const [searchQuery, setSearchQuery] = useState('');


    useEffect(() => {
        onChange(searchQuery);
    }, [searchQuery]);


    return (
        <View style={styles.searchHeader}>
            <View style={styles.searchInputContainer}>
                <IconSymbol name="magnifyingglass" size={20} color="#999" />
                <TextInput
                    style={styles.searchInput}
                    placeholder={t('search.placeholder')}
                    placeholderTextColor="#999"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    onSubmitEditing={() => onChange(searchQuery)}
                    returnKeyType="search"
                />
                {searchQuery.length > 0 && (
                    <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearSearchButton}>
                        <IconSymbol name="xmark" size={20} color="#999" />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}
