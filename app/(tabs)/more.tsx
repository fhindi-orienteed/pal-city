import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { StyleSheet } from 'react-native';

export default function MoreScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">More</ThemedText>
      <ThemedText>This is a placeholder screen for additional options.</ThemedText>
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
