import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Business } from '@/types/interface';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRef, useState } from 'react';
import { Dimensions, FlatList, Modal, Pressable, SafeAreaView, View } from 'react-native';
import styles from './styles';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function Gallery({ business }: { business: Business }) {
    const { images } = business;
    const [galleryVisible, setGalleryVisible] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);

    const displayedImages = images?.slice(0, 2) || [];
    const hasMoreImages = images && images.length > 3;
    const remainingImagesCount = images ? images.length - 3 : 0;

    const openGallery = (index: number) => {
        setCurrentIndex(index);
        setGalleryVisible(true);
        // Wait for modal to open before scrolling
        setTimeout(() => {
            flatListRef.current?.scrollToIndex({ index, animated: false });
        }, 100);
    };

    const scrollToIndex = (index: number) => {
        if (index >= 0 && index < (images?.length || 0)) {
            flatListRef.current?.scrollToIndex({ index, animated: true });
            setCurrentIndex(index);
        }
    };

    const onScroll = (event: any) => {
        const index = Math.round(event.nativeEvent.contentOffset.x / SCREEN_WIDTH);
        setCurrentIndex(index);
    };

    return (
        <ThemedView style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>Photos</ThemedText>
            <View style={styles.photosGrid}>
                {displayedImages.map((img, index) => (
                    <Pressable key={index} onPress={() => openGallery(index)} style={styles.photo}>
                        <Image source={img} style={{ width: '100%', height: '100%', borderRadius: 12 }} />
                    </Pressable>
                ))}
                {images && images.length === 3 && (
                    <Pressable onPress={() => openGallery(2)} style={styles.photo}>
                        <Image source={images[2]} style={{ width: '100%', height: '100%', borderRadius: 12 }} />
                    </Pressable>
                )}
                {hasMoreImages && (
                    <Pressable onPress={() => openGallery(3)} style={{ ...styles.photo, position: 'relative' }}>
                        <Image source={images[3]} style={{ ...styles.photo, width: '100%' }} />
                        <ThemedView style={{ borderRadius: 12, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                            <ThemedText style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>+{remainingImagesCount}</ThemedText>
                        </ThemedView>
                    </Pressable>
                )}
            </View>

            <Modal
                visible={galleryVisible}
                transparent={false}
                animationType="fade"
                onRequestClose={() => setGalleryVisible(false)}
            >
                <SafeAreaView style={styles.modalContainer}>
                    <Pressable onPress={() => setGalleryVisible(false)} style={styles.modalCloseButton}>
                        <Ionicons name="close" size={24} color="white" />
                    </Pressable>

                    <FlatList
                        ref={flatListRef}
                        data={images}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(_, index) => index.toString()}
                        onScroll={onScroll}
                        getItemLayout={(_, index) => ({
                            length: SCREEN_WIDTH,
                            offset: SCREEN_WIDTH * index,
                            index,
                        })}
                        renderItem={({ item }) => (
                            <View style={{ width: SCREEN_WIDTH, justifyContent: 'center', alignItems: 'center' }}>
                                <Image
                                    source={item}
                                    style={styles.modalImage}
                                    contentFit="contain"
                                />
                            </View>
                        )}
                    />

                    {currentIndex > 0 && (
                        <Pressable onPress={() => scrollToIndex(currentIndex - 1)} style={[styles.navButton, styles.navButtonLeft]}>
                            <Ionicons name="chevron-back" size={24} color="white" />
                        </Pressable>
                    )}

                    {images && currentIndex < images.length - 1 && (
                        <Pressable onPress={() => scrollToIndex(currentIndex + 1)} style={[styles.navButton, styles.navButtonRight]}>
                            <Ionicons name="chevron-forward" size={24} color="white" />
                        </Pressable>
                    )}

                    <View style={styles.imageCounter}>
                        <ThemedText style={styles.imageCounterText}>
                            {currentIndex + 1} / {images?.length}
                        </ThemedText>
                    </View>
                </SafeAreaView>
            </Modal>
        </ThemedView>
    );
}