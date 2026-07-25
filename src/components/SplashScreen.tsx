import { View, Image, StyleSheet } from 'react-native';
import Logo from '../assets/zicados.png';

const SplashScreen = () => {
    return (
        <View style={styles.container}>
            <Image source={Logo} style={styles.img} />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        height: 200,
        width: 200,
    }
});

export default SplashScreen;
