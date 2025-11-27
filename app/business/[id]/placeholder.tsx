import React from 'react';

import { Animated, StyleSheet, View } from 'react-native';

const Placeholder: React.FC = () => {
    const pulseAnim = new Animated.Value(0);

    React.useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [pulseAnim]);

    const opacity = pulseAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0.6, 1],
    });

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.pulseItem, styles.imagePlaceholder, { opacity }]} />

            <Animated.View style={[styles.pulseItem, styles.title, { opacity }]} />

            <Animated.View style={[styles.pulseItem, styles.subtitle, { opacity }]} />

            <View style={styles.textBlock}>
                <Animated.View style={[styles.pulseItem, styles.textLineFull, { opacity }]} />
                <Animated.View style={[styles.pulseItem, styles.textLineFiveSixth, { opacity }]} />
                <Animated.View style={[styles.pulseItem, styles.textLineFull, { opacity }]} />
                <Animated.View style={[styles.pulseItem, styles.textLineTwoThirds, { opacity }]} />
            </View>

            <View style={styles.textBlock}>
                <Animated.View style={[styles.pulseItem, styles.sectionTitle, { opacity }]} />
                <Animated.View style={[styles.pulseItem, styles.textLineFull, { opacity }]} />
                <Animated.View style={[styles.pulseItem, styles.textLineFourFifth, { opacity }]} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        gap: 16, // space-y-4
    },
    pulseItem: {
        backgroundColor: '#E5E7EB', // gray-200
        borderRadius: 4,
    },
    title: {
        height: 32, // h-8
        width: '75%', // w-3/4
        marginBottom: 16, // mb-4
    },
    subtitle: {
        height: 16, // h-4
        width: '50%', // w-1/2
    },
    textBlock: {
        gap: 8, // space-y-2
    },
    textLineFull: {
        height: 16, // h-4
        width: '100%', // w-full
    },
    textLineFiveSixth: {
        height: 16, // h-4
        width: '83.33%', // w-5/6
    },
    textLineTwoThirds: {
        height: 16, // h-4
        width: '66.66%', // w-2/3
    },
    imagePlaceholder: {
        height: 192, // h-48
        width: '100%', // w-full
        marginTop: 24, // mt-6
    },
    sectionTitle: {
        height: 16, // h-4
        width: '33.33%', // w-1/3
    },
    textLineFourFifth: {
        height: 16, // h-4
        width: '80%', // w-4/5
    },
});

export default Placeholder;