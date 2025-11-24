import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { StyleSheet } from 'react-native';

export default function SearchScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Search</ThemedText>
      <ThemedText>This is a placeholder search screen.</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
});
