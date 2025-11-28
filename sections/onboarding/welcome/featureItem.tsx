import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import styles from './styles';

interface Props {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    description: string;
}

function FeatureItem({ icon, title, description }: Props) {
    return (
        <View style={[styles.featureItem]}>
            <View style={styles.featureIconContainer}>
                <Ionicons name={icon} size={20} color="#009736" />
            </View>
            <View style={styles.featureTextContainer}>
                <Text style={styles.featureTitle}>
                    {title}
                </Text>
                <Text style={styles.featureDescription}>
                    {description}
                </Text>
            </View>
        </View>
    );
}

export default FeatureItem;
