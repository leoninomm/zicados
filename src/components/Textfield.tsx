import { Text, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { Theme } from '../utils/theme';

type Props = {
    size?: number;
    bold?: boolean;
    italic?: boolean;
    color?: string;
    align?: 'auto' | 'center' | 'left' | 'right';
    children: React.ReactNode;
};

const TextField = ({
    size = 16,
    bold = false,
    italic = false,
    color = '',
    align = 'auto',
    children,
}: Props) => {
    const theme = useTheme();
    const styleProps = {
        size,
        bold,
        italic,
        align,
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
        fontStyle: props.italic ? 'italic' : 'normal',
        color: props.color,
        textAlign: props.align,
    }
});

export default TextField;
