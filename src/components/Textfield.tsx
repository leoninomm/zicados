import { Text, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { Theme } from '../utils/theme';

type Props = {
    size?: number;
    bold?: boolean;
    italic?: boolean;
    color?: string;
    children: string;
};

const TextField = ({
    size = 16,
    bold = false,
    italic = false,
    color = '',
    children,
}: Props) => {
    const theme = useTheme();
    const styleProps = {
        size,
        bold,
        italic,
        color: color || theme.text,
    }

    const styles = Styles(styleProps);

    return (
        <Text style={styles.text}>{children}</Text>
    );
};

const Styles = (props: Omit<Props, 'children'>) => StyleSheet.create({
    text: {
        fontFamily: 'Inter',
        fontSize: props.size,
        fontWeight: props.bold ? 700 : 400,
        color: props.color,
    }
});

export default TextField;
