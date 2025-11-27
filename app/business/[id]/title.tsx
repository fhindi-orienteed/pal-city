import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Business } from '@/services/businessService';
import { View } from 'react-native';
import styles from './styles';

export default function Title({ business }: { business: Business }) {
    return (
        <ThemedView style={styles.titleContainer}>
            <View style={styles.titleHeader}>
                <ThemedText type="title" style={styles.businessName}>{business.name}</ThemedText>
                <View style={styles.ratingContainer}>
                    <IconSymbol name="star.fill" size={16} color="#FFD700" />
                    <ThemedText style={styles.rating}>{business.rating}</ThemedText>
                    <ThemedText style={styles.reviewCount}>{business.reviewCount}</ThemedText>
                </View>
            </View>
        </ThemedView>
    );
}
