import { MoreMenuItem } from "@/types/interface";
import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import styles from './styles';

interface MoreMenuItemComponentProps {
    item: MoreMenuItem;
    onPress: () => void;
}

export default function MenuItem({ item, onPress }: MoreMenuItemComponentProps) {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={styles.moreMenuItem}>
            <View style={styles.moreMenuIconContainer}>
                <Ionicons name={item.icon} size={28} color="#009736" />
            </View>
            <Text style={styles.moreMenuLabel} numberOfLines={2}>
                {item.label}
            </Text>
        </TouchableOpacity>
    );
}