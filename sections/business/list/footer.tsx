import { ThemedText } from "@/components/themed-text";
import { ActivityIndicator, View } from "react-native";
import styles from "./styles";

type Props = {
    loadingMore: boolean;
    hasMore: boolean;
    total: number;
}

export default function Footer({ loadingMore, hasMore, total }: Props) {
    if (loadingMore) {
        return (
            <View style={styles.footerLoader}>
                <ActivityIndicator size="small" color="#E25822" />
                <ThemedText style={styles.footerText}>Loading more...</ThemedText>
            </View>
        );
    }
    if (!hasMore && total > 0) {
        return (
            <View style={styles.footerEnd}>
                <ThemedText style={styles.footerText}>
                    That's all! ({total} businesses)
                </ThemedText>
            </View>
        );
    }
    return null;
}