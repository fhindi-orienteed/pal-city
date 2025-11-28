import { Image, StyleProp, View, ViewStyle } from "react-native";

type Props = {
    width?: number;
    height?: number;
    type?: "default" | "splash" | "white";
    style?: StyleProp<ViewStyle>;
};

const imageMap = {
    default: require('@/assets/images/logo.png'),
    splash: require('@/assets/images/splash-icon.png'),
    white: require('@/assets/images/logo-white.png'),
};

export function Logo({ width = 100, height = 100, type = "default", style }: Props) {
    const image = imageMap[type];
    return (
        <View style={style}>
            <Image source={image} style={{ width, height }} />
        </View>
    );
}

export default Logo;