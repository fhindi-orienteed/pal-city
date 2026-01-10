import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Place } from '@/services/placeService';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

interface HomePlacesProps {
    places: Place[];
}

export default function HomePlaces({ places }: HomePlacesProps) {

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
        >

            {places.slice(0, 5).map((place) => (
                <Link key={place.id} href={`/place/${place.id}`} asChild>
                    <TouchableOpacity style={styles.card}>
                        {/* Place Image */}
                        {place.images && place.images.length > 0 ? (
                            <Image source={{ uri: place.images[0] }} style={styles.image} />
                        ) : (
                            <View style={[styles.image, styles.placeholderImage]}>
                                <IconSymbol name="mappin.circle" size={60} color="#999" />
                            </View>
                        )}

                        {/* Rating Badge */}
                        {place.rating && (
                            <View style={styles.ratingBadge}>
                                <IconSymbol name="star.fill" size={12} color="#FFD700" />
                                <ThemedText style={styles.ratingText}>
                                    {place.rating.toFixed(1)}
                                </ThemedText>
                            </View>
                        )}

                        {/* Card Content */}
                        <View style={styles.cardContent}>
                            {place.category && (
                                <ThemedText style={styles.category}>{place.category}</ThemedText>
                            )}
                            <ThemedText style={styles.name} numberOfLines={1}>
                                {place.name}
                            </ThemedText>
                            {place.address && (
                                <View style={styles.addressContainer}>
                                    <IconSymbol name="mappin" size={10} color="#CCC" />
                                    <ThemedText style={styles.address} numberOfLines={1}>
                                        {place.address}
                                    </ThemedText>
                                </View>
                            )}
                        </View>
                    </TouchableOpacity>
                </Link>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 16,
    },
    centerContent: {
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 200,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    viewAll: {
        color: '#E25822',
        fontSize: 14,
        fontWeight: '600',
    },
    // Error state styles
    errorContainer: {
        height: 180,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    errorText: {
        marginTop: 12,
        fontSize: 16,
        fontWeight: '600',
        color: '#4CAA4A',
        textAlign: 'center',
    },
    errorDetail: {
        marginTop: 4,
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },
    // Empty state styles
    emptyContainer: {
        height: 180,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    emptyText: {
        marginTop: 12,
        fontSize: 14,
        color: '#999',
    },
    scrollContent: {
        paddingHorizontal: 12,
        gap: 16,
    },
    card: {
        width: 280,
        height: 200,
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: '#f0f0f0',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    placeholderImage: {
        backgroundColor: '#E8E8E8',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ratingBadge: {
        position: 'absolute',
        top: 12,
        left: 12,
        backgroundColor: '#FFF',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        gap: 4,
    },
    ratingText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    cardContent: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    category: {
        color: '#4CAA4A',
        fontSize: 12,
        fontWeight: '600',
        marginBottom: 4,
    },
    name: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    addressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    address: {
        color: '#CCC',
        fontSize: 11,
        flex: 1,
    },
});
