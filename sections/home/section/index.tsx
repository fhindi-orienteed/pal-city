import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useTranslation } from '@/hooks/useTranslation';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import styles from './styles';

interface Props {
    id: string;
    loading: boolean;
    error: string | null;
    children: React.ReactNode;
}

export default function HomeSection({ id, loading, error, children }: Props) {
    const { t } = useTranslation();

    // Loading state
    if (loading) {
        return (
            <View style={[styles.container, styles.centerContent]}>
                <ActivityIndicator size="small" color="#4CAA4A" />
            </View>
        );
    }

    // Error state
    if (error) {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <ThemedText type="subtitle">{t(`home.sections.${id}`)}</ThemedText>
                </View>
                <View style={styles.errorContainer}>
                    <IconSymbol name="exclamationmark.triangle" size={40} color="#4CAA4A" />
                    <ThemedText style={styles.errorText}>Unable to load news</ThemedText>
                    <ThemedText style={styles.errorDetail}>{error}</ThemedText>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <ThemedText type="subtitle">{t(`home.sections.${id}`)}</ThemedText>
                <TouchableOpacity>
                    <ThemedText style={styles.viewAll}>{t('home.sections.more')}</ThemedText>
                </TouchableOpacity>
            </View>

            <View>{children}</View>
        </View>
    );
}
