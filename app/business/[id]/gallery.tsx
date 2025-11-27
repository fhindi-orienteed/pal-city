import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Business } from '@/services/businessService';
import { Image } from 'expo-image';
import { View } from 'react-native';
import styles from './styles';

export default function Gallery({ business }: { business: Business }) {
    const { images } = business;

    const displayedImages = images?.slice(0, 3) || [];
    const hasMoreImages = images && images.length > 4;
    const remainingImagesCount = images ? images.length - 3 : 0;

    return (
        <ThemedView style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>Photos</ThemedText>
            <View style={styles.photosGrid}>
                {displayedImages.map((img, index) => (
                    <Image key={index} source={img} style={styles.photo} />
                ))}
                {images && images.length === 4 && (
                    <Image key={3} source={images[3]} style={styles.photo} />
                )}
                {hasMoreImages && (
                    <View style={{ ...styles.photo, position: 'relative' }}>
                        <Image source={images[4]} style={{ ...styles.photo, width: '100%' }} />
                        <ThemedView style={{ borderRadius: 12, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                            <ThemedText style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>+{remainingImagesCount}</ThemedText>
                        </ThemedView>
                    </View>
                )}
            </View>
        </ThemedView>
    );
}