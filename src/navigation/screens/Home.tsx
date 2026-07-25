import { View, Text, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/auth/authThunk';
import Logo from '../../assets/zicados.png';

import type { AppDispatch } from '../../store/store';

const Home = () => {
    const insets = useSafeAreaInsets();
    const dispatch = useDispatch<AppDispatch>();

    return (
        <View style={{
            paddingTop: insets.top,
            paddingRight: insets.right,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left
        }}>
            <Text>Você está logado</Text>
            <Pressable onPress={() => dispatch(logout())}>
                <Text>Sair</Text>
            </Pressable>
        </View>
    );
};

export default Home;
