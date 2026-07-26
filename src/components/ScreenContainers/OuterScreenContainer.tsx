import { View, StyleSheet, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';
import Loading from '../Loading';
import Logo from '../../assets/zicados-logo.png';

import type { Theme } from '../../utils/theme';

type Props = {
    children: React.ReactNode;
    loading?: boolean
}

const OuterScreenContainer = ({ children, loading = false }: Props) => {
    const insets = useSafeAreaInsets();
    const theme = useTheme();
    const styles = Styles(theme);

    return (
        <View style={{
            ...styles.container,
            paddingTop: insets.top + 100,
            paddingRight: insets.right + 20,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left + 20
        }}>
            <Image source={Logo} style={styles.logo} />
            {children}
            {loading && <Loading />}
        </View>
    );
};

const Styles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: theme.background,
        gap: 32,
    },
    logo: {
        height: 100,
        width: 100,
        marginBottom: 40,
    },
})

export default OuterScreenContainer;
