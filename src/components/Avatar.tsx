import { View, Image, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import TextField from './Textfield';

import type { RootState } from '../store/store';

type Props = {
    size: number;
    photo?: string;
};

const Avatar = ({ size, photo }: Props) => {
    const { user } = useSelector((state: RootState) => state.authReducer);

    const styles = Styles(size);

    if (!user || !user.photoURL) return null;

    const photoToRender = photo ? photo : user.photoURL;

    return (
        <View style={styles.avatar}>
            <Image src={photoToRender} style={styles.image} />
        </View>
    );
};

const Styles = (size: number) => StyleSheet.create({
    avatar: {
        height: size,
        width: size,
        borderRadius: 50,
        backgroundColor: '#3E9618',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: size - 4,
        width: size - 4,
        borderRadius: 50,
    },
});

export default Avatar;
