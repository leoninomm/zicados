import { View, StyleSheet, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { useTheme } from '../hooks/useTheme';
import SplashScreen from './SplashScreen';
import TextField from './Textfield';
import Hamburger from './Icons/Hamburger';

import type { RootState } from '../store/store';
import type { Theme } from '../utils/theme';

type Props = {
    children: React.ReactNode,
}

const ScreenContainer = ({ children }: Props) => {
    const { user } = useSelector((state: RootState) => state.authReducer);
    const insets = useSafeAreaInsets();
    const theme = useTheme();

    const styles = Styles(theme);

    if (!user || !user.displayName || !user.photoURL) return <SplashScreen />;

    return (
        <View style={{
            ...styles.container,
            paddingTop: insets.top,
            paddingRight: insets.right + 20,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left + 20,
        }}>
            <View style={styles.header}>
                <View style={styles.user}>
                    <View style={styles.avatar}>
                        <Image src={user.photoURL} style={styles.image} />
                    </View>
                    <TextField bold>{user.displayName}</TextField>
                </View>
                <Hamburger />
            </View>
            {children}
        </View>
    );
};

const Styles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
        alignItems: 'center',
    },
    header: {
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#AFD918',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#3E9618',
    },
    user: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    avatar: {
        height: 52,
        width: 52,
        borderRadius: 50,
        backgroundColor: '#3E9618',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: 48,
        width: 48,
        borderRadius: 50,
    },
});

export default ScreenContainer;
