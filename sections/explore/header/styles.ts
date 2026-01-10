import { Fonts } from '@/constants/theme';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        height: 250,
        width: '100%',
        top: 0,
        left: 0,
        position: 'absolute',
        overflow: 'hidden',
    },
    headerContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: 20,
        overflow: 'hidden',
    },
    headerTitle: {
        fontFamily: Fonts.rounded,
        fontSize: 32,
        color: '#fff',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    headerSubtitle: {
        fontSize: 18,
        color: '#fff',
        opacity: 0.9,
        marginTop: 4,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
});


export default styles;