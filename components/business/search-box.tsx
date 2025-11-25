import { IconSymbol } from '@/components/ui/icon-symbol';
import {
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';


export default function BusinessSearchBox({searchQuery, setSearchQuery}: {searchQuery: string, setSearchQuery: (query: string) => void}) {
  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  return (
    <View style={styles.container}>
        <IconSymbol name="magnifyingglass" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search businesses..."
          value={searchQuery}
          onChangeText={handleSearch}
          placeholderTextColor="#999"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => handleSearch('')}>
            <IconSymbol name="xmark.circle.fill" size={20} color="#999" />
          </TouchableOpacity>
        )}
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    margin: 16,
    paddingHorizontal: 16,    
    borderRadius: 12,
    gap: 12,
  },
  searchIcon: {
    marginRight: -4,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
});
