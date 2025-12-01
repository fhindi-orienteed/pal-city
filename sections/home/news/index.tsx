import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import News from '@/model/News';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import styles from './styles';

interface Props {
    news: News[];
}

export default function HomeNews({ news }: Props) {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
        >
            {news.slice(0, 5).map((item) => (
                <Link key={item.id} href={`/news/${item.id}`} asChild>
                    <TouchableOpacity style={styles.card}>
                        {item.coverImage ? (
                            <Image source={{ uri: item.coverImage }} style={styles.image} />
                        ) : (
                            <View style={[styles.image, styles.placeholderImage]}>
                                <IconSymbol name="newspaper" size={60} color="#999" />
                            </View>
                        )}

                        {/* Card Content */}
                        <View style={styles.cardContent}>
                            <ThemedText style={styles.title} numberOfLines={2}>
                                {item.title}
                            </ThemedText>
                            {item.summary && (
                                <ThemedText style={styles.summary} numberOfLines={2}>
                                    {item.summary}
                                </ThemedText>
                            )}
                            <View style={styles.metaContainer}>
                                {item.publishedAt && (
                                    <View style={styles.publishedDateContainer}>
                                        <IconSymbol name="calendar" size={10} color="#CCC" />
                                        <ThemedText style={styles.publishedDate}>
                                            {item.publishedAt}
                                        </ThemedText>
                                    </View>
                                )}
                            </View>
                        </View>
                    </TouchableOpacity>
                </Link>
            ))}
        </ScrollView>
    );
}

