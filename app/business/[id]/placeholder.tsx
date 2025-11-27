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

            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 10 }}>
                <Animated.View style={[styles.pulseItem, styles.logo, { opacity }]} />
                <View style={{ flexDirection: 'column', gap: 8, flex: 1 }}>
                    <Animated.View style={[styles.pulseItem, styles.title, { opacity }]} />
                    <Animated.View style={[styles.pulseItem, styles.subtitle, { opacity }]} />
                </View>
            </View>
            <View style={styles.actionsContainer}>
                <Animated.View style={[styles.pulseItem, styles.actions, { opacity }]} />
                <Animated.View style={[styles.pulseItem, styles.actions, { opacity }]} />
                <Animated.View style={[styles.pulseItem, styles.actions, { opacity }]} />
                <Animated.View style={[styles.pulseItem, styles.actions, { opacity }]} />
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
        height: 32,
        width: '100%',
        marginBottom: 4,
    },
    subtitle: {
        height: 16,
        width: '75%',
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
    logo: {
        height: 60,
        width: 60,
    },
    actionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        justifyContent: 'space-between',
        marginTop: 10
    },
    actions: {
        width: '23%',
        height: 60,
    }
});

export default Placeholder;