import { View, Image, StyleSheet } from 'react-native';
import TextField from './Textfield';
import BustedBall from '../assets/busted-volleyball.png';

type Props = {
    text: string;
    margin?: number;
    action?: React.ReactNode;
};

const Empty = ({ text, margin = 0, action }: Props) => {
    return (
        <View style={{ ...Styles.container, marginTop: margin || 50 }}>
            <Image source={BustedBall} style={Styles.image} />
            <TextField>{text}</TextField>
            {action}
        </View>
    );
};

const Styles = StyleSheet.create({
    container: {
        marginTop: 50,
        alignItems: 'center',
    },
    image: {
        height: 150,
        width: 150,
    },
});

export default Empty;
