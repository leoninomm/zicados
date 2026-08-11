import { View, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TextField from './Textfield';
import Button from './Button';
import Coin from '../assets/coin.png';

import { Screens, Drawer } from '../utils/types';

const PaymentInProgress = () => {
    const navigation = useNavigation();

    return (
        <View style={Styles.container}>
            <Image source={Coin} style={Styles.image} />
            <TextField bold size={18}>Zica financeira</TextField>
            <TextField align='center'>Pagamento da última lista em andamento. Siga para a tela de pagamentos para acompanhar.</TextField>
            <Button
                variant='FILL'
                text='Ir para pagamentos'
                action={() => { navigation.navigate(Screens.Drawer, { screen: Drawer.PaymentList }) }}
                style={Styles.button}
            />
        </View>
    );
};

const Styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        gap: 12,
        marginTop: 150,
    },
    image: {
        height: 150,
        width: 150,
    },
    button: {
        marginTop: 32,
    },
});

export default PaymentInProgress;
