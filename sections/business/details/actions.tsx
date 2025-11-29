import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Business } from '@/types/interface';
import { Linking, TouchableOpacity, View } from 'react-native';
import styles from './styles';

export default function Actions({ business }: { business: Business }) {

    const onCall = () => {
        if (!business.phone) return;
        Linking.openURL(`tel:${business.phone}`);
    };

    const onDirections = () => {
        if (!business.location?.latitude || !business.location?.longitude) return;
        Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${business.location?.latitude},${business.location?.longitude}`);
    };

    const onWebsite = () => {
        if (!business.socialLinks?.website) return;
        Linking.openURL(business.socialLinks?.website);
    };

    const onShare = () => {
        if (!business.location?.latitude || !business.location?.longitude) return;
        Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${business.location?.latitude},${business.location?.longitude}`);
    };

    return (

        <View style={styles.actionButtonsContainer}>
            <TouchableOpacity style={styles.actionButton} onPress={onCall}>
                <View style={styles.actionIcon}>
                    <IconSymbol name="phone.fill" size={24} color="#009736" />
                </View>
                <ThemedText style={styles.actionLabel}>Call</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={onDirections}>
                <View style={styles.actionIcon}>
                    <IconSymbol name="map.fill" size={24} color="#009736" />
                </View>
                <ThemedText style={styles.actionLabel}>Directions</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={onWebsite}>
                <View style={styles.actionIcon}>
                    <IconSymbol name="globe" size={24} color="#009736" />
                </View>
                <ThemedText style={styles.actionLabel}>Website</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={onShare}>
                <View style={styles.actionIcon}>
                    <IconSymbol name="square.and.arrow.up" size={24} color="#009736" />
                </View>
                <ThemedText style={styles.actionLabel}>Share</ThemedText>
            </TouchableOpacity>
        </View>
    );
}
