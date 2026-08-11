import { View, Image, StyleSheet } from 'react-native';
import TextField from './Textfield';
import Button from './Button';
import CoinCheck from '../assets/coin-check-mark.png';
import CoinClock from '../assets/coin-clock.png';

type Props = {
    variant: 'EMPTY' | 'WAITING';
    hasAction?: boolean;
}

const PaymentStates = ({ variant, hasAction = false }: Props) => {
    const imageSrc = variant === 'EMPTY' ? CoinCheck : CoinClock;
    const getText = () => {
        if (variant === 'EMPTY') return 'Todas as contas acertadas.';
        else if (hasAction) return 'Você fez a boa e pagou a quadra, agora termine de configurar a lista de pagamentos pra não tomar calote.';
        else return 'O dono da grana está terminando de configurar a lista de pagamentos.';
    }

    return (
        <View style={Styles.container}>
            <Image source={imageSrc} style={Styles.image} />
            <TextField align='center'>{getText()}</TextField>
            {hasAction && (
                <Button text='Configurar lista de pagamentos' variant='FILL' action={() => {}} style={Styles.button} />
            )}
        </View>
    );
};

const Styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        gap: 16,
        marginTop: 80,
    },
    image: {
        height: 150,
        width: 150,
    },
    button: {
        marginTop: 32,
    }
});

export default PaymentStates;
