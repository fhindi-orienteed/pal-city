import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Business } from '@/services/businessService';
import styles from './styles';

export default function About({ business }: { business: Business }) {
    return (
        <ThemedView style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>About</ThemedText>
            <ThemedText style={styles.description}>{business.description}</ThemedText>
        </ThemedView>
    );
}
