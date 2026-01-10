import { TabRoute } from "@/types/interface";
import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

interface Props {
    route: TabRoute;
    isActive: boolean;
    onPress: () => void;
}

export default function TabItem({ route, isActive, onPress }: Props) {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={styles.tabItem}>
            <View style={styles.tabContainer}>
                <Ionicons name={route.icon} size={24} color={isActive ? '#009736' : '#8E8E93'} />
                <Text style={[styles.tabLabel, { color: isActive ? '#009736' : '#8E8E93' }]}>
                    {route.label}
                </Text>
            </View>
        </TouchableOpacity>
    );
}