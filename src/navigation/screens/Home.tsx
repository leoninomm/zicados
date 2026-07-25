import { View, Text, Pressable, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/auth/authThunk';
import ScreenContainer from '../../components/ScreenContainer';
import Logo from '../../assets/zicados.png';

import type { AppDispatch } from '../../store/store';
import ArrowLeft from '../../components/Icons/ArrowLeft';

const Home = () => {
    const insets = useSafeAreaInsets();
    const dispatch = useDispatch<AppDispatch>();

    return (
        <ScreenContainer>
            <Image source={Logo} style={{ height: 200, width: 200, marginTop: 30 }} /> 
            <Pressable onPress={() => dispatch(logout())} style={{ flexDirection: 'row', gap: 4, marginTop: 50 }}>
                <ArrowLeft />
                <Text>Sair</Text>
            </Pressable>
        </ScreenContainer>
    );
};

export default Home;
