import { StyleSheet, Text, View } from "react-native";

export default function AppName() {
    return (
        <View style={styles.container}>
            <Text style={styles.emoji}>🇵🇸</Text>
            <Text style={styles.appName}>PalCity</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    emoji: {
        fontSize: 24,
        marginRight: 8,
    },
    appName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
});