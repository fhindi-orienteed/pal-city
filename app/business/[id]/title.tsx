import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Business } from '@/types/interface';
import { Image } from 'expo-image';
import { View } from 'react-native';
import styles from './styles';

export default function Title({ business }: { business: Business }) {
    const logoUrl = business.logo ? business.logo : business.images ? business.images[0] : null;
    return (
        <ThemedView style={styles.titleContainer}>
            <View style={styles.titleHeader}>
                {logoUrl && (
                    <Image source={logoUrl} style={styles.businessLogo} />
                )}
                <View style={styles.businessNameContainer}>
                    <ThemedText type="title" style={styles.businessName} numberOfLines={1}>{business.name}</ThemedText>
                    <ThemedText type="title" style={styles.businessAddress}>{business.address}</ThemedText>
                </View>
            </View>
        </ThemedView>
    );
}
