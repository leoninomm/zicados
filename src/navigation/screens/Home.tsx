import { View, Text, Pressable, Image, ActivityIndicator, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import InnerScreenContainer from '../../components/ScreenContainers/InnerScreenContainer';
import Logo from '../../assets/zicados.png';

import type { AppDispatch } from '../../store/store';
import ArrowLeft from '../../components/Icons/ArrowLeft';

const Home = () => {
    const insets = useSafeAreaInsets();
    const dispatch = useDispatch<AppDispatch>();
    const { width, height } = Dimensions.get('window');

    return (
        <InnerScreenContainer>
            <Image source={Logo} style={{ height: 200, width: 200, marginTop: 30 }} /> 
        </InnerScreenContainer>
    );
};

export default Home;
