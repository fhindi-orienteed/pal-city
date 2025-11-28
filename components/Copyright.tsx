
import { StyleSheet, Text, View } from "react-native";

export default function Copyright() {
    return (
        <View style={styles.container}>
            <Text style={styles.copyrightText}>
                © 2026 PalCity. All rights reserved.
            </Text>
            <Text style={styles.copyrightSubtext}>
                Made with ❤️ in Palestine
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    copyrightText: {
        fontSize: 12,
        color: '#8E8E93',
    },
    copyrightSubtext: {
        fontSize: 12,
        color: '#C7C7CC',
    },
});