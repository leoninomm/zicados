import { View, Pressable, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getAuth, signOut } from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { logout } from '../store/auth/authSlice';
import TextField from './Textfield';
import Avatar from './Avatar';
import ArrowLeft from './Icons/ArrowLeft';

import { Drawer, Screens } from '../utils/types';
import type { RootState, AppDispatch } from '../store/store';

const DrawerContent = (props: DrawerContentComponentProps) => {
    const { user } = useSelector((state: RootState) => state.authReducer);

    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation();

    const logoutAction = async () => {
        await signOut(getAuth());
        dispatch(logout());
        props.navigation.closeDrawer();
    }

    if (!user || !user.displayName) return null;

    return (
        <View style={Styles.container}>
            <Avatar size={150} />
            <TextField bold size={24}>{user?.displayName}</TextField>
            <View style={Styles.actions}>
                <Pressable
                    style={Styles.button}
                    android_ripple={{ color: '#FAFBFB' }}
                    onPress={() => navigation.navigate(Screens.Drawer, { screen: Drawer.Home })}
                >
                    <TextField>Home</TextField>
                </Pressable>
                <Pressable
                    style={Styles.button}
                    android_ripple={{ color: '#FAFBFB' }}
                    onPress={() => navigation.navigate(Screens.Drawer, { screen: Drawer.UpdateProfile })}
                >
                    <TextField>Perfil</TextField>
                </Pressable>
                <Pressable
                    style={Styles.button}
                    android_ripple={{ color: '#FAFBFB' }}
                    onPress={() => navigation.navigate(Screens.Drawer, { screen: Drawer.Players })}
                >
                    <TextField>Jogadores</TextField>
                </Pressable>
                <Pressable
                    style={{ flexDirection: 'row' }}
                    android_ripple={{ color: '#FAFBFB' }}
                    onPress={logoutAction}
                >
                    <ArrowLeft />
                    <TextField>Sair</TextField>
                </Pressable>
            </View>
        </View>
    );
};

const Styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingVertical: 20,
        marginTop: 50,
        alignItems: 'center',
        gap: 12,
    },
    actions: {
        width: '100%',
        marginTop: 80,
        paddingHorizontal: 20,
        justifyContent: 'flex-start',
        gap: 32,
    },
    button: {
        borderBottomWidth: 1,
        height: 30,
    }
});

export default DrawerContent;
