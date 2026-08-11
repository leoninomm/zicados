import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import TextField from './Textfield';

type Props = {
    variant: 'OUTLINED' | 'FILL',
    text: string,
    action: (e: any) => void,
    disabled?: boolean,
    style?: ViewStyle
};

const Button = ({
    variant,
    text,
    action,
    disabled = false,
    style,
}: Props) => {
    const handleAction = (e: any) => {
        if (disabled) return;
        action(e);
    };

    return (
        <Pressable
            onPress={(e: any) => handleAction(e)}
            style={[Styles.button, variant === 'FILL' ? Styles.fill : Styles.outline, style]}
        >
            <TextField color={variant === 'FILL' ? 'black' : '#C62828'}>{text}</TextField>
        </Pressable>
    );
};

const Styles = StyleSheet.create({
    button: {
        paddingHorizontal: 32,
        paddingVertical: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 32,
        borderWidth: 1.5,
    },
    outline: {
        borderColor: '#C62828',
        backgroundColor: 'transparent',
    },
    fill: {
        borderColor: '#030626',
        backgroundColor: '#F2B705'
    }
});

export default Button;
